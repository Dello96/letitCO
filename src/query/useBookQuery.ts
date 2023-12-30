import { useMutation } from 'react-query';
import { addBook, upsertBook } from '../api/supabaseData';

export const useAddBookMutation = () => useMutation(addBook);
export const useUpsertBookMutation = () => useMutation(upsertBook);
