import React from 'react';
// import Header from '../../components/Header';
import {
  StMain,
  StMainSection1,
  StNotice,
  StReadingBox,
  StBookcover,
  StBookProgressWrap,
  StBookProgressMove,
  StBookProgressPoint,
  StMainSection2,
  StBookDoneTitle,
  StBookDoneList,
  StReadingPeriod,
  StReadingStar,
  StReadingMemo,
  StReadingMemoIndex
} from './style';
import Nav from '../../components/Nav';

export default function Home() {
  // const [currentPage, setCurrentPage] = React.useState<number>(0);
  // const totalPage = data?.length || 0;
  // const progressPercentage = ((currentPage + 1) / totalPage) * 100;

  return (
    <>
      <Nav />
      <StMain>
        <StMainSection1>
          <div>
            <StNotice>000님 ! 벌써 00 페이지 읽으셨네요!!</StNotice>
          </div>
          <StReadingBox>
            <StBookcover>책 표지</StBookcover>
            <StBookProgressWrap>
              <StBookProgressMove></StBookProgressMove>
              <StBookProgressPoint></StBookProgressPoint>
            </StBookProgressWrap>
          </StReadingBox>
        </StMainSection1>
        <StMainSection2>
          <StBookDoneTitle>완주 목록</StBookDoneTitle>
          <StBookDoneList>
            <StBookcover>책 표지</StBookcover>
            <div>
              <StReadingPeriod>읽은 기간</StReadingPeriod>
              <StReadingStar>평점</StReadingStar>
              <div>
                <StReadingMemo>독서 메모</StReadingMemo>
                <StReadingMemoIndex></StReadingMemoIndex>
              </div>
            </div>
          </StBookDoneList>
        </StMainSection2>
      </StMain>
    </>
  );
}
