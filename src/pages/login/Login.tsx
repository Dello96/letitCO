import React, { useState } from 'react';
import supabase from '../../supabaseClient';
import { StFormWrapper, StInput, StSignUpButton, StLoginButton } from './index';
import { useNavigate } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import { FaUnlockAlt } from 'react-icons/fa';
import { IoCheckmarkSharp } from 'react-icons/io5';
import Swal from 'sweetalert2';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RiEmotionHappyLine } from 'react-icons/ri';

export type Inputs = {
  userEmail: string;
  userPassword: string;
  userPasswordCheck: string;
  userNickname: string;
};

const Login = () => {
  // const [nickname, setNickname] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<Inputs>({ mode: 'onChange' });

  console.log('errors', errors);

  // useMemo, useCallback 사용하기
  // ant design 사용하기
  // sweetalert 사용하기 ---> margin 해결하기

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordRegex = /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/;

  // 회원가입
  const signUpHandler: SubmitHandler<Inputs> = async (inputs) => {
    // e.preventDefault();
    console.log(inputs);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: inputs.userEmail,
        password: inputs.userPassword,
        options: {
          data: {
            nickname: inputs.userNickname
          }
        }
      });
      // const {
      //   data: { user }
      // } = await supabase.auth.getUser();
      // let metadata = user.user_metadata;
      // console.log('metadata', metadata);

      console.log('data', data); // 불러오기 성공
      setValue('userEmail', '');
      setValue('userPassword', '');
      setValue('userPasswordCheck', '');
      setValue('userNickname', '');
      if (error) {
        console.error(error);
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: '회원가입 양식을 다시 확인해주세요'
        // });
      } else {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '회원가입에 성공하였습니다!',
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/login'); // 아....;; 로그인하는 곳으로 이동해야함;;; ****
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signOutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);

    alert('로그아웃');
  };

  // 이메일 로그인
  const signInHandler: SubmitHandler<Inputs> = async (inputs) => {
    // e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: inputs.userEmail,
        password: inputs.userPassword
      });
      console.log('userData', data);
      console.log('만료', data.session?.expires_in);

      setValue('userEmail', '');
      setValue('userPassword', '');

      if (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '이메일 또는 비밀번호가 틀렸습니다'
        });
      } else {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '로그인에 성공하였습니다!',
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/');

        // 로그인이 된 후에 실행이 되어야 함
        setTimeout(() => {
          signOutHandler;
          console.log('5초 뒤에 찍히나?');
        }, 5000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 구글 로그인
  const signInGoogle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });
      console.log(data);
      if (error) {
        console.error(error);
        alert('일치하지 않습니다');
      } else {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '로그인에 성공하였습니다!',
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <StFormWrapper onSubmit={isLogin ? handleSubmit(signInHandler) : handleSubmit(signUpHandler)}>
        {/* <StFormWrapper> */}
        <h1> {isLogin ? '로그인' : '회원가입'}</h1>
        <div>
          <FaRegUser />
          <StInput
            type="text"
            placeholder="Email"
            autoFocus
            {...register('userEmail', {
              required: true,
              pattern: emailRegex
            })}
          />
          {errors?.userEmail?.type === 'required' && <p>이메일을 입력해주세요</p>}
          {errors?.userEmail?.type === 'pattern' && <p> ⚠️ 이메일 양식에 맞게 입력해주세요</p>}
        </div>
        <div>
          <FaUnlockAlt />
          <StInput
            type="password"
            placeholder="Password "
            {...register('userPassword', {
              required: true,
              pattern: passwordRegex
            })}
          />
          {errors?.userPassword?.type === 'required' && <p>비밀번호를 입력해주세요</p>}
          {errors?.userPassword?.type === 'pattern' && <p> ⚠️비밀번호는 문자, 숫자 1개이상 포함, 8자리 이상입니다</p>}
        </div>

        {!isLogin && (
          <div>
            <IoCheckmarkSharp />
            <StInput
              type="password"
              placeholder="Confirm Password"
              {...register('userPasswordCheck', {
                required: true,
                validate: {
                  check: (val) => {
                    if (getValues('userPassword') !== val) {
                      return '비밀번호 불일치';
                    }
                  }
                }
              })}
            />
            <br />
            <RiEmotionHappyLine />
            <StInput type="text" placeholder="Nickname" {...register('userNickname')} />
            {errors?.userPasswordCheck?.type === 'required' && <p>비밀번호를 입력해주세요</p>}
            {errors?.userPasswordCheck && <p> ⚠️ 비밀번호가 일치하지 않습니다</p>}
          </div>
        )}
        {isLogin ? (
          <>
            <StLoginButton type="submit">Login</StLoginButton>
            <StLoginButton onClick={signInGoogle}>google로 로그인</StLoginButton>
            {/* <button onClick={signOutHandler}>로그아웃</button> */}
            <button
              onClick={() => {
                navigate('/');
              }}
            >
              Home
            </button>
          </>
        ) : (
          <StSignUpButton type="submit">Register</StSignUpButton>
        )}
        <div onClick={() => setIsLogin((change) => !change)}>
          {isLogin ? '아직 회원이 아니신가요? 회원가입하러 가기!' : '로그인'}
        </div>
      </StFormWrapper>
    </div>
  );
};

export default Login;
