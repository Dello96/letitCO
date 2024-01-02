import React, { useEffect } from 'react';
import {
  StMain,
  StMainSection1,
  StNotice,
  StReadingBox,
  StBookcover,
  StBookcoverimg,
  StBookProgressWrap,
  StBookProgress,
  StMainSection2,
  StBookDoneTitle,
  StBookDoneList,
  StReadingPeriod,
  StReadingStar
} from './style';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../query/keys';
import { getBooks, getCurrentUser } from '../../api/supabaseData';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Book } from '../../types/global.d';
import ProgressBar from './ProgressBar';

export default function Home() {
  // 현재 로그인된 유저 정보 가져오기
  const [currentUserNickname, setCurrentUserNickname] = React.useState<string>('');

  const { data: userData } = useQuery({
    queryKey: [QUERY_KEYS.AUTH],
    queryFn: getCurrentUser
  });

  useEffect(() => {
    if (userData) {
      setCurrentUserNickname(userData.user_metadata.nickname);
      console.log('현재 로그인된 유저 ==>', userData.user_metadata.nickname);
    }
  }, [userData]);

  const currentUser = useSelector((state: RootState) => state.user);

  // 책 정보 가져오기
  const { isLoading, data: books } = useQuery({
    queryKey: [QUERY_KEYS.BOOKS],
    queryFn: getBooks
  });

  const { id } = useParams();
  const book = books?.find((book) => book.id === id);
  console.log("책 정보", book);

//대시보드 북 find 반환 조건에 uid 일치여부 추가해야함
  const bookOnDashboard: Book = books?.find((b) => !!b.inOnDashboard);
  const { page, readUpto, title } = bookOnDashboard || {};
  console.log('tt', title);
  const percentage = (readUpto! / page!) * 100;
  console.log(`${percentage | 0}%`);

  return (
    <>
      <StMain>
        {isLoading ? (
          <p>로딩중</p>
        ) : (
          <StMainSection1>
            <div>
              <StNotice>
                {currentUserNickname}님 ! 벌써 {bookOnDashboard.readUpto} 페이지 읽으셨네요!!
              </StNotice>
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
          {books
            ?.filter((item) => currentUser.id === item.uid)
            .map((item) => {
              if (item.isReading === true) {
                if (item.isMarked === false) {
                  return (
                    <>
                      <StBookDoneList key={item?.id}>
                        <StBookcover>
                          <img src={item?.cover} alt="bookCover" />
                        </StBookcover>
                        <div>
                          <div>{item.title}</div>
                          <div>{item.author}</div>
                          <StReadingPeriod>
                            {item?.startDate} ~ {item?.endDate}
                          </StReadingPeriod>
                          <StReadingStar>평점</StReadingStar>
                        </div>
                      </StBookDoneList>
                    </>
                  );
                }
              }
            })}
        </StMainSection2>
      </StMain>
    </>
  );
}
