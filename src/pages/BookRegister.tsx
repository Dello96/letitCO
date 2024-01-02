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
// import Loading from '../components/Loading';

export default function BookRegister() {
  const { id } = useParams();

  // 유저정보 가져오기
  const { data: user } = useQuery([QUERY_KEYS.AUTH], getCurrentUser);

  // 해당 isbn의 book 정보 가져오기
  const { data: detailData } = useQuery([QUERY_KEYS.DETAIL, id], () => getItemData(id!));

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
      isbn13: detailData?.isbn13
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
      isbn13: detailData?.isbn13
    };
    upsertBookMutation(newMarkerBook);
  };

  if (isLoading) {
    return <h1>로딩중..</h1>;
  }

  return (
    <StBody>
      {detailData && (
        <StBookBox>
          <StImgBox>
            <img src={detailData.cover} />
          </StImgBox>
          <StTextWrapper>
            <StBtnBox>
              {/* uidIsbn13BookData가 없다면 빈마크
         있다면 그중 isReading의 여부가 true면 채워진 마크 false라면 빈 마크  */}
              {/* 북마크 */}
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
            </StBtnBox>
            <StTextBox>
              <h2>책 제목:{detailData.title}</h2>
              <br />
              <p>작가: {detailData.author} </p>
              <p>출판사: {detailData.publisher} </p>
              <p>페이지 수: {detailData.subInfo?.itemPage} </p>
              <p>카테고리: {detailData.categoryName} </p>
              <p>평점: {detailData.customerReviewRank} </p>
              <p>내용: {detailData.description}</p>
            </StTextBox>
          </StTextWrapper>
        </StBookBox>
      )}
    </StBody>
  );
}

const StBody = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StBookBox = styled.div`
  height: 600px;
  width: 60%;
  background-color: azure;
  display: flex;
  margin: 50px;
  padding: 50px;
`;

const StTextBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const StTextWrapper = styled.div`
  height: 100%;
  margin: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #55a5eb;
`;

const StBtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  & BsFilePlus {
    margin-top: 10px;
  }
`;
const StImgBox = styled.div`
  margin-top: 30px;
`;
