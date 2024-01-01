import { QUERY_KEYS } from '../query/keys';
import { supabase } from '../supabaseClient';
import { Book, Memo } from '../types/global.d';

type NewMemo = Omit<Memo, 'id' | 'createdAt' | 'editingText'>;

//현재 로그인된 유저 정보
const getCurrentUser = async () => {
  const {
    data: { user }
  } = await supabase.auth.getUser();
  // console.log('현재 세션에 로그인된 유저', user!.id);
  // console.log("user ==>", user)
  return user;
};

//등록한 책 목록 가져오기
const getBooks = async () => {
  const { data } = await supabase.from(QUERY_KEYS.BOOKS).select();
  return data;
};

//책등록
const addBook = async (newBook: Book) => {
  await supabase.from(QUERY_KEYS.BOOKS).insert(newBook);
};

//등록된 메모목록 가져오기
const getMemos = async () => {
  const { data } = await supabase.from(QUERY_KEYS.MEMOS).select();
  return data;
};

// 새 메모 추가
const addMemo = async (newMemo: NewMemo) => {
  await supabase.from(QUERY_KEYS.MEMOS).insert(newMemo);
};

//item 타입 수정
const updateMemo = async ({ id, editingText }: Memo) => {
  await supabase.from(QUERY_KEYS.MEMOS).update({ content: editingText, isEditing: false }).eq('id', id);
};

//메모 삭제
const deleteMemo = async (id: string) => {
  await supabase.from(QUERY_KEYS.MEMOS).delete().eq('id', id);
};

const updateReadPages = async ({ id, page }: { id: string; page: number }) => {
  await supabase.from(QUERY_KEYS.BOOKS).update({ readUpto: page }).eq('id', id);
};

export { getCurrentUser, getBooks, addBook, getMemos, addMemo, updateMemo, deleteMemo, updateReadPages };
