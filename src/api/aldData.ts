import axios from 'axios';
import { AldBook, AldDetail } from '../types/global.d';

const getSearchData = async ({ queryKey }: { queryKey: string[] }): Promise<AldBook[]> => {
  const url = `https://river-spring-april.glitch.me/search/book`;
  // Query=[여기에 검색어 들어감]
  //axios.get 메서드는 제네릭 타입을 받음
  const resp = await axios.get(`${url}?searchQuery=${queryKey[1]}`);
  const data = resp.data;
  console.log('알라딘 resp ==>', data);
  return data;
};

const getItemData = async (id: string): Promise<AldDetail> => {
  const url = `https://river-spring-april.glitch.me/lookup/book`;
  // ItemId=[여기에isbn 넣어줘야함]
  const resp = await axios.get(`${url}?ISBN13=${id}`);
  const data = resp.data;
  console.log('상세정보 ==>', data[0]);
  return data[0];
};

export { getSearchData, getItemData };