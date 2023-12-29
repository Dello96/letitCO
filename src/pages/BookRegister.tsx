import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { QUERY_KEYS } from '../query/keys';
import { getItemData } from '../api/aldData';
import { useNavigate, useParams } from 'react-router-dom';
import { useAddBookMutation } from '../query/useBookQuery';
import { getBooks } from '../api/sbDetatilData';

export default function BookRegister() {
  const [search, setSearch] = useState<string>('');
  // const [isMarker, serIsMarker] = useState<boolean>();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryclient = useQueryClient();
  // 해당 isbn의 book 정보 가져오기
  const { data: detailData } = useQuery([QUERY_KEYS.DETAIL, id], () => getItemData(id!));
  const { data: superBookData } = useQuery(QUERY_KEYS.BOOKS, getBooks);
  const filterData = superBookData?.find((book) => book.isbn13 === id);
  console.log(filterData);
  const { mutate: addMutate } = useAddBookMutation();
  // 검색창

  const searchOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const searchOnSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const addBookOnclickHandler = () => {
    const newBook = {
      cover: detailData?.cover,
      title: detailData?.title,
      author: detailData?.author,
      publisher: detailData?.publisher,
      page: detailData?.subInfo?.itemPage,
      description: detailData?.description,
      pubDate: detailData?.pubDate,
      isReading: true,
      isMarked: false,
      isbn13: detailData?.isbn13
    };

    addMutate(newBook, {
      onSuccess: () => {
        alert('저장되었습니다.');
        navigate(`/detail/${detailData?.isbn13}`);
        queryclient.invalidateQueries(QUERY_KEYS.BOOKS);
      }
    });
    // detail페이지로 이동 필요.
  };

  return (
    <StBody>
      <form onSubmit={searchOnSubmitHandler}>
        <input value={search} onChange={searchOnChangeHandler} />
        <button>검색</button>
      </form>
      {detailData && (
        <StBookBox>
          <StImgBox>
            <img src={detailData.cover} />
          </StImgBox>
          <StTextWrapper>
            <StBtnBox>
              <button>북마크</button>
              <button onClick={addBookOnclickHandler}>+버튼 </button>
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
`;
const StImgBox = styled.div`
  margin-top: 30px;
`;
