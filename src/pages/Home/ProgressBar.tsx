import React, { useState, ChangeEvent } from 'react';
// import { useQuery, useQueryClient } from 'react-query';
// import { QUERY_KEYS } from '../../query/keys';
// import { getBooks } from '../../api/supabaseData';
// import { useParams } from 'react-router-dom';
// import { Book } from '../../types/global.d';

function ProgressBar() {
  //   const queryClient = useQueryClient();
  //   const { isLoading, data: books } = useQuery({
  //     queryKey: [QUERY_KEYS.BOOKS],
  //     queryFn: getBooks
  //   });
  //   const { id } = useParams();
  //   const book: Book = books?.find((book) => book.id === id);

  //   console.log('dd', QUERY_KEYS.BOOKS);
  //   console.log('isLoading', isLoading);

  //   const [page, setPage] = useState<number>(book?.readUpto ?? 0);

  //   updateReadPagesMutate(
  //     { id, page },
  //     {
  //       onSuccess: () => {
  //         queryClient.invalidateQueries([QUERY_KEYS.BOOKS]);
  //       },
  //       onError: () => {
  //         setPage(previousPage);
  //       }
  //     }
  //   );

  const [inputValue, setInputValue] = useState<number>(0);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    setInputValue(newValue);
  };

  const calculatePercentage = () => {
    const clampedValue = Math.min(100, Math.max(0, inputValue));
    return clampedValue;
  };

  return (
    <div>
      <h2>프로그래스 바</h2>
      <label>
        값 입력:
        <input type="text" value={inputValue} onChange={handleInputChange} min="0" max="100" />
      </label>
      <div style={{ marginTop: '10px' }}>
        <div
          style={{
            width: `${calculatePercentage()}%`,
            height: '20px',
            backgroundColor: 'lightblue',
            border: '1px solid blue',
            borderRadius: '4px',
            transition: 'width 0.3s ease'
          }}
        />
      </div>
      <div style={{ marginTop: '10px' }}>{`${calculatePercentage()}% 완료`}</div>
    </div>
  );
}

export default ProgressBar;
