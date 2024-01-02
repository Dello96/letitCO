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
`;

export const StLogo = styled.img`
  cursor: pointer;
  height: 100px;
  margin-left: 20px;
`;

export const StTabList = styled.ul`
  width: 70%;
  display: flex;
  align-items: center;
  color: white;
  justify-content: space-evenly;
`;

export const StTabListItem = styled.li`
  cursor: pointer;
`;
export const StNavMenuNone = styled.div`
  display: none;
  @media screen and (max-width: 200) {
    display: flex;
    flex-direction: column;
    list-style: none;
    align-items: center;
    width: 80%;
    padding-bottom: 10px;
    gap: 5px;
    li {
      width: 100%;
      text-align: center;
    }
    li:hover {
    }
  }
`;

export const StNavMenu = styled.div``;
