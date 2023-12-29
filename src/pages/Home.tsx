import React from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();

  const signOutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);

    alert('로그아웃');
  };

  const existUser = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    console.log('현재 세션에 로그인된 유저', user);
  };

  // // 로그인이 된 후에 실행이 되어야 함
  // const timeOutUser = setTimeout(signOutHandler, 10000); //새로고침하면 다시 10초부터 시작임 ... 해결해야함

  // console.log('이게 머지??', timeOutUser);

  return (
    <div>
      <button
        onClick={() => {
          navigate('/login');
        }}
      >
        로그인하러가기
      </button>
      <button onClick={signOutHandler}>로그아웃</button>
      <button onClick={existUser}>이걸 누르면 로그인 상태인지 아닌지 알 수 있다</button>
    </div>
  );
};

export default Home;
