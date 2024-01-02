import React from 'react';
import Nav from './Nav';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

function Layout() {
  return (
    <>
      <Nav />
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
