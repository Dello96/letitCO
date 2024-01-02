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

// uid,isbn기준 Book 데이터 가져오기
const getUidIsbnBook = async (bookData: Book) => {
  const { data } = await supabase
    .from(QUERY_KEYS.BOOKS)
    .select('*')
    .eq('isbn13', bookData.isbn13)
    .eq('uid', bookData.uid);
  return data;
};

// 책 등록 & 업데이트
const upsertBook = async (newBook: Book) => {
  const { data, error } = await supabase
    .from(QUERY_KEYS.BOOKS)
    .upsert(
      {
        uid: newBook.uid,
        cover: newBook.cover,
        title: newBook.title,
        author: newBook.author,
        publisher: newBook.publisher,
        page: newBook.page,
        description: newBook.description,
        pubDate: newBook.pubDate,
        isReading: newBook.isReading,
        isMarked: newBook.isMarked,
        isbn13: newBook.isbn13
      },
      { onConflict: 'uid,isbn13' }
    )
    .select();
  console.log('data', data);
  console.log('error', error);
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

//메모 수정
const updateMemo = async ({ id, editingText }: Memo) => {
  await supabase.from(QUERY_KEYS.MEMOS).update({ content: editingText, isEditing: false }).eq('id', id);
};

//메모 삭제
const deleteMemo = async (id: string) => {
  await supabase.from(QUERY_KEYS.MEMOS).delete().eq('id', id);
};

//읽은 페이지 업데이트
const updateReadPages = async ({ id, page }: { id: string; page: number }) => {
  await supabase.from(QUERY_KEYS.BOOKS).update({ readUpto: page }).eq('id', id);
};

//독서 상태 업데이트
const updateIsReading = async ({ id, isReadingStatus }: { id: string; isReadingStatus: boolean }) => {
  if (!id) {
    // id 값이 없으면 오류 처리
    console.error('ID is undefined!');
    return;
  }
  await supabase.from(QUERY_KEYS.BOOKS).update({ isReading: isReadingStatus }).eq('id', id);
};

export {
  getCurrentUser,
  getBooks,
  addBook,
  getMemos,
  addMemo,
  updateMemo,
  deleteMemo,
  updateReadPages,
  updateIsReading,
  getUidIsbnBook,
  upsertBook
};
