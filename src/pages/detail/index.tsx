import React, { useState } from 'react';
// import { useQuery } from 'react-query';
import St from './style';
import { useQuery, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../query/keys';
import { getBooks, getMemos } from '../../api/sbDetatilData';
import useMemosQuery from '../../query/useMemosQuery';

// import { useParams } from 'react-router-dom';

const Detail = () => {
  // const [isReading, setIsReading] = useState<boolean>(false);
  const [memo, setMemo] = useState('');
  const queryClient = useQueryClient();
  const { isLoading, data: books } = useQuery({
    queryKey: [QUERY_KEYS.BOOK],
    queryFn: getBooks
  });

  const { isLoading: memoIsLoading, data: memos } = useQuery({
    queryKey: [QUERY_KEYS.MEMOS],
    queryFn: getMemos
  });
  const { addMemoMutation } = useMemosQuery();
  const { mutate: addMemoMutate } = addMemoMutation;

  // const {id} = useParams()
  const book = books?.find((book) => book.id === '53efccb1-c74a-4287-838c-79872a40ce7c');
  // console.log(book);

  // const toggleIsReading = () => {
  //   setIsReading(!book.isLoading)
  // };

  const handleMemoOnChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => setMemo(e.target.value);
  const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const newMemo = {
      content: memo,
    };
    addMemoMutate(newMemo, {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.MEMOS);
      }
    });
    //위치?
    setMemo('');
  };
  return (
    <St.Container>
      <St.BookInfoSection>
        {isLoading ? (
          <p>데이터 오는중</p>
        ) : (
          <St.Wrapper key={book?.id}>
            {/* 이미지소스 사이즈 크게 받아야함. */}
            <St.BookCover>
              <p>북마크</p>
              <img src={book?.cover} alt="bookCover" />
            </St.BookCover>
            <St.TextInfo>
              <St.TextInfoHeader>
                <h1>{book?.title}</h1>
                <St.IsReading>{book.isReading ? '완독' : '독서중'}</St.IsReading>
              </St.TextInfoHeader>
              <p>{book?.author}</p>
              <St.PublishInfo>
                <p>{book?.publisher}</p>
                <span>{book?.pubDate}</span>
              </St.PublishInfo>
              <St.Description>{book?.description}</St.Description>
              <p>카테고리 있으면 추가</p>
            </St.TextInfo>
          </St.Wrapper>
        )}
      </St.BookInfoSection>
      {/* '메모작성 아이콘' */}
      <button type="button">메모 작성</button>
      <St.AddMemoForm onSubmit={handleOnSubmit}>
        <div>
          <label htmlFor="memo" />
          <textarea
            value={memo}
            onChange={handleMemoOnChange}
            id="memo"
            placeholder="내용을 입력해주세요."
            maxLength={3000}
          />
        </div>
        <button type="submit">등록</button>
      </St.AddMemoForm>

      <ul>
        {memoIsLoading ? (
          <h1>메모 가져오는중</h1>
        ) : (
          memos?.map((memo) => {
            return (
              <St.Memo key={memo.id}>
                <p>{memo.createdAt}</p>
                <div>
                  <button type="button">수정</button>
                  <button type="button">삭제</button>
                </div>
                <p>{memo.content}</p>
              </St.Memo>
            );
          })
        )}
      </ul>
    </St.Container>
  );
};

export default Detail;
