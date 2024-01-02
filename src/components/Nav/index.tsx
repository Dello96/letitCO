import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StLogo, StNavbar, StTabList, StTabListItem } from './style';
import logoWhite from '../../assets/logo.white.png';
import { supabase } from '../../supabaseClient';
import Swal from 'sweetalert2';

// import ReactModal from 'react-modal';
// import { StCustomModal } from './style';
function Nav() {
  const navigate = useNavigate();
  const signOutHandler = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      console.log(error);
      if (!error) {
        const result = await Swal.fire({
          title: '정말 로그아웃 하시겠습니까?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085D6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        });
        if (result.isConfirmed) {
          navigate('/login');
          Swal.fire({
            title: '로그아웃 완료!',
            icon: 'success'
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
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