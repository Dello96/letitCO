import React from 'react';
import St from './style';
import { getBooks } from '../../../api/supabaseData';
import { QUERY_KEYS } from '../../../query/keys';
import { useQuery } from 'react-query';

const BookInfo = () => {
  // const queryClient = useQueryClient();
  const { isLoading, data: books } = useQuery({
    queryKey: [QUERY_KEYS.BOOKS],
    queryFn: getBooks
  });

  // const {id} = useParams()
  const book = books?.find((book) => book.id === '081877ec-4d82-4638-9748-975152cef7f2');
  // console.log(book);

  // const toggleIsReading = () => {
  //   setIsReading(!book.isLoading)
  // };

  return (
    <St.BookInfoSection>
      {isLoading ? (
        <p>데이터 오는중</p>
      ) : (
        <St.Wrapper key={book.id}>
          {/* 이미지소스 사이즈 크게 받아야함. */}
          <St.BookCover>
            <p>북마크</p>
            <img src={book.cover} alt="bookCover" />
          </St.BookCover>
          <St.TextInfo>
            <St.TextInfoHeader>
              <h1>{book.title}</h1>
              <St.IsReading>{book.isReading ? '완독' : '독서중'}</St.IsReading>
            </St.TextInfoHeader>
            <p>{book.author}</p>
            <St.PublishInfo>
              <p>{book.publisher}</p>
              <span>{book.pubDate}</span>
            </St.PublishInfo>
            <St.Description>{book.description}</St.Description>
            <p>{book.category}</p>
          </St.TextInfo>
        </St.Wrapper>
      )}
    </St.BookInfoSection>
  );
};

export default BookInfo;
