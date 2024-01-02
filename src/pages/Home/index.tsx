import React, { useEffect } from 'react'
import Header from '../../components/Header'
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
 } from './style'
import { useQuery } from 'react-query'
import { QUERY_KEYS } from '../../query/keys'
import { getBooks, getCurrentUser } from '../../api/supabaseData'
import { useParams } from 'react-router-dom'

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

  // 책 정보 가져오기
  const {data: books} = useQuery({
    queryKey: [QUERY_KEYS.BOOKS],
    queryFn: getBooks,
  });

  const {id} = useParams();
  const book = books?.find((book) => book.id === id );
  console.log("책 정보", book);


  // 읽은 페이지 표시
  const progressPercentage = book ? ((book.readUpto || 0) / (book.page)) * 100 : 0;


  return (
    <>
      <Header />
      <StMain>
        <StMainSection1>
          <div>
            <StNotice>{currentUserNickname}님 ! 벌써 {book.readUpto} 페이지 읽으셨네요!!</StNotice>
          </div>
            <StReadingBox>
              <StBookcover></StBookcover>
              <StBookProgressWrap>
                <StBookProgressMove></StBookProgressMove>
                <StBookProgressPoint style={{width: `${progressPercentage}%`}}></StBookProgressPoint>
              </StBookProgressWrap>
            </StReadingBox>
        </StMainSection1>
        <StMainSection2>
          <StBookDoneTitle>완주 목록</StBookDoneTitle>
          <StBookDoneList key={book && book.id}>
            {book && (
              <>
                <StBookcover>
                  <img src={book.cover} alt="bookCover" />
                </StBookcover>
                <div>
                  <StReadingPeriod>{book.startDate} ~ {book.endDate}</StReadingPeriod>
                  <StReadingStar>평점</StReadingStar>
                </div>
              </>
            )}
          </StBookDoneList>
        </StMainSection2>
      </StMain>
    </>
  )
}
