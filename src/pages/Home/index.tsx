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

  if (isLoading) {
    return (
      <div>
        <Loading />;
      </div>
    );
  }

  return (
    <>
      <StMain>
      {books ? (
        <StMainSection1>
          {books
            ?.filter((item) => currentUser.id === item.uid)
            .map((item) => {
              if (item.inOnDashboard === true && item.isReading === true) {
                return (
                  <>
                    <StNotice>{currentUserNickname}님 ! 벌써 {bookOnDashboard.readUpto} 페이지 읽으셨네요!!</StNotice>
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
                  </>
            );
          }
          })}
        </StMainSection1>
        ) : (
          <div>책을 등록해주세요</div>
        )}
      <StMainSection2>
        <StBookDoneTitle>완주 목록</StBookDoneTitle>
        {books
          ?.filter((item) => currentUser.id === item.uid)
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
                      <StBookTitle>{item.title}</StBookTitle>
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
