import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../../src/pages/login/Login';
import BookRegister from '../pages/BookRegister';
import BookSearch from '../pages/BookSearch';
import BookShelf from '../pages/bookShelf/BookShelf';
import Detail from '../pages/detail';
import Calendar from '../pages/calendar';
import Layout from '../components/Layout';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Router = () => {
  const userID = useSelector((state: RootState) => state.user.id);
  // user를 사용하진 않지만 상태변화로 렌더링 일으킴

  // const authTokenStr = localStorage.getItem('sb-bsnozctogedtgqvbhqby-auth-token');
  // 전역상태로 관리 필요
  return (
    <BrowserRouter>
      <Routes>
        {userID ? (
          <>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/bookregister/:id" element={<BookRegister />} />
              <Route path="/booksearch" element={<BookSearch />} />
              <Route path="/bookshelf" element={<BookShelf />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </>
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
