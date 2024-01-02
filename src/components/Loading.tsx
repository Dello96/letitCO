import React from 'react';
import Spinner1 from '../assets/spinner.gif';
import styled from 'styled-components';

function Loading() {
  return (
    <StBackground>
      <Spinner1 />
    </StBackground>
  );
}
const StBackground = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Loading;
