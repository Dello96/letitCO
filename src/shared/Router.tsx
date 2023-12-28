import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import BookRegister from '../pages/BookRegister';
import BookSearch from '../pages/BookSearch';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bookregister" element={<BookRegister />} />
        <Route path="/booksearch" element={<BookSearch />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
