import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StLogo, StNavbar, StTabList, StTabListItem } from './style';
import logoWhite from '../../assets/logo.white.png';
import { supabase } from '../../supabaseClient';

// import ReactModal from 'react-modal';
// import { StCustomModal } from './style';
function Nav() {
  const navigate = useNavigate();
  const signOutHandler = async () => {
    const data = await supabase.auth.signOut();
    console.log('로그아웃 후 데이터', data);
    navigate('/login');
    alert('로그아웃 되었습니다.');
  };
  return (
    <>
      <StNavbar>
        <StLogo src={`${logoWhite}`} onClick={() => navigate('/')} />
        <StTabList>
          <StTabListItem onClick={() => navigate('/booksearch')}>도서 검색</StTabListItem>
          <StTabListItem onClick={() => navigate('/bookshelf')}>내 서재</StTabListItem>
          <StTabListItem onClick={() => navigate('/calendar')}>독서 캘린더</StTabListItem>
          <StTabListItem onClick={signOutHandler}>로그아웃</StTabListItem>
        </StTabList>
      </StNavbar>
    </>
  );
}

export default Nav;
