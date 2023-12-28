import axios from 'axios';
// import { searchApi } from './api';

export type Book = {
  cover: string;
  description: string;
  pubDate: string;
  title: string;
  author: string;
};

type BooksResponse = {
  item: Book[];
};

const getSearchData = async (searchQuery: string) => {
  const url = `https://river-spring-april.glitch.me/search/book`;
  // Query=[여기에 검색어 들어감]
  //axios.get 메서드는 제네릭 타입을 받음
  try {
    const resp = await axios.get<BooksResponse>(`${url}${searchQuery}`);
    const { item } = resp.data;
    console.log('알라딘 resp ==>', item);
  } catch (err) {
    console.log(err);
  }
};
const getItemData = async (ISBN13: string) => {
  const url = `https://river-spring-april.glitch.me/lookup/book`;
  try {
    //ItemId=[여기에isbn 넣어줘야함]
    const resp = await axios.get(`${url}${ISBN13}
    `);
    console.log('상세정보 ==>', resp);
  } catch (err) {
    console.log(err);
  }
};

export { getSearchData, getItemData };
