import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { QUERY_KEYS } from '../query/keys';
import { getSearchData } from '../api/aldData';

function BookSearch() {
  const [search, setSearch] = useState('');
  const { data } = useQuery([QUERY_KEYS.SEARCH, 'search'], getSearchData);

  console.log(data);

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
      <div></div>
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

export default BookSearch;
