import React from 'react'
import Header from '../../components/Header'
import {
  StMain,
  StMainSection1,
  StNotice,
  StReadingBox,
  StBookcover,
  StBookProgressWrap,
  StBookProgressMove,
  StMainSection2,
  StBookDoneTitle,
  StBookDoneList,
  StReadingPeriod,
  StReadingStar,
  StReadingMemo
 } from './style'

export default function Home() {
  // const [currentPage, setCurrentPage] = React.useState<number>(0);
  // const totalPage = data?.length || 0;
  // const progressPercentage = ((currentPage + 1) / totalPage) * 100;


  return (
    <>
      <Header />
      <StMain>
        <StMainSection1>
          <div>
            <StNotice>000님 ! 벌써 00 페이지 읽으셨네요!!</StNotice>
          </div>
            <StReadingBox>
              <StBookcover>책 표지</StBookcover>
              <StBookProgressWrap>
                <StBookProgressMove></StBookProgressMove>
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
              <StReadingMemo>독서 메모</StReadingMemo>
            </div>
          </StBookDoneList>
        </StMainSection2>
      </StMain>
    </>
  )
}
