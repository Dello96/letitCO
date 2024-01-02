import React, { useEffect } from 'react';
import Header from '../../components/Header';
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
import { useQuery} from 'react-query'
import { QUERY_KEYS } from '../../query/keys'
import { getBooks, getCurrentUser } from '../../api/supabaseData'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Book } from '../../types/global.d';

export default function Home() {
  // const circle = useRef(null);
  // const box = useRef(null);
  // const [con, setCon] = useState(null);
  // const [cir, setCir] = useState(null);
  // let h1 = useRef(null)
  // const [num,setNum] = useState(null);

  // useEffect(() => {
  //   const conWidth = box.current.getBoundingClientRect().width;
  //   setCon(conWidth);
  //   const circleWidth = circle.current.getBoundingClientRect().width;
  //   setCir(circleWidth);
  // }, []);

  // let isDragging = null;
  // let originX = null;
  // let originLeft = null;
  // let result;

  // const drag = (e) => {
  //   isDragging = true;
  //   originX = e.clientX;
  //   originLeft = circle.current.offsetWidth;
  // };
  // const move = (e) => {
  //   if (isDragging) {
  //     const diffX = e.clientX - originX;
  //     const endX = con - cir;
  //     circle.current.style.width = `${Math.min(Math.max(0, originLeft + diffX),endX)}px`;
  //   }
  // };
  // const stop = (e) => {
  //   isDragging = false;
  // };
  // const getPercent = (e) => {
  //   result = parseInt(circle.current.offsetWidth/3.49 );
  //   setNum(result)
  //   h1.current.innerText=result+"%"
  // }

  // const init = (e) => {
  //   let endX = con - cir;
  //   circle.current.style.width = `${Math.min(Math.max(0, e.clientX - e.currentTarget.offsetLeft),endX)}px`;
  // }
  
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

  const currentUser = useSelector((state: RootState) => state.user)
  console.log("현재유저", currentUser.id);

  // 책 정보 가져오기
  const { isLoading, data: books } = useQuery({
    queryKey: [QUERY_KEYS.BOOKS],
    queryFn: getBooks
  });
  const { id } = useParams();
  const book = books?.find((book) => book.id === id);
  console.log("책 정보", book);


  const bookOnDashboard: Book = books?.find((b) => !!b.inOnDashboard);
  const { page, readUpto } = bookOnDashboard || {};
  const percentage = (readUpto! / page!) * 100;
  console.log(`${percentage | 0}%`);
  return (
    <>
      <Header />
      <StMain>
        {isLoading ? (
          <p>로딩중</p>
        ) : (
          <StMainSection1>
            <div>
            <StNotice>{currentUserNickname}님 ! 벌써 {book?.readUpto} 페이지 읽으셨네요!!</StNotice>
            </div>
            <StReadingBox>
              <StBookcover>
                <img src={bookOnDashboard.cover} alt="" />
              </StBookcover>
              <StBookProgressWrap>
                <StBookProgressMove></StBookProgressMove>
                <StBookProgressPoint></StBookProgressPoint>
              </StBookProgressWrap>
            </StReadingBox>
          </StMainSection1>
        )}
        <StMainSection2>
          <StBookDoneTitle>완주 목록</StBookDoneTitle>
          {books?.filter((item) => currentUser.id === item.uid)
          .map((item) => {
                  if (item.isReading === true) {
                    if (item.isMarked === false) {
                      return <>
                      <StBookDoneList key={item?.id}>
                      <StBookcover>
                        <img src={item?.cover} alt="bookCover" />
                      </StBookcover>
                      <div>
                        <div>{item.title}</div>
                        <div>{item.author}</div>
                        <StReadingPeriod>{item?.startDate} ~ {item?.endDate}</StReadingPeriod>
                        <StReadingStar>평점</StReadingStar>
                      </div>
                      </StBookDoneList>
                    </>;
                    }
                  }
                })}
        </StMainSection2>
      </StMain>
    </>
  );
}
