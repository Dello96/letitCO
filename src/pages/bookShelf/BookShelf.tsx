import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
// import { useInView } from 'react-intersection-observer';
import { HiBookmark } from 'react-icons/hi';
import { FaFire } from 'react-icons/fa';
import { QUERY_KEYS } from '../../query/keys';
import { getItemData } from '../../api/aldData';
import { getCurrentUser } from '../../api/supabaseData';
import { getBooks } from '../../api/supabaseData';
import './style.css';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

function BookShelf() {
  const { id } = useParams();
  const { data } = useQuery([QUERY_KEYS.DETAIL, id], () => getItemData(id!));

  const [currentUserNickname, setCurrentUserNickname] = React.useState<string>('');
  const { isLoading: memoIsReading, data: memos } = useQuery({
    queryKey: [QUERY_KEYS.BOOKS],
    queryFn: getBooks
  });

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

  const dashBoardHandler = () => {
    Swal.fire({
      title: '대시보드에 추가하시겠습니까?',

      cancelButtonText: '취소',
      showCancelButton: true
    });
  };

  // const { ref, inView } = useInView({
  //   threshold: 0.3
  // });

  // useEffect(() => {
  //   if (inView && hasNextPage && !isFetchingNextPage) {
  //     fetchNextPage();
  //   }
  // }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
  const navigate = useNavigate();
  const moveDetailPage = (item: string) => {
    navigate(`/detail/${item}`);
  };

  console.log(data);
  console.log(memos);
  console.log(memoIsReading);
  console.log(currentUser);
  console.log(currentUserNickname);
  return (
    <>
      <MainContainer>
        <WrapBookShelf>
          <BtnAndShelf>
            <Btns>읽고 싶은 책</Btns>
            <BookShelfs>
              <Books>
                {memos
                  ?.filter((item) => item.isMarked === true && item.uid === currentUser.id)
                  .map((item) => {
                    return (
                      <>
                        <WrapingBook>
                          <BookMarkBtn onClick={() => {}}>
                            <HiBookmark
                              style={{
                                color: item.isMarked ? 'black' : 'red'
                              }}
                            />
                          </BookMarkBtn>
                          <PlaningBook key={item.uid} src={item.cover} onClick={() => moveDetailPage(item.id)} />
                        </WrapingBook>
                      </>
                    );
                  })}
              </Books>
            </BookShelfs>
          </BtnAndShelf>
          <BtnAndShelf>
            <Btns>읽고 있는 책</Btns>
            <BookShelfs>
              <Books>
                {memos
                  ?.filter((item) => item.isReading === true && item.uid === currentUser.id)
                  .map((item) => {
                    return (
                      <>
                        <WrapingBook>
                          <ButtonWrap>
                            <DashBtn onClick={dashBoardHandler}>
                              {item.inOnDashboard ? (
                                <FaFire style={{ color: 'red' }} />
                              ) : (
                                <FaFire style={{ color: 'black' }} />
                              )}
                            </DashBtn>
                          </ButtonWrap>

                          <ReadingBook key={item.uid} src={item.cover} onClick={() => moveDetailPage(item.id)} />
                        </WrapingBook>
                      </>
                    );
                  })}
              </Books>
            </BookShelfs>
          </BtnAndShelf>
          <BtnAndShelf>
            <Btns>다 읽은 책</Btns>
            <BookShelfs>
              <Books>
                {memos
                  ?.filter((item) => item.isDone === true && item.uid === currentUser.id)
                  .map((item) => {
                    return (
                      <>
                        <WrapingBook>
                          <ButtonWrap>
                            <DashBtn>✅</DashBtn>
                          </ButtonWrap>
                          <FinishedBook key={item.uid} src={item.cover} onClick={() => moveDetailPage(item.id)} />
                        </WrapingBook>
                      </>
                    );
                  })}
              </Books>
            </BookShelfs>
          </BtnAndShelf>
        </WrapBookShelf>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const BtnAndShelf = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const Btns = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 800;
`;

const WrapingBook = styled.div`
  border: 0px;
  background-color: transparent;
  display: flex;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const DashBtn = styled.button`
  display: flex;
  border: 0px;
  background-color: transparent;
  cursor: pointer;
`;

const WrapBookShelf = styled.div`
  width: 100%;
  height: 800px;
  display: flex;
  flex-direction: column;
  margin-top: 100px;
`;

const BookMarkBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0px;
  left: 5px;
  background-color: transparent;
  cursor: pointer;
  border: 0px;
`;

const BookShelfs = styled.div`
  max-width: 1000px;
  width: 80%;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  /* z-index: -1; */
  position: relative;
  height: 0px;
  box-sizing: border-box;
  border-bottom: 16px solid #f3f3f3;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  pointer-events: all;
  margin: 100px 0px 180px 0px;

  // bookshelf front-side
  &::before {
    position: absolute;
    top: 16px;
    background: linear-gradient(90deg, #fafafa 0%, #ffffff 100%);
    height: 26px;
    width: calc(100% + 40px);
    box-shadow: 0px -1px 6px rgba(0, 0, 0, 0.05), 0px 4px 16px rgba(0, 0, 0, 0.25);
    /* z-index: 2; */
  }

  // bookshelf drop-shadow
  &::after {
    content: '';
    height: 80px;
    width: calc(100% + 40px);
    position: absolute;
    top: 42px;
    display: block;
    background: linear-gradient(180deg, #f3f3f3 0%, rgba(255, 255, 255, 0) 100%);
    clip-path: polygon(0% 0%, 100% 0%, 97% 100%, 3% 100%);
    z-index: -1;
  }
`;

const Books = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10%;
  width: 80%;
  margin: auto;
  transform: translateY(-100%);
  padding: 0 0 2px;
  position: relative;
  top: 10px;
`;

const PlaningBook = styled.img`
  width: 80px;
  height: 120px;
  position: relative;
`;

const FinishedBook = styled.img`
  width: 80px;
  height: 120px;
  position: relative;
`;

const ReadingBook = styled.img`
  width: 80px;
  height: 120px;
  position: relative;

  /* &:hover {
    &::before,
    &::after {
      transition: transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 600ms cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    &::before {
      transform: translate(0, -70px) skew(3deg, -3deg) scale(1.35);
    }

    &::after {
      transform: translate(0, -70px) skew(3deg, -3deg) scale(1.275);
    }

    &:nth-of-type(even) {
      &::before {
        transform: translate(0, -70px) skew(-3deg, 3deg) scale(1.35);
      }

      &::after {
        transform: translate(0, -70px) skew(-3deg, 3deg) scale(1.275);
      }
    }
  }

  &::before,
  &::after {
    position: absolute;
    width: 100%;
    display: block;
    content: ' ';
    transition: all 300ms ease-out;
    background: var(--bg-image) center center/cover no-repeat, #f3f3f3;
  }

  &::before {
    height: 100%;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25), inset 2px 0px 2px 1px rgba(29, 27, 27, 0.2);
  }

  &::after {
    height: 102%;
    filter: blur(10px);
    z-index: -1;
    opacity: 1;
  } */
`;

// const ReadingPlan = styled.

export default BookShelf;
