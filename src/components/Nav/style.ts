import styled from 'styled-components';

export const StNavbar = styled.nav`
  background-color: #0e411d;
  width: 100%;
  height: 80px;
  position: fixed;
  top: 0;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  z-index: 5;
`;

export const StLogo = styled.img`
  cursor: pointer;
  height: 110px;
  width: 110px;
  margin-left: 30px;
  margin-top: -10px;
`;

export const StTabList = styled.ul`
  width: 90%;
  display: flex;
  align-items: center;
  color: white;
  justify-content: space-around;
`;

export const StTabListItem = styled.li`
  cursor: pointer;
`;
export const StNavMenuNone = styled.div`
  display: flex;
  flex-direction: column;
`;
