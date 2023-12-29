import React from 'react';
import BookInfo from './bookInfo';
import MemoSection from './memo';
import styled from 'styled-components';

const Detail = () => {
  return (
    <Container>
      <BookInfo />
      <MemoSection />
    </Container>
  );
};

const Container = styled.div`
  /* background-color: beige; */
  min-width: 1200px;
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Detail;
