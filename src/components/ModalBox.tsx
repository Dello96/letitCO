import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../supabaseClient';
import Swal from 'sweetalert2';

// type props ={
//     setModalToggle :React.Dispatch<React.SetStateAction<boolean>>
// }

function ModalBox() {
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
          confirmButtonColor: '#3085d6',
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
