import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../../src/pages/login/Login';
import BookRegister from '../pages/BookRegister';
import BookSearch from '../pages/BookSearch';
import BookShelf from '../pages/bookShelf/BookShelf';
import Detail from '../pages/detail';
import Calendar from '../pages/calendar';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../redux/store';
import Layout from '../components/Layout';

const Router = () => {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const authTokenStr = localStorage.getItem('sb-bsnozctogedtgqvbhqby-auth-token');
    if (authTokenStr) {
      //제이슨으로 바꾸기
      const authToken = JSON.parse(authTokenStr);
      console.log('authToken=========>', authToken);
      const userId: string = authToken.user.id;
      console.log('사용자 ID:', userId);
      setUser('userId');
    } else {
      console.log('Auth 토큰을 찾을 수 없습니다.');
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading..</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {user ? (
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/bookregister/:id" element={<BookRegister />} />
            <Route path="/booksearch" element={<BookSearch />} />
            <Route path="/bookshelf" element={<BookShelf />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
