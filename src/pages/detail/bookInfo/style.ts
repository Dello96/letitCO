import styled, { css } from 'styled-components';

const BookInfoSection = styled.section`
  margin-top: 50px;
  /* background-color: #d3f2db; */
  width: 100%;
  height: 600px;
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
  width: 550px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  gap: 18px;
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

const IsReading = styled.p<{ $isReading: boolean }>`
  padding: 15px 20px;
  ${(props) =>
    props.$isReading
      ? css`
          border: 1px solid #2a6b3b;
          color: #2a6b3b;
        `
      : css`
          border: none;
          background-color: #2a6b3b;
          color: white;
        `}
  border-radius: 25px;
  font-weight: 500;
`;

const PublishInfo = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  color: grey;
  & span {
    padding-left: 10px;
    margin-left: 10px;
    border-left: 1px solid grey;
  }
`;

const Description = styled.h3`
  line-height: 1.7;
`;

const UserReadingInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Page = styled.div`
  display: flex;
  position: relative;
  /* flex-direction: column; */
  /* justify-content: center; */
  & input {
    width: 50px;
  }
  & button {
    margin: 0 0 0 20px;
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    color: white;
    background-color: #669674;
    /* padding: 2px 4px; */
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
    & p {
      margin-right: 25px;
    }
  }
`;
const PageSubmit = styled.h3`
  position: absolute;
  cursor: pointer;
  margin: 25px 120px;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;

const PageNumber = styled.span`
  font-weight: 600;
`;

const Timeline = styled.div`
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  margin: 27px 0 0 0;
`;
const StartAdnEnd = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
  /* flex-direction: column; */
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
  PageNumber,
  UserReadingInfo,
  StartAdnEnd,
  Timeline
};
