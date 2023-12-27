import React, { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';

export default function BookRegister() {
  const [search, setSearch] = useState<string>('');

  const searchOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const searchOnSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <StBody>
      <form onSubmit={searchOnSubmitHandler}>
        <input value={search} onChange={searchOnChangeHandler} />
        <button>검색</button>
      </form>
      <div>
        <img />
        <h1>도서 정보</h1>
        <h3>책 제목</h3>
        <h3>작가</h3>
        <h3>출판사</h3>
        <h3>페이지 수</h3>
        <h3>카테고리</h3>
      </div>
      <div>
        <button>북마크</button>
        <button>+버튼 </button>
      </div>
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
