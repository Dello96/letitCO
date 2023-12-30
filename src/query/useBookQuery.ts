import { useMutation } from 'react-query';
import { addBook, upsertBook } from '../api/supabaseData';

export const useBookQuery = () => {
  const { mutate: addBookMutation } = useMutation(addBook);

  const { mutate: upsertBookMutation } = useMutation(upsertBook, {
    onMutate: async (pram) => {
      console.log(pram);
    }
  });

  return { addBookMutation, upsertBookMutation };
};
