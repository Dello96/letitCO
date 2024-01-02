import React, { ChangeEvent, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { QUERY_KEYS } from '../query/keys';
import { getSearchData } from '../api/aldData';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getCurrentUser } from '../api/supabaseData';
import Loading from '../components/Loading';
// import { useDispatch } from 'react-redux';

function BookSearch() {
  // search값이 없으면 검색하지 않도록 하기
  const [param] = useSearchParams();
  const queryString = param.get('keyword');
  const [search, setSearch] = useState(queryString!);
  const [keyword, setKeyword] = useState('');
  const navi = useNavigate();
  console.log(param.get('keyword'));
  console.log('search', search);
  console.log('keyword=>', keyword);

  const { data } = useQuery([QUERY_KEYS.AUTH], getCurrentUser);
  console.log('유저정보다', data);

  // 검색한 책 목록 가져오기
  const { data: searchData, isLoading } = useQuery([QUERY_KEYS.SEARCH, search], getSearchData);

  // 검색
  const searchOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const searchOnClickHandler = () => {
    navi(`/booksearch?keyword=${keyword}`);
    setSearch(keyword!);
  };

  const moveRegisterPage = (item: string) => {
    navi(`/bookregister/${item}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <StBody>
      <StInputWraper>
        <input value={keyword} onChange={searchOnChangeHandler} />
        <button onClick={searchOnClickHandler}>검색</button>
      </StInputWraper>
      {searchData &&
        searchData.map((item) => {
          return (
            <StBookWraper key={item.isbn} onClick={() => moveRegisterPage(item.isbn13)}>
              <StBookBox>
                <img src={item.cover} />
                <div>
                  <h2>{item.title}</h2>
                  <div>
                    <p>{item.author}</p>
                    <p>
                      {item.publisher} <span>{item.pubDate}</span>
                    </p>
                    <p>{item.categoryName}</p>
                    <p>평점 : {item.customerReviewRank}</p>
                  </div>
                </div>
              </StBookBox>
            </StBookWraper>
          );
        })}
    </StBody>
  );
}
const StBody = styled.div`
  width: 1200px;
  height: 200vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StInputWraper = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;
  width: 550px;

  & input {
    width: 500px;
    height: 50px;
    font-size: 18px;
  }
  & button {
    height: 50px;
    width: 50px;
    font-weight: bold;
    background-color: #0e411d;
    color: white;
    border-radius: 0 8px 8px 0;
    border: 2px solid #0e411d;
    cursor: pointer;
    &:active {
      background-color: #87a492;
      color: white;
    }
  }
`;
const StBookWraper = styled.div`
  width: 800px;
  border-bottom: 1px solid #87a492;
  &:hover {
    cursor: pointer;
  }
`;
const StBookBox = styled.div`
  display: flex;
  gap: 20px;
  margin: 30px;
  height: 150px;
  width: 800px;
  &:hover {
    cursor: pointer;
  }

  & h2 {
    font-size: 20px;
    margin: 10px 0;
  }
  & p {
    margin-top: 10px;
    & span {
      border-left: 1px solid gray;
      padding: 3px;
    }
  }
`;
export default BookSearch;
