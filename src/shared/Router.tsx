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
import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../query/keys';
import { getCurrentUser } from '../api/supabaseData';

const Router = () => {
  // const currentUser = useSelector((state: RootState) => state.user);
  // console.log('currentUser===>', currentUser.id);
  const { data } = useQuery([QUERY_KEYS.AUTH], getCurrentUser);
  console.log(!!data);
  return (
    <BrowserRouter>
      <Routes>
        {data ? (
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
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
