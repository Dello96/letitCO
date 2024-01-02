import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { QUERY_KEYS } from '../query/keys';
import { getItemData } from '../api/aldData';
import { useParams } from 'react-router-dom';
import { useBookQuery } from '../query/useBookQuery';
import { getCurrentUser, getUidIsbnBook } from '../api/supabaseData';
import { BsFilePlus } from 'react-icons/bs';
import { BsFileCheckFill } from 'react-icons/bs';
import { PiBookmarkSimpleFill } from 'react-icons/pi';
import { PiBookmarkSimpleLight } from 'react-icons/pi';
import Loading from '../components/Loading';

export default function BookRegister() {
  const { id } = useParams();

  // 유저정보 가져오기
  const { data: user } = useQuery([QUERY_KEYS.AUTH], getCurrentUser);

  // 해당 isbn의 book 정보 가져오기
  const { data: detailData, isLoading: BookLoading } = useQuery([QUERY_KEYS.DETAIL, id], () => getItemData(id!));

  // supabase/ uid,isbn13에 맞는 Book data 가져오기
  const newData = {
    uid: user?.id,
    isbn13: detailData?.isbn13
  };

  const { data: uidIsbn13BookData, isLoading } = useQuery([QUERY_KEYS.BOOKS, newData], () => getUidIsbnBook(newData));
  console.log('uid와 isbn13에 맞는 데이터 정보다', uidIsbn13BookData);

  // upsert Mutation
  const { upsertBookMutation } = useBookQuery();

  // 책 정보 저장, isReading값 변경
  const addBookAndIsRedingUpdateOnclickHandler = () => {
    const newBook = {
      uid: user?.id,
      cover: detailData?.cover,
      title: detailData?.title,
      author: detailData?.author,
      publisher: detailData?.publisher,
      page: detailData?.subInfo?.itemPage,
      description: detailData?.description,
      pubDate: detailData?.pubDate,
      isReading: uidIsbn13BookData?.length === 0 ? true : !uidIsbn13BookData![0].isReading,
      isMarked: uidIsbn13BookData?.length === 0 ? false : uidIsbn13BookData![0].isMarked,
      isDone: uidIsbn13BookData?.length === 0 ? false : uidIsbn13BookData![0].isDone,
      isbn13: detailData?.isbn13,
      category: detailData?.categoryName
    };
    upsertBookMutation(newBook);
  };
  //  marker 정보 저장 & 수정
  const upSertBookMarkerOnclickHandler = () => {
    const newMarkerBook = {
      uid: user?.id,
      cover: detailData?.cover,
      title: detailData?.title,
      author: detailData?.author,
      publisher: detailData?.publisher,
      page: detailData?.subInfo?.itemPage,
      description: detailData?.description,
      pubDate: detailData?.pubDate,
      isReading: uidIsbn13BookData?.length === 0 ? false : uidIsbn13BookData![0].isReading,
      isMarked: uidIsbn13BookData?.length === 0 ? true : !uidIsbn13BookData![0].isMarked,
      isDone: uidIsbn13BookData?.length === 0 ? false : uidIsbn13BookData![0].isDone,
      isbn13: detailData?.isbn13,
      category: detailData?.categoryName,
    };
    upsertBookMutation(newMarkerBook);
  };

  if (BookLoading) {
    return <Loading />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <StBody>
      {
        <StBookBox>
          <StImgBox>
            <img src={detailData?.cover} />
          </StImgBox>
          <StTextWrapper>
            <StBtnBox>
              <h1>{detailData?.title}</h1>
              {/* uidIsbn13BookData가 없다면 빈마크
         있다면 그중 isReading의 여부가 true면 채워진 마크 false라면 빈 마크  */}
              {/* 북마크 */}
              <div>
                {uidIsbn13BookData?.length === 0 ? (
                  <PiBookmarkSimpleLight size={60} onClick={upSertBookMarkerOnclickHandler} />
                ) : uidIsbn13BookData && uidIsbn13BookData[0].isMarked === true ? (
                  <PiBookmarkSimpleFill size={60} color="red" onClick={upSertBookMarkerOnclickHandler} />
                ) : (
                  <PiBookmarkSimpleLight size={60} onClick={upSertBookMarkerOnclickHandler} />
                )}
                {/* 저장 */}
                {uidIsbn13BookData?.length === 0 ? (
                  <BsFilePlus size={50} onClick={addBookAndIsRedingUpdateOnclickHandler} />
                ) : uidIsbn13BookData && uidIsbn13BookData[0].isReading ? (
                  <BsFileCheckFill size={50} onClick={addBookAndIsRedingUpdateOnclickHandler} />
                ) : (
                  <BsFilePlus size={50} onClick={addBookAndIsRedingUpdateOnclickHandler} />
                )}
              </div>
            </StBtnBox>
            <h3>{detailData?.author} </h3>
            <StPublishInpo>
              <p>{detailData?.publisher} </p>
              <span>{detailData?.pubDate}</span>
            </StPublishInpo>
            <StTextBox>
              <p>{detailData?.categoryName} </p>
              <p> 평점 {detailData?.customerReviewRank} </p>
            </StTextBox>
            <p> {detailData?.description}</p>
          </StTextWrapper>
        </StBookBox>
      }
    </StBody>
  );
}

const StBody = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StBookBox = styled.div`
  height: 500px;
  width: 1000px;

  display: flex;
  padding: 50px;
  margin-top: 50px;
  & h3 {
    font-size: 16px;
    margin-top: 10px;
    margin-bottom: 15px;
  }
`;

const StTextWrapper = styled.div`
  height: 100%;
  margin: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  & p {
    line-height: 1.5;
  }
`;

const StTextBox = styled.div`
  width: 550px;
  display: flex;
  flex-direction: column;
  & p {
    margin: 7px;
  }
`;

const StPublishInpo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  color: grey;
  & span {
    padding-left: 10px;
    margin-left: 10px;
    border-left: 1px solid grey;
  }
`;

const StBtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & h1 {
    font-size: 32px;
    font-weight: 700;
  }
`;
const StImgBox = styled.div`
  position: relative;
  width: 300px;
  height: 450px;
  box-shadow: 1px 1px 20px 5px rgba(0, 0, 0, 0.1);
  & img {
    width: 300px;
    height: 100%;
  }
`;
