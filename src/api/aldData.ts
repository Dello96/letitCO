import axios from 'axios';
import { AldBook, AldDetail } from '../types/global.d';

const getSearchData = async ({ queryKey }: { queryKey: string[] }): Promise<AldBook[]> => {
  const url = `https://river-spring-april.glitch.me/search/book`;
  const resp = await axios.get(`${url}?searchQuery=${queryKey[1]}`);
  const data = resp.data;
  return data;
};

const getItemData = async (id: string): Promise<AldDetail> => {
  const url = `https://river-spring-april.glitch.me/lookup/book`;
  const resp = await axios.get(`${url}?ISBN13=${id}`);
  const data = resp.data;
  return data[0];
};

export { getSearchData, getItemData };
