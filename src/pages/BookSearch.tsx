import React, { ChangeEvent, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { QUERY_KEYS } from '../query/keys';
import { getSearchData } from '../api/aldData';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

function BookSearch() {
  const [search, setSearch] = useState('');
  const [keyword, setKeyword] = useState('');
  const navi = useNavigate();

  const { data: searchData } = useQuery([QUERY_KEYS.SEARCH, search], getSearchData);

  // 검색
  const searchOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const searchOnClickHandler = () => {
    setSearch(keyword);
    console.log(keyword);
    // navi(`/booksearch?keyword=${keyword}`)

  };

  const moveRegisterPage = (item: string) => {
    navi(`/bookregister/${item}`);
  };

  return (
    <StBody>
      <StInputWraper>
        <input value={keyword} onChange={searchOnChangeHandler} />
        <button onClick={searchOnClickHandler}>검색</button>
      </StInputWraper>
      {searchData ? (
        searchData.map((item) => {
          return (
            <StBookWraper key={item.isbn} onClick={() => moveRegisterPage(item.isbn13)}>
              <StBookBox>
                <img src={item.cover} />
                <div>
                  <h2>{item.title}</h2>
                  <div>
                    <p>작가 : {item.author}</p>
                    <p>장르 : {item.categoryName}</p>
                    <p>평점 : {item.customerReviewRank}</p>
                  </div>
                </div>
              </StBookBox>
            </StBookWraper>
          );
        })
      ) : (
        <EmptySearch>도서를 검색하세요</EmptySearch>
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
const StInputWraper = styled.div`
  margin: 20px;
  width: 600px;
  background-color: beige;
  & input {
    width: 500px;
    height: 50px;
    font-size: 18px;
  }
  & button {
    height: 50px;
    width: 50px;
    background-color: #0e411d;
    color: white;
    border-radius: 0 8px 8px 0;
    border: none;
    & :hover {
    }
  }
`;
const StBookWraper = styled.div`
  margin: 20px;
  width: 1100px;
  background-color: beige;
`;
const StBookBox = styled.div`
  display: flex;
  gap: 20px;
  margin: 20px;
  height: 150px;
  width: 800px;
  & h2 {
    font-size: 20px;
  }
  & p {
    font-size: 14px;
  }
`;
const EmptySearch = styled.h1`
  margin-top: 200px;
`;
export default BookSearch;
