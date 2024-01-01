import styled from 'styled-components';
const PlaceHolder = styled.div``;

const Memo = styled.li`
  margin: 10px;
  /* background-color: #fcacac; */
  width: 700px;
  height: 210px;
  border: 1px solid #dedede;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 20px;
`;

const Content = styled.p`
  font-size: 16px;
  line-height: 1.7;
  padding: 12px;
  /* background-color: aqua; */
  border-radius: 10px;
  height: 130px;
  width: 100%;
`;

const TextArea = styled.textarea`
  font-size: 16px;
  line-height: 1.7;
  padding: 12px;
  /* background-color: aqua; */
  border: none;
  border-radius: 10px;
  height: 127px;
  resize: none;
  width: 100%;
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
  margin-left: 88%;
  & p {
    background-color: transparent;
    color: grey;
    &:hover {
      color: #669674;
      cursor: pointer;
      font-weight: 600;
    }
  }
  & .leftBtn {
      border-right: 1px solid lightgrey;
      padding-right: 8px;
    }
`;

export default { PlaceHolder, Memo, Content, TextArea, Buttons };
