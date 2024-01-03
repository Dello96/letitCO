import { useMutation, useQueryClient } from 'react-query';
import { addBook, upsertBook } from '../api/supabaseData';
import { QUERY_KEYS } from './keys';

export const useBookQuery = () => {
  const queryClient = useQueryClient();
  const { mutate: addBookMutation } = useMutation(addBook);

  const { mutate: upsertBookMutation } = useMutation(upsertBook, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.BOOKS);
    }
  });

  return { addBookMutation, upsertBookMutation };
};
