import React from 'react';
import Header from '../../components/Header';
import {
  StMain,
  StMainSection1,
  StNotice,
  StReadingBox,
  StBookcover,
  StBookProgressWrap,
  StBookProgress,
  StMainSection2,
  StBookDoneTitle,
  StBookDoneList,
  StReadingPeriod,
  StReadingStar,
  StReadingMemo,
  StReadingMemoIndex,
  StBookcoverimg
} from './style';

import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../query/keys';
import { getBooks } from '../../api/supabaseData';
import { Book } from '../../types/global.d';
import ProgressBar from './ProgressBar';
import { supabase } from '../../supabaseClient';

export default function Home() {
  const { isLoading, data: books } = useQuery({
    queryKey: [QUERY_KEYS.BOOKS],
    queryFn: getBooks
  });

  const bookOnDashboard: Book = books?.find((b) => !!b.inOnDashboard);
  const { page, readUpto, title } = bookOnDashboard || {};
  console.log('tt', title);
  const percentage = (readUpto! / page!) * 100;
  console.log(`${percentage | 0}%`);

  const existUser = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    console.log('현재 세션에 로그인된 유저', user?.user_metadata.nickname);
  };
  existUser();

  return (
    <>
      <Header />
      <StMain>
        {isLoading ? (
          <p>로딩중</p>
        ) : (
          <StMainSection1>
            <div>
              <StNotice>님 ! 벌써 00 페이지 읽으셨네요!!</StNotice>
            </div>
            <StReadingBox>
              <StBookcover>
                <StBookcoverimg src={bookOnDashboard.cover} alt="" />
              </StBookcover>
              <StBookProgressWrap>
                <StBookProgress>
                  <ProgressBar percentage={percentage} title={title} />
                </StBookProgress>
              </StBookProgressWrap>
            </StReadingBox>
          </StMainSection1>
        )}

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
