import { QUERY_KEYS } from '../query/keys';
import { supabase } from '../supabaseClient';
import { Book } from '../types/global.d';

type MemoType = {
  content: string;
};

const getBooks = async () => {
  const { data } = await supabase.from(QUERY_KEYS.BOOKS).select('*');
  return data;
};

const addBook = async (newBook: Book) => {
  await supabase.from(QUERY_KEYS.BOOKS).insert(newBook);
};

const getMemos = async () => {
  const { data } = await supabase.from(QUERY_KEYS.MEMOS).select('*');
  return data;
};

const addMemo = async (newMemo: MemoType) => {
  await supabase.from(QUERY_KEYS.MEMOS).insert(newMemo);
};

//item 타입 수정
const updateMemo = async (modifiedMemo: string, item: Book) => {
  await supabase.from(QUERY_KEYS.MEMOS).update({ memo: modifiedMemo }).eq('id', item.id);
};

const deleteMemo = async (id: string) => {
  await supabase.from(QUERY_KEYS.MEMOS).delete().eq('id', id);
};

export { getBooks, addBook, getMemos, addMemo, updateMemo, deleteMemo };
