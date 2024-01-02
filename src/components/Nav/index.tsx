import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMenu } from 'react-icons/io5';
import { StLogo, StNavbar, StTabList, StTabListItem } from './style';
import logoWhite from '../../assets/logo.white.png';
import ModalBackgound from '../ModalBackgound';
// import ReactModal from 'react-modal';
// import { StCustomModal } from './style';
function Nav() {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState<boolean>(false);
  const onclickToggleHandler = () => {
    setToggle(!toggle);
  };
  return (
    <>
      <StNavbar>
        <StLogo src={`${logoWhite}`} onClick={() => navigate('/')} />
        <StTabList>
          <StTabListItem onClick={() => navigate('/booksearch')}>도서 검색</StTabListItem>
          <StTabListItem onClick={() => navigate('/bookshelf')}>내 서재</StTabListItem>
          <StTabListItem onClick={() => navigate('/calendar')}>독서 캘린더</StTabListItem>
        </StTabList>

        {/* {toggle ? (
        <StNavMenuNone>
          <div>내 프로필</div>
          <div>로그아웃</div>
        </StNavMenuNone>
      ) : null} */}

        {/* <ReactModal
      isOpen={onclickToggleHandler}
      onRequestClose={onclickToggleHandler}
      style={StCustomModal}
      shouldCloseOnOverlayClick={true}
      ></ReactModal> */}
        <IoMenu size={70} onClick={onclickToggleHandler} />
      </StNavbar>
      <div>{toggle && <ModalBackgound />}</div>
    </>
  );
}

export default Nav;
