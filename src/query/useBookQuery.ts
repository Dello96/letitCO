import { useMutation } from 'react-query';
import { addBook } from '../api/sbDetatilData';

export const useAddBookMutation = () => useMutation(addBook);
