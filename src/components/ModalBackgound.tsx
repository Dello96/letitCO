import React from 'react';
import ModalBox from './ModalBox';
import styled from 'styled-components';

function ModalBackgound() {
  return (
    <StBackGround>
      <ModalBox />
    </StBackGround>
  );
}

const StBackGround = styled.div`
  width: 100%;
  height: 100%;
  background-color: transparent;
`;
export default ModalBackgound;
