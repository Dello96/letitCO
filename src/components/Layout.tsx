import React from 'react';
import Nav from './Nav';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Timer from '../pages/login/Timer';

function Layout() {
  return (
    <>
      <Nav />
      <Timer />
      <StDiv>
        <Outlet />
      </StDiv>
    </>
  );
}

const StDiv = styled.div`
  margin-top: 80px;
`;
export default Layout;
