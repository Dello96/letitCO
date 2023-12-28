import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import BookRegister from '../pages/BookRegister';
import BookSearch from '../pages/BookSearch';

import BookShelf from '../pages/BookShelf';

import Detail from '../pages/detail';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bookregister" element={<BookRegister />} />
        <Route path="/booksearch" element={<BookSearch />} />

        <Route path="/bookshelf" element={<BookShelf />} />

        <Route path="/detail" element={<Detail />} />
        
        <Route path="*" element={<Navigate to="/" replace/>} />

      </Routes>
    </BrowserRouter>
  );
};

export default Router;
