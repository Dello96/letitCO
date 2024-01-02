import React, { useEffect } from 'react';
import {
  StMain,
  StMainSection1,
  StNotice,
  StReadingBox,
  StAddBookWrap,
  StBookcover,
  StBookcoverimg,
  StBookProgressWrap,
  StAddIcon,
  StAddNotice,
  StBookProgress,
  StMainSection2,
  StBookDoneTitle,
  StBookDoneList,
  StReadingPeriod,
  StBookInfo,
  StBookTitle,
  StBookAuthor,
} from './style';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../query/keys';
import { getBooks, getCurrentUser } from '../../api/supabaseData';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Book } from '../../types/global.d';
import ProgressBar from './ProgressBar';

import { supabase } from '../../supabaseClient';

import Loading from '../../components/Loading';
import { FaSearchPlus } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';


export default function Home() {
  const navigate = useNavigate();

  // 현재 로그인된 유저 정보 가져오기
  const [currentUserNickname, setCurrentUserNickname] = React.useState<string>('');

  const { data: userData } = useQuery({
    queryKey: [QUERY_KEYS.AUTH],
    queryFn: getCurrentUser
  });

  // 유저 닉네임 (구글 로그인 or 이메일 로그인 따라 변경)
  useEffect(() => {
    if (userData) {
      const nickname = userData.user_metadata.nickname;
      const name = userData.user_metadata.name;
      const provider = userData?.app_metadata?.provider;

      setCurrentUserNickname(provider === 'google' ? name : nickname);
      console.log('현재 로그인된 유저 ==>', provider === 'google' ? name : nickname);
    }
  }, [userData]);

  const existUser = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    console.log('현재 세션에 로그인된 유저', user);
  };
  existUser();

  const currentUser = useSelector((state: RootState) => state.user);

  // 책 정보 가져오기
  const { isLoading, data: books } = useQuery({
    queryKey: [QUERY_KEYS.BOOKS],
    queryFn: getBooks
  });


  const { id } = useParams();
  const book = books?.find((book) => book.id === id);
  console.log('책 정보', book);


  //대시보드 북 find 반환 조건에 uid 일치여부 추가해야함
  const bookOnDashboard: Book = books?.find((b) => !!b.inOnDashboard);
  const { page, readUpto, title } = bookOnDashboard || {};
  const percentage = (readUpto! / page!) * 100;
  console.log(`${percentage | 0}%`);

  if (isLoading) {
    return (
      <div>
        <Loading />;
      </div>
    );
  }

  const readingBook = books?.find((item) => currentUser.id === item.uid && item.inOnDashboard === true && item.isReading === true);

  return (
    <>
      <StMain>
      {readingBook ? (
        <StMainSection1>
          <StNotice>{currentUserNickname}님! 벌써 {readingBook?.readUpto} 페이지 읽으셨네요 🔥</StNotice>
          <StReadingBox>
            <StBookcover>
              <StBookcoverimg src={readingBook?.cover} alt="" />
            </StBookcover>
            <StBookProgressWrap>
              <StBookProgress>
                <ProgressBar percentage={percentage} title={title} />
              </StBookProgress>
            </StBookProgressWrap>
          </StReadingBox>
        </StMainSection1>
        ) : (
        <StAddBookWrap onClick={() => navigate('/booksearch')}>
          <StAddIcon>
            <FaSearchPlus />
          </StAddIcon>
          <StAddNotice>읽고싶은 책을 추가해주세요.</StAddNotice>
        </StAddBookWrap>
        )}
      <StMainSection2>
        <StBookDoneTitle>📚 완주 목록</StBookDoneTitle>
          {books
          ?.filter((item) => currentUser.id === item.uid && item.isDone === true)
          .map((item) => {
            if (item.isDone === true) {
              return (
                <>
                  <StBookDoneList key={item?.id}>
                  <StBookcover>
                    <StBookcoverimg src={item?.cover} alt="bookCover" />
                  </StBookcover>
                  <div>
                    <StBookInfo>
                      <StBookTitle>✅ {item.title}</StBookTitle>
                      <StBookAuthor>{item.author}</StBookAuthor>
                    </StBookInfo>
                    <StReadingPeriod>{item?.startDate} ~ {item?.endDate}</StReadingPeriod>
                  </div>
                  </StBookDoneList>
                </>
              );
            }
          })}
      </StMainSection2>
      </StMain>
    </>
  );
}
