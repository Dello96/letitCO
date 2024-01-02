import ReactModal from 'react-modal';
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
  z-index: 10;
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
  display: flex;
  flex-direction: column;
`;

export const StCustomModal: ReactModal.Styles = {
  overlay: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
    zIndex: '10',
    position: 'fixed',
    top: '0',
    left: '0'
  },
  content: {
    width: '200px',
    height: '130px',
    zIndex: '150',
    position: 'absolute',
    top: '70px',
    left: '100%',
    borderRadius: '3px',
    justifyContent: 'center'
  }
};
