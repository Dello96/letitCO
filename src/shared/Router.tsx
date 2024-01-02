import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../../src/pages/login/Login';
import BookRegister from '../pages/BookRegister';
import BookSearch from '../pages/BookSearch';
import BookShelf from '../pages/bookShelf/BookShelf';
import Detail from '../pages/detail';
import Calendar from '../pages/calendar';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../query/keys';
import { getCurrentUser } from '../api/supabaseData';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { RootState } from '../redux/store';
import Layout from '../components/Layout';
const Router = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user);
  console.log('currentUser', currentUser);
  const { data: userData } = useQuery({
    queryKey: [QUERY_KEYS.AUTH],
    queryFn: getCurrentUser
  });
  useEffect(() => {
    if (userData) {
      dispatch(setUser(userData));
    }
  }, [userData, dispatch]);
  console.log('커런드 유저다', currentUser);
  return (
    <BrowserRouter>
      <Routes>
        {currentUser ? (
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
