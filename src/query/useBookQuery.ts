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
    // onMutate: async (param) => {
    //   const data = await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.BOOKS, param.uid, param.isbn13] });

    //   const previousBook = queryClient.getQueryData([QUERY_KEYS.BOOKS, param.uid, param.isbn13]);

    //   queryClient.setQueryData([QUERY_KEYS.BOOKS, param.uid, param.isbn13], () => console.log());
    //   console.log('pram', param);
    //   console.log('data', data);
    //   console.log('previousBook', previousBook);
    //   param;
    //   return { previousBook };
    // }
    // onError:(context, param)=>{
    //   queryClient.setQueryData([QUERY_KEYS.BOOKS, param.id], context.previousBook)
    // },
    // onSettled:()=>{
    //   queryClient.invalidateQueries({queryKey:QUERY_KEYS.BOOKS})
    // }
  });

  return { addBookMutation, upsertBookMutation };
};
