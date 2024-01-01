import styled from 'styled-components';

const BookInfoSection = styled.section`
  margin-top: 50px;
  /* background-color: #d3f2db; */
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #d9d9d9;
`;

const Wrapper = styled.div`
  /* background-color: plum; */
  display: flex;
  justify-content: center;
  padding: 20px;
  gap: 50px;
  width: 1000px;
  height: 500px;
`;

const BookCover = styled.div`
  position: relative;
  width: 300px;
  height: 450px;
  background-color: aqua;
  box-shadow: 1px 1px 20px 5px rgba(0, 0, 0, 0.1);
  & img {
    width: 100%;
    height: 100%;
  }
  //북마크 이미지로 대체
  & p {
    position: absolute;
    margin: 10px 0 0 230px;
  }
`;

const TextInfo = styled.div`
  /* background-color: cadetblue; */
  width: 500px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  gap: 20px;
  & h1 {
    width: 410px;
    font-size: 32px;
    font-weight: 700;
  }
  & .category {
    color: grey;
  }
`;

const TextInfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const IsReading = styled.p`
  padding: 10px 15px;
  border: 1px solid #2a6b3b;
  border-radius: 20px;
  color: #2a6b3b;
  font-weight: 500;
`;

const PublishInfo = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  /* color: grey; */
  & span {
    padding-left: 10px;
    margin-left: 10px;
    border-left: 1px solid grey;
  }
`;

const Description = styled.h3`
margin-top: 10px;
  line-height: 1.7;
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  & input {
    width: 80px;
  }
  & button {
    margin-left: 20px;
    border: none;
    border-radius: 3px;
    color: white;
    background-color: #669674;
    padding: 5px 7px;
    font-size: 14px;
    transition: 200ms;
    &:hover {
      background-color: #295435;
      transition: 200ms;
      cursor: pointer;
    }
  }
  & form {
    display: flex;
    align-items: center;
  }
`;
const PageSubmit = styled.h3`
  cursor: pointer;
  margin: 25px 0;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;

export default {
  BookInfoSection,
  Wrapper,
  BookCover,
  TextInfo,
  IsReading,
  TextInfoHeader,
  PublishInfo,
  Description,
  PageSubmit,
  Page,
};
