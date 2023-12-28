import React from 'react';
import styled from 'styled-components';

function BookShelf() {
  return (
    <>
      <MainContainer>
        <TempHeader />
        <WrapBookShelf>
          <BtnAndShelf>
            <Btns>읽고 싶은 책</Btns>
            <BookShelfs>
              <Books>
                <Book />
                <Book />
                <Book />
                <Book />
              </Books>
            </BookShelfs>
          </BtnAndShelf>
          <BtnAndShelf>
            <Btns>읽고 있는 책</Btns>
            <BookShelfs />
          </BtnAndShelf>
          <BtnAndShelf>
            <Btns>다 읽은 책</Btns>
            <BookShelfs />
          </BtnAndShelf>
        </WrapBookShelf>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TempHeader = styled.header`
  display: flex;
  width: 100%;
  height: 150px;
  background-color: aliceblue;
`;

const BtnAndShelf = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const Btns = styled.div`
  display: flex;
  flex-direction: column;
`;

const WrapBookShelf = styled.div`
  width: 100%;
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-top: 100px;
`;

const BookShelfs = styled.div`
  max-width: 1000px;
  width: 80%;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  z-index: -1;
  position: relative;
  height: 0px;
  box-sizing: border-box;
  border-bottom: 16px solid #f3f3f3;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  pointer-events: all;

  // bookshelf front-side
  &::before {
    content: '';
    position: absolute;
    top: 16px;
    background: linear-gradient(90deg, #fafafa 0%, #ffffff 100%);
    height: 26px;
    width: calc(100% + 40px);
    box-shadow: 0px -1px 6px rgba(0, 0, 0, 0.05), 0px 4px 16px rgba(0, 0, 0, 0.25);
    z-index: 2;
  }

  // bookshelf drop-shadow
  &::after {
    content: '';
    height: 80px;
    width: calc(100% + 40px);
    position: absolute;
    top: 42px;
    display: block;
    background: linear-gradient(180deg, #f3f3f3 0%, rgba(255, 255, 255, 0) 100%);
    clip-path: polygon(0% 0%, 100% 0%, 97% 100%, 3% 100%);
    z-index: -1;
  }
`;

const Books = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10%;
  width: 80%;
  margin: auto;
  transform: translateY(-100%);
  padding: 0 0 2px;
  z-index: -1;
  position: relative;
  top: 10px;
  overflow: scroll;
`;

const Book = styled.div`
  --bg-image: url('https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1581128232l/50214741.jpg');
  // background-color: red;
  width: 100%;
  border-radius: 3px 0.5px 0.5px 3px;
  aspect-ratio: 115 / 180;
  position: relative;

  &:hover {
    &::before,
    &::after {
      transition: transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 600ms cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    &::before {
      transform: translate(0, -70px) skew(3deg, -3deg) scale(1.35);
    }

    &::after {
      transform: translate(0, -70px) skew(3deg, -3deg) scale(1.275);
    }

    &:nth-of-type(even) {
      &::before {
        transform: translate(0, -70px) skew(-3deg, 3deg) scale(1.35);
      }

      &::after {
        transform: translate(0, -70px) skew(-3deg, 3deg) scale(1.275);
      }
    }
  }

  &::before,
  &::after {
    position: absolute;
    width: 100%;
    display: block;
    content: ' ';
    transition: all 300ms ease-out;
    background: var(--bg-image) center center/cover no-repeat, #f3f3f3;
  }

  &::before {
    height: 100%;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25), inset 2px 0px 2px 1px rgba(29, 27, 27, 0.2);
  }

  &::after {
    height: 102%;
    filter: blur(10px);
    z-index: -1;
    opacity: 1;
  }
`;

// const ReadingPlan = styled.

export default BookShelf;
