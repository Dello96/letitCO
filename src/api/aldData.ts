import axios from 'axios';
// import { searchApi } from './api';

type Book = {
  cover: string;
  description: string;
  pubDate: string;
  title: string;
  author: string;
}

type BooksResponse = {
  item: Book[];
};


const getSearchData = async () => {
  const url = `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=`;
  try {
    // Query=[여기에 검색어 들어감]
    //axios.get 메서드는 제네릭 타입을 받음
    const resp = await axios.get<BooksResponse>(
      `${url}${process.env.REACT_APP_ALD_API_KEY}&Query=어린왕자&QueryType=Keyword&&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101`
    );
    const { item } = resp.data
    console.log('알라딘 resp ==>', item);
  } catch (err) {
    console.log(err);
  }
};
const getItemData = async () => {
  const url = `https://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=`;
  try {
    //ItemId=[여기에isbn 넣어줘야함]
    const resp = await axios.get(`${url}${process.env.REACT_APP_ALD_API_KEY}&itemIdType=ISBN&ItemId=K962936839&output=js&Version=20131101&OptResult=ebookList,usedList,reviewList
    `);
    console.log('상세정보 ==>', resp)
  } catch (err) {
    console.log(err);
  }
};

export { getSearchData, getItemData };
