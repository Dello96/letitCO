import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../../src/pages/login/Login';
import BookRegister from '../pages/BookRegister';
import BookSearch from '../pages/BookSearch';
import BookShelf from '../pages/bookShelf/BookShelf';
import Detail from '../pages/detail';
import Calendar from '../pages/calendar';
import Layout from '../components/Layout';

const Router = () => {
  const [user, serUser] = useState(null);
// user를 사용하진 않지만 상태변화로 렌더링 일으킴
  useEffect(() => {
    const authTokenStr = localStorage.getItem('sb-bsnozctogedtgqvbhqby-auth-token');
    if (authTokenStr) {
      const authToken = JSON.parse(authTokenStr);
      const userId = authToken.user.id;
      serUser(userId);
    }
  }, [user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bookregister/:id" element={<BookRegister />} />
          <Route path="/booksearch" element={<BookSearch />} />
          <Route path="/bookshelf" element={<BookShelf />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      
    </BrowserRouter>
  );
};

export default Router;
