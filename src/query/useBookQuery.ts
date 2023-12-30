import { useMutation } from 'react-query';
import { addBook } from '../api/supabaseData';


export const useAddBookMutation = () => useMutation(addBook);
