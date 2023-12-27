import React, { useEffect, useState } from 'react';
import supabase from '../../supabaseClient';
import { StFormWrapper, StInput, StSignUpButton, StLoginButton } from './index';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const navigate = useNavigate();

  // useMemo, useCallback 사용하기
  useEffect(() => {
    console.log(email);
    console.log(password);
  }, [email, password]);
  const onEmailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onPasswordCheckChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
  };

  const signUpHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });
      console.log(data);
      if (error) {
        console.error(error);
        alert('다시 확인해주삼');
      } else {
        alert('회원가입 완료');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signInHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      console.log(data);
      if (error) {
        console.error(error);
        alert('일치하지 않습니다');
      } else {
        alert('로그인에 성공하였습니다');
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <StFormWrapper>
        <h1> {isLogin ? '로그인' : '회원가입'}</h1>
        <StInput type="text" value={email} onChange={onEmailChangeHandler} />
        <br />
        <StInput type="password" value={password} onChange={onPasswordChangeHandler} />
        <br />
        {!isLogin && (
          <>
            <StInput type="password" value={passwordCheck} onChange={onPasswordCheckChangeHandler} />
            <br />
          </>
        )}
        {isLogin ? (
          <StLoginButton onClick={signInHandler}>로그인</StLoginButton>
        ) : (
          <StSignUpButton onClick={signUpHandler}>회원가입</StSignUpButton>
        )}
        <div onClick={() => setIsLogin((change) => !change)}>{isLogin ? '회원가입' : '로그인'}</div>
      </StFormWrapper>
    </div>
  );
};

export default Login;
