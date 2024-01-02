import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import {
  StFormWrapper,
  StInput,
  StSignUpButton,
  StLoginButton,
  StToggleBtn,
  StWelcomeSection,
  StWrapper,
  StIntroduction,
  StWarning,
  StTitle,
  StInputWrapper,
  StLogo,
  StIntroductionTitle
  // Stegg
} from './style';
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

const Login: React.FC = () => {
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
          timer: 5000
        });
        navigate('/homepage'); // 아....;; 로그인하는 곳으로 이동해야함;;; ****
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signOutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);
    alert('로그아웃');
    // console.log()
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
        // 비동기 처리??...
        setTimeout(() => {
          signOutHandler();
          // console.log('5초 뒤에 찍히나?');
        }, 60000);
      }
      // setInterval n초 간격으로 실행!!!
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
        navigate('/homepage');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StWrapper>
      <StWelcomeSection>
        <StIntroductionTitle>Welcome to Check Chaek!</StIntroductionTitle> <br />
        <StIntroduction>
          <br />
          Check Chaek은 나만의 독서 여정을 소중히 기록할 수 있는 특별한 공간입니다.
          <br />
          북캘린더를 활용하여 읽은 책들을 한눈에 정리할 수 있어요. <br />
          또한 독서 메모를 자유롭게 작성하여 도서 후기나 기억에 남는 구절을 손쉽게 저장할 수 있습니다
          <br />
          Check Chaek은 독서를 더욱 즐겁고 의미있게 만들어줍니다! <br />
          나만의 독서 공간을 차곡차곡 쌓아보세요. 📖 ✨
        </StIntroduction>
        <StToggleBtn onClick={() => setIsLogin((change) => !change)}>{isLogin ? 'Sign Up' : 'Sign In'}</StToggleBtn>
      </StWelcomeSection>

      <StFormWrapper onSubmit={isLogin ? handleSubmit(signInHandler) : handleSubmit(signUpHandler)}>
        {/* <StFormWrapper> */}
        <div>
          <StLogo />
        </div>
        <StTitle> {isLogin ? '로그인' : '회원가입'}</StTitle>
        <div>
          <StInputWrapper>
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
            {errors?.userEmail?.type === 'required' && <StWarning> ⚠️ 이메일을 입력해주세요</StWarning>}
            {errors?.userEmail?.type === 'pattern' && <StWarning> ⚠️ 이메일 양식에 맞게 입력해주세요</StWarning>}
          </StInputWrapper>
        </div>

        <div>
          <StInputWrapper>
            <FaUnlockAlt />
            <StInput
              type="password"
              placeholder="Password "
              {...register('userPassword', {
                required: true,
                pattern: passwordRegex
              })}
            />
            {errors?.userPassword?.type === 'required' && <StWarning> ⚠️ 비밀번호를 입력해주세요</StWarning>}
            {errors?.userPassword?.type === 'pattern' && (
              <StWarning> ⚠️ 비밀번호는 문자, 숫자 1개이상 포함, 8자리 이상입니다</StWarning>
            )}
          </StInputWrapper>
        </div>

        {!isLogin && (
          <div>
            <StInputWrapper>
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
              {errors?.userPasswordCheck?.type === 'required' && <StWarning> ⚠️ 비밀번호를 입력해주세요</StWarning>}
              {errors?.userPasswordCheck && <StWarning> ⚠️ 비밀번호가 일치하지 않습니다</StWarning>}
              <br />
            </StInputWrapper>
            <StInputWrapper>
              <RiEmotionHappyLine />
              <StInput type="text" placeholder="Nickname" {...register('userNickname')} />
            </StInputWrapper>
          </div>
        )}
        {isLogin ? (
          <>
            <StLoginButton type="submit">로그인</StLoginButton>
            <StLoginButton onClick={signInGoogle}>google로 로그인</StLoginButton>
            {/* <button onClick={signOutHandler}>로그아웃</button> */}
            {/* <br />
            <button
              onClick={() => {
                navigate('/homepage');
              }}
            >
              Home
            </button> */}
          </>
        ) : (
          <StSignUpButton type="submit">Register</StSignUpButton>
        )}
      </StFormWrapper>
    </StWrapper>
  );
};

export default Login;
