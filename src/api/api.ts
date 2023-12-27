import axios from 'axios';

const searchApi = axios.create({
  baseURL: `/ttb/api/ItemSearch`
});

const queryApi = axios.create({
  baseURL: `/ttb/api/ItemLookUp`
});

export { searchApi, queryApi };
