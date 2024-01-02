import React, { useEffect, useState } from 'react';
import St from './style';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../query/keys';
import { getBooks, updateIsReading, updateReadPages, updateReadingPeriod } from '../../../api/supabaseData';
import { useNavigate, useParams } from 'react-router-dom';
import { Book } from '../../../types/global.d';

const BookInfo = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  const { isLoading, data: books } = useQuery({
    queryKey: [QUERY_KEYS.BOOKS],
    queryFn: getBooks
  });
  const { id } = useParams();

  useEffect(() => {
    if (!isLoading && books) {
      const bookExists = books.some((book) => book?.id === id);
      console.log('있는 책인가요?', bookExists)
      if (!bookExists) {
        navigate('/booksearch');
      }
    }
  }, [id, books, isLoading, navigate]);
  
  const book: Book = books?.find((book) => book.id === id);

  const [pageSubmitMode, setPageSubmitMode] = useState(false);
  const [page, setPage] = useState<number>(book?.readUpto ?? 0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const onChangeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value);
  const onChangeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value);

  const { mutate: updateReadPagesMutate } = useMutation(updateReadPages);
  const { mutate: updateIsreadingMutate } = useMutation(updateIsReading);
  const { mutate: readingPeriodMutate } = useMutation(updateReadingPeriod);

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
    const isReadingStatus = !isCompleted;
    const id = book?.id;
    if (!id) {
      console.error('책 ID가 없습니다');
      return;
    }
    updateIsreadingMutate(
      { id, isReadingStatus, isDone: isCompleted },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([QUERY_KEYS.BOOKS]);
        }
      }
    );
  };

  const onSubmitDate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = book?.id;
    if (!id) {
      console.error('책 ID가 없습니다');
      return;
    }

    readingPeriodMutate(
      { id, startDate, endDate },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([QUERY_KEYS.BOOKS]);
        },
        onError: (error) => {
          console.error('업데이트 중 오류 발생:', error);
        }
      }
    );
  };

  useEffect(() => {
    // changeIsReading();
    // console.log('isReading 상태 ==>', book?.isReading, '/  읽은 페이지수 ==>', book?.readUpto);
  }, [book]);

  return (
    <St.BookInfoSection>
      {isLoading ? (
        <p>데이터 오는중</p>
      ) : (
        <St.Wrapper key={book?.id}>
          <St.BookCover>
            <img src={book?.cover} alt="bookCover" />
          </St.BookCover>

          <St.TextInfo>
            <St.TextInfoHeader>
              <h1>{book?.title}</h1>
              <St.IsReading $isReading={book?.isReading ?? false}>{book?.isReading ? '읽는중' : '완독'}</St.IsReading>
            </St.TextInfoHeader>
            <h3>{book?.author}</h3>
            <St.PublishInfo>
              <p>{book?.publisher}</p>
              <span>{book?.pubDate}</span>
            </St.PublishInfo>
            <p className="category">{book?.category}</p>
            <St.Description>{book?.description}</St.Description>
            <St.UserReadingInfo>
              <St.Page>
                <form onSubmit={(e) => updatePageButton(e, book.id!)}>
                  {pageSubmitMode ? (
                    <input
                      defaultValue={book.readUpto}
                      onChange={onChangePage}
                      max={book.page}
                      min={0}
                      type="number"
                      placeholder="0"
                    />
                  ) : (
                    <St.PageNumber>{book?.readUpto}p</St.PageNumber>
                  )}
                  <p>&nbsp;&nbsp;/&nbsp;&nbsp;{book?.page}p</p>
                  <St.PageSubmit onClick={togglePageInput}>{pageSubmitMode ? '취소' : '변경'}</St.PageSubmit>
                  {pageSubmitMode && <button type="submit">저장</button>}
                </form>
              </St.Page>
              <St.Timeline>
                <St.StartAdnEnd onSubmit={onSubmitDate}>
                  <p>시작일</p>
                  <input
                    defaultValue={book?.startDate}
                    onChange={(e) => {
                      onChangeStartDate(e);
                    }}
                    type="date"
                  />
                  <p>종료일</p>
                  <input
                    defaultValue={book?.endDate}
                    onChange={(e) => {
                      onChangeEndDate(e);
                    }}
                    type="date"
                  />
                  <button type="submit">저장</button>
                </St.StartAdnEnd>
              </St.Timeline>
            </St.UserReadingInfo>
          </St.TextInfo>
        </St.Wrapper>
      )}
    </St.BookInfoSection>
  );
};

export default BookInfo;
