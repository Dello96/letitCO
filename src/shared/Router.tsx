import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../../src/pages/login/Login';
import BookRegister from '../pages/BookRegister';
import BookSearch from '../pages/BookSearch';
import BookShelf from '../pages/BookShelf';
import Detail from '../pages/detail';
// import Calendar from '../pages/calendar';

// import { useQuery } from 'react-query';
// import { QUERY_KEYS } from '../query/keys';
// import { getCurrentUser } from '../api/supabaseData';
// import { useDispatch, useSelector } from 'react-redux';
// import { setUser } from '../redux/userSlice';
// import { RootState } from '../redux/store';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bookregister/:id" element={<BookRegister />} />
        <Route path="/booksearch" element={<BookSearch />} />
        <Route path="/bookshelf" element={<BookShelf />} />
        {/* <Route path="/bookcalender" element={<Calender />} /> */}

        <Route path="/detail/:id" element={<Detail />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
