import { useMutation } from 'react-query';
import { addMemo, deleteMemo } from '../api/supabaseData';


const useMemosQuery = () => {

  const addMemoMutation = useMutation(addMemo);
  // const updateMemoMutation = useMutation(updateMemo);
  const deleteMemoMutation = useMutation(deleteMemo);

  // const updateMemoMutation = useMutation(
  //   ({ id, updatedMemo }: { id: string; updatedMemo: Memo }) => updateMemo({id, updatedMemo})
  // );

  return { addMemoMutation, deleteMemoMutation };
};

export default useMemosQuery;
