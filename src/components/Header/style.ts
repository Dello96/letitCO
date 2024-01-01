import styled from 'styled-components';

export const StHeader = styled.header`
  background-color: #0e411d;
  width: 100%;
  height: 100px;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
`;

export const StLogo = styled.div`
  background-color: blue;
  width: 100px;
  cursor: pointer;
`;

export const StNav = styled.nav`
  display: flex;
  justify-content: space-around;
  width: 1400px;
  margin: 40px 110px 40px 0;
  color: white;
`;

export const StNavList = styled.p`
  cursor: pointer;
`;

export const StDropdownIcon = styled.div`
  font-size: 60px;
  margin: 20px 20px;
  cursor: pointer;
  font-weight: 700;
  display: flex;
  gap: 10px;
`;

export const StDropDownWrap = styled.div`
  height: 152px;
  display: flex;
  /* position: fixed; */
`;

export const StDropDownContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  list-style: none;
  margin-top: 100px;
`;

export const StDropDownList = styled.p`
  height: 40px;
  width: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  list-style: none;
  padding: 10px;
  z-index: 1;
  margin-top: 10px;
  border: 1px solid black;
  cursor: pointer;
`;
