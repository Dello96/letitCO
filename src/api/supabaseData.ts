import { QUERY_KEYS } from '../query/keys';
import { supabase } from '../supabaseClient';

type BookType = {
  id: string;
  uid: string;
  title: string;
  author: string;
  page: number;
  cover: string;
  description: string;
  pubDate: string;
  publisher: string;
  isReading: boolean;
  isMarked: boolean;
  isbn13: string;
  createdAt: string;
};

type MemoType = {
    content: string;
    id?: string;
}

type NewMemoType = {
    id: string;
    memo: string;
}
//등록한 책 목록 가져오기
const getBooks = async () => {
    const { data } = await supabase.from(QUERY_KEYS.BOOKS).select();
    return data;
};

//책등록
const addBook = async (newBook: BookType) => {
    await supabase.from(QUERY_KEYS.MEMOS).insert(newBook);
};

//등록된 메모목록 가져오기
const getMemos = async () => {
    const { data } = await supabase.from(QUERY_KEYS.MEMOS).select();
    return data;
};

// 새 메모 추가
const addMemo = async (newMemo: MemoType) => {
    await supabase.from(QUERY_KEYS.MEMOS).insert(newMemo);
};

//item 타입 수정
const updateMemo = async (id: NewMemoType, updatedMemo: NewMemoType) => {
    await supabase.from(QUERY_KEYS.MEMOS).update({ content: updatedMemo }).eq('id', id);
};

//메모 삭제
const deleteMemo = async (id: string) => {
    await supabase.from(QUERY_KEYS.MEMOS).delete().eq('id', id);
};

export { getBooks, addBook, getMemos, addMemo, updateMemo, deleteMemo };
