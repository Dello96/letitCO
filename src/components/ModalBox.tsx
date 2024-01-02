import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../supabaseClient';

// type props ={
//     setModalToggle :React.Dispatch<React.SetStateAction<boolean>>
// }

function ModalBox() {
  const navigate = useNavigate();

  const signOutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);
    navigate('/login');
    alert('로그아웃 되었습니다.');
    // console.log()
  };
  return (
    <StModal>
      <div onClick={() => navigate('')}>내 프로필</div>
      <div onClick={signOutHandler}>로그아웃</div>
    </StModal>
  );
}
const StModal = styled.div`
  width: 150px;
  height: 100px;
  background-color: #d8f1df;

  position: absolute;
  top: 80px;
  right: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  gap: 15px;
  margin-top: 3px;
`;

export default ModalBox;
