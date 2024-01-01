import React, { useEffect, useState } from 'react';
import St from './style';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../query/keys';
import { getBooks, updateIsReading, updateReadPages } from '../../../api/supabaseData';
import { useParams } from 'react-router-dom';

const BookInfo = () => {
  const queryClient = useQueryClient();
  const { isLoading, data: books } = useQuery({
    queryKey: [QUERY_KEYS.BOOKS],
    queryFn: getBooks
  });
  const { id } = useParams();
  const book = books?.find((book) => book.id === id);


  const [pageSubmitMode, setPageSubmitMode] = useState(false);
  const [page, setPage] = useState<number>(book?.readUpto);

  const { mutate: updateReadPagesMutate } = useMutation(updateReadPages);
  const { mutate: updateIsreadingMutate } = useMutation(updateIsReading);

  const onChangePage = (e: React.ChangeEvent<HTMLInputElement>) => setPage(parseInt(e.target.value));
  const togglePageInput = () => setPageSubmitMode(!pageSubmitMode);

  const updatePageButton = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const previousPage = page;
    updateReadPagesMutate(
      { id, page },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([QUERY_KEYS.BOOKS]);
        },
        onError: () => {
          setPage(previousPage);
        }
      }
    );
    setPageSubmitMode(false);
  };
  const changeIsReading = () => {
    const isCompleted = book?.readUpto === book?.page;
    const isReadingStatus = !!isCompleted;
    const id: string = book?.id // id가 언디파인드..
      updateIsreadingMutate({id, isReadingStatus}, {
        onSuccess: () => {
          queryClient.invalidateQueries([QUERY_KEYS.BOOKS]);
        }
      });
    
  };

  useEffect(() => {
    changeIsReading();  
    console.log('isReading 상태 ==>', book?.isReading, '/  읽은 페이지수 ==>', book?.readUpto);
  }, [book]);

  return (
    <St.BookInfoSection>
      {isLoading ? (
        <p>데이터 오는중</p>
      ) : (
        <St.Wrapper key={book?.id}>
          <St.BookCover>
            <p>북마크</p>
            <img src={book?.cover} alt="bookCover" />
          </St.BookCover>
          <St.TextInfo>
            <St.TextInfoHeader>
              <h1>{book?.title}</h1>
              <St.IsReading>{book.isReading ? '완독' : '중'}</St.IsReading>
            </St.TextInfoHeader>
            <h3>{book?.author}</h3>
            <St.PublishInfo>
              <p>{book?.publisher}</p>
              <span>{book?.pubDate}</span>
            </St.PublishInfo>
            <p className="category">{book?.category}</p>
            <St.Description>{book?.description}</St.Description>
            <St.Page>
              <St.PageSubmit onClick={togglePageInput}>{pageSubmitMode ? '취소' : '읽은 쪽수 등록'}</St.PageSubmit>
              <form onSubmit={(e) => updatePageButton(e, book.id)}>
                {pageSubmitMode ? (
                  <input defaultValue={book.readUpto} onChange={onChangePage} max={book.page} min={0} type="number" placeholder="읽은 쪽수" />
                ) : (
                  <p>{book?.readUpto}</p>
                )}
                <span>&nbsp;&nbsp;/&nbsp;&nbsp;{book?.page}p</span>
                {pageSubmitMode && <button type="submit">저장</button>}
              </form>
            </St.Page>
          </St.TextInfo>
        </St.Wrapper>
      )}
    </St.BookInfoSection>
  );
};

export default BookInfo;
