import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

function BookSearch() {
  const [search, setSearch] = useState('');

  const searchOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <StBody>
      <form>
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
