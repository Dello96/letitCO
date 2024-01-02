import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMenu } from 'react-icons/io5';
import { StNavbar, TabList } from './style';
function Nav() {
  const navigate = useNavigate();
  return (
    <StNavbar>
      <img src="" />
      <TabList>
        <li onClick={() => navigate('/booksearch')}>도서 검색</li>
        <li onClick={() => navigate('/bookshelf')}>내 서재</li>
        <li onClick={() => navigate('/calendar')}>독서 캘린더</li>
      </TabList>
      <IoMenu size={70} />
    </StNavbar>
  );
}

export default Nav;
