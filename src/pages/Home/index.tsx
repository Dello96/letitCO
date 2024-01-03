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
  StBookAuthor
} from './style';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../query/keys';
import { getBooks, getCurrentUser } from '../../api/supabaseData';
import { Book } from '../../types/global.d';
import ProgressBar from './ProgressBar';
import Loading from '../../components/Loading';
import { FaSearchPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';


export default function Home() {
  const navigate = useNavigate();
 
  const currenUserId = useSelector((state: RootState) => state.user.id)

  // 유저 닉네임 가져오기
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
    }
  }, [userData]);


  // 책 정보 가져오기
  const { isLoading, data: books } = useQuery({
    queryKey: [QUERY_KEYS.BOOKS],
    queryFn: getBooks
  });

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

  const readingBook = books?.find(
    (item) => currenUserId === item.uid && item.isReading === true
  );

  return (
    <>
      <StMain>
      {readingBook ? (
        <StMainSection1 onClick={() => navigate(`/detail/${readingBook.id}`)}>
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
          ?.filter((item) => currenUserId === item.uid && item.isDone === true)
          .map((item) => {
            if (item.isDone === true) {
              return (
                <>
                  <StBookDoneList key={item?.id} onClick={() => navigate(`/detail/${item.id}`)}>
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
