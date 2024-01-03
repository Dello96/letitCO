import { useMutation } from 'react-query';
import { addMemo, deleteMemo, updateMemo } from '../api/supabaseData';


const useMemosQuery = () => {

  const addMemoMutation = useMutation(addMemo);
  const updateMemoMutation = useMutation(updateMemo);
  const deleteMemoMutation = useMutation(deleteMemo);

  return { addMemoMutation, deleteMemoMutation, updateMemoMutation };
};

export default useMemosQuery;
