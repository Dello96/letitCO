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
  color: white;
  padding: 15px 46px;
  border: none;
  border-radius: 5px;
  background-color: #669674;
  transition: 200ms;
  &:hover {
    cursor: pointer;
    background-color: #295435;
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
  }
`;



export default { Container, AddMemoToggleBtn, AddMemoForm };
