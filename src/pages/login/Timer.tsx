// import { supabase } from '../../supabaseClient';
// import { useLocation } from 'react-router-dom';
// import { useEffect, useRef, useState } from 'react';
import React from 'react';

const Timer = () => {
  // const navigate = useNavigate();

  // const location = useLocation();
  // const initialTime = parseInt(new URLSearchParams(location.search).get('timer') || '3600', 10);
  // const [loggedIn, setLoggedIn] = useState(true);

  // const signOutHandler = async () => {
  //   const { error } = await supabase.auth.signOut();
  //   console.log(error);

  //   alert('로그아웃 되었습니다');
  // };

  // const existUser = async () => {
  //   const {
  //     data: { user }
  //   } = await supabase.auth.getUser();
  //   console.log('현재 세션에 로그인된 유저', user);
  // };

  // // 로그인 만료 타이머
  // const [min, setMin] = useState(Math.floor(initialTime / 3600));
  // const [sec, setSec] = useState(initialTime % 60);
  // const time = useRef(initialTime);
  // const timerId = useRef<NodeJS.Timeout | null>(null);

  // useEffect(()=>{
  //   if(loggedIn) {
  //     timerId.current = setInterval(()=>{
  //       setMin(Math.floor(time.current/60))
  //       setSec(time.current % 60)
  //       time.current -= 1
  //     }, 1000)}
  //     return ()=>{
  //       clearInterval(timerId.current!)
  //     }, [loggedIn]
  //   }
  // },[loggedIn])

  // useEffect(() => {
  //   if (time.current <= 0) {
  //     clearInterval(timerId.current!);
  //   }
  // }, [sec]);

  // useEffect(() => {
  //   const newSearch = `?timer=${time.current}`;
  //   window.history.replaceState({}, '', `${window.location.pathname}${newSearch}`);
  // }, [time.current]);

  // useEffect(() => {
  //   timerId.current = setInterval(() => {
  //     setMin(Math.floor(time.current / 60));
  //     setSec(time.current % 60);
  //     time.current -= 1;
  //   }, 1000);
  // }, []);

  // useEffect(() => {
  //   if (time.current <= 0) {
  //     clearInterval(timerId.current!);
  //   }
  // }, [sec]);

  // useEffect(() => {
  //   const newSearch = `?timer=${time.current}`;
  //   window.history.replaceState({}, '', `${window.location.pathname}${newSearch}`);
  // }, [time.current]);

  // useEffect(() => {
  //   timerId.current = setInterval(() => {
  //     setMin(Math.floor(time.current / 60));
  //     setSec(time.current % 60);
  //     time.current -= 1;
  //   }, 1000);
  //   return () => clearInterval(timerId.current!);
  // }, []);

  // useEffect(() => {
  //   if (time.current <= 0) {
  //     // alert('타임 아웃');
  //     clearInterval(timerId.current!);
  //   }
  // }, [sec]);

  // useEffect(() => {
  //   const newSearch = `?timer=${time.current}`;
  //   window.history.replaceState({}, '', `${window.location.pathname}${newSearch}`);
  // }, [time.current]);

  return (
    <div>
      {/* <button
        onClick={() => {
          navigate('/login');
        }}
      >
        로그인하러가기
      </button> */}
      {/* <button
        onClick={() => {
          signOutHandler();
          navigate('/login');
        }}
      >
        로그아웃 */}
      {/* </button> */}
      {/* <button onClick={existUser}>이걸 누르면 로그인 상태인지 아닌지 알 수 있다</button> */}
      <h2 style={{ margin: '100px' }}>{/* 로그인 만료까지 {min}분 {sec}초 남았습니다! */}</h2>
    </div>
  );
};

export default Timer;
