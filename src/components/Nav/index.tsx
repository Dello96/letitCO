import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMenu } from 'react-icons/io5';
import { StLogo, StNavMenu, StNavMenuNone, StNavbar, StTabList, StTabListItem } from './style';
import logoWhite from '../../assets/logo.white.png';
function Nav() {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const onclickToggleHandler = () => {
    setToggle(!toggle);
  };
  return (
    <StNavbar>
      <StLogo src={`${logoWhite}`} onClick={() => navigate('/')} />
      <StTabList>
        <StTabListItem onClick={() => navigate('/booksearch')}>도서 검색</StTabListItem>
        <StTabListItem onClick={() => navigate('/bookshelf')}>내 서재</StTabListItem>
        <StTabListItem onClick={() => navigate('/calendar')}>독서 캘린더</StTabListItem>
      </StTabList>
      <StNavMenu>
        <li>내 프로필</li>
        <li>로그아웃</li>
      </StNavMenu>
      {toggle ? (
        <StNavMenuNone>
          <li>내 프로필</li>
          <li>로그아웃</li>
        </StNavMenuNone>
      ) : null}
      <IoMenu size={70} onClick={onclickToggleHandler} />
    </StNavbar>
  );
}

export default Nav;
