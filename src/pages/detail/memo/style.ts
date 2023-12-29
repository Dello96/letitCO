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

const Memo = styled.li`
  margin: 10px;
  background-color: #fcacac;
  width: 700px;
  height: 200px;
`;

const Content = styled.p`
  font-size: 16px;
  line-height: 1.7;
  padding: 12px;
  background-color: aqua;
  border-radius: 10px;
  height: 150px;
`;

const TextArea = styled.textarea`
  font-size: 16px;
  line-height: 1.7;
  padding: 12px;
  background-color: aqua;
  border-radius: 10px;
  height: 150px;
  resize: none;
`;

const Buttons = styled.div``;

export default { Container, AddMemoToggleBtn, AddMemoForm, Memo, Content, TextArea, Buttons };
