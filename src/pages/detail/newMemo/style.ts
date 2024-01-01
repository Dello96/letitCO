import styled from 'styled-components';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  gap: 50px;
`;

const AddMemoToggleBtn = styled.button`
  font-size: 16px;
  font-weight: 600;
  color:  #669674;
  background-color: transparent;
  padding: 15px 42px;
  border: 2px solid  #669674;
  border-radius: 5px;
  transition: 200ms;
  &:hover {
    cursor: pointer;
    background-color: #669674;
    color: white;
    transition: 200ms;
  }
`;

const AddMemoForm = styled.form`
  /* background-color: #fcacac; */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 700px;
  margin: 50px 0;
  gap: 20px;
  & textarea {
    resize: none;
    padding: 15px;
    width: 700px;
    height: 120px;
    border: 1px solid #dbdbdb;
    border-radius: 8px;
  }
  & button {
    font-size: 16px;
    font-weight: 600;
    color: white;
    padding: 15px 60px;
    border: none;
    border-radius: 5px;
    background-color: #669674;
    cursor: pointer;
    transition: 200ms;
    &:hover {
      background-color: #295435;
      transition: 200ms;
    }
  }
`;



export default { Container, AddMemoToggleBtn, AddMemoForm };
