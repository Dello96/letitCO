import React from 'react';
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
  StReadingMemo,
  StReadingMemoIndex
} from './style';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../query/keys';
import { getBooks } from '../../api/supabaseData';
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

  const { isLoading, data: books } = useQuery({
    queryKey: [QUERY_KEYS.BOOKS],
    queryFn: getBooks
  });

  const bookOnDashboard: Book = books?.find( b => !!b.inOnDashboard)
  const {page, readUpto} = bookOnDashboard
  const percentage = (readUpto! / page!) * 100;
  console.log(`${percentage | 0}%`)
  return (
    <>
      <Header />
      <StMain>
        {isLoading ? (
          <p>로딩중</p>
        ) : (
          <StMainSection1>
            <div>
              <StNotice>000님 ! 벌써 00 페이지 읽으셨네요!!</StNotice>
            </div>
            <StReadingBox>
              <StBookcover>{bookOnDashboard.cover}</StBookcover>
              <StBookProgressWrap>
                <StBookProgressMove></StBookProgressMove>
                <StBookProgressPoint></StBookProgressPoint>
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
