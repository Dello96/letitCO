import React from 'react';
import styled from 'styled-components';
import { FadeLoader } from 'react-spinners';

function Loading() {
  return (
    <StBackground>
      <FadeLoader color="#36d7b7" />
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
