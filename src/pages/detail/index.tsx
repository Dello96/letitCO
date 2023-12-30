import React, { useState } from 'react';
import BookInfo from './bookInfo';
import styled from 'styled-components';
import NewMemo from './newMemo';
import MemoList from './memoList';

const Detail = () => {
  const [currentUserId, setCurrentUserId] = useState('');
  return (
    <Container>
      <BookInfo />
      <NewMemo currentUserId={currentUserId} setCurrentUserId={setCurrentUserId} />
      <MemoList currentUserId={currentUserId} />
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
