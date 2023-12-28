import { useMutation } from 'react-query';
import { addMemo } from '../api/sbDetatilData';

const useMemosQuery = () => {
  const addMemoMutation = useMutation({
    mutationFn: addMemo
  });

  return { addMemoMutation };
};

export default useMemosQuery;
