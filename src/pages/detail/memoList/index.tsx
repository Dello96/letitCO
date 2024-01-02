import React, { useEffect, useState } from 'react';
import St from './style';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../query/keys';
import { getMemos } from '../../../api/supabaseData';
import useMemosQuery from '../../../query/useMemosQuery';
import { getFormattedDate } from '../../../util/date';
import { Memo } from '../../../types/global.d';

const MemoList = ({ currentUserId }: { currentUserId: string }) => {
  const queryClient = useQueryClient();
  const { id: paramId } = useParams();

  const [editingText, setEditingText] = useState('');
  const [editableMemos, setEditableMemos] = useState<Memo[]>([]);

  // 메모목록 가져오기
  const { isLoading: memoIsLoading, data: memos } = useQuery({
    queryKey: [QUERY_KEYS.MEMOS],
    queryFn: getMemos
  });
  const filteredMemos = memos?.filter((memo) => memo.uid === currentUserId && paramId === memo.bookId);

  useEffect(() => {
    if (!filteredMemos) {
      return;
    } else {
      setEditableMemos(filteredMemos);
    }

  }, []);

  const { deleteMemoMutation } = useMemosQuery();
  // const { mutate: updateMemoMutate } = updateMemoMutation;
  const { mutate: deleteMemoMutate } = deleteMemoMutation;

  // const completeUpdateMemo = (id: string) => {
  //   updateMemoMutate(id);
  // };


  //수정내용 onChange
  const onEditingText: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => setEditingText(e.target.value)

  // 메모 삭제
  const deleteMemo = (id: string) => {
    deleteMemoMutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.MEMOS);
      }
    });
  };

  // 수정버튼 
  const openEditField = (id: string) => {
    const updatedMemos = editableMemos.map((memo) => {
      if (memo.id === id) {
        return { ...memo, isEditing: true };
      }
      return memo;
    });
    setEditableMemos(updatedMemos);
  };

  // 취소버튼 
  const onEditCancel = (id: string) => {
    const updatedMemos = editableMemos.map((memo) => {
      if (memo.id === id) {
        return { ...memo, isEditing: false };
      }
      return memo;
    });
    setEditableMemos(updatedMemos);
  };

  //완료버튼
  const onEditDone = (id:string) => {
    console.log(id)
  };

  return (
    <section>
      <ul>
        {memoIsLoading ? (
          <St.PlaceHolder>메모 가져오는중</St.PlaceHolder>
        ) : (
          editableMemos?.map((memo) => {
            return (
              <St.Memo key={memo.id}>
                <p>{getFormattedDate(memo.createdAt!)}</p>
                {memo.isEditing ? (
                  <>
                    <St.TextArea value={editingText} onChange={onEditingText} autoFocus/>
                    <St.Buttons>
                      <button onClick={() => onEditCancel(memo.id)} type="button">
                        취소
                      </button>
                      <button onClick={() => onEditDone(memo.id)} type="button">
                        완료
                      </button>
                    </St.Buttons>
                  </>
                ) : (
                  <>
                    <St.Content>{memo.content}</St.Content>
                    <button onClick={() => openEditField(memo.id!)} type="button">
                      수정
                    </button>
                    <button onClick={() => deleteMemo(memo.id!)} type="button">
                      삭제
                    </button>
                  </>
                )}
              </St.Memo>
            );
          })
        )}
      </ul>
    </section>
  );
};

export default MemoList;
