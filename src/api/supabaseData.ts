import { supabase } from '../supabaseClient';

// type Book = {
//   cover: string;
//   description: string;
//   pubDate: string;
//   title: string;
//   author: string;
// }

const getBooks = async () => {
  try {
    const { data } = await supabase.from('books').select('*');
    return data;
  } catch (err) {
    console.log(err);
  }
};

const addBook = async () => {
  // try {
  //   await supabase.from('books').insert(newBook)
  // } catch (err) {
  //   console.log(err)
  // }
};
const updateBook = async () => {};
const deleteBook = async () => {};

export { getBooks, addBook, updateBook, deleteBook };
