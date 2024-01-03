import React, { useEffect, useState } from 'react';
import St from './style';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../query/keys';
import { getMemos } from '../../../api/supabaseData';
import useMemosQuery from '../../../query/useMemosQuery';
import { getFormattedDate } from '../../../util/date';
import { Memo } from '../../../types/global.d';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const MemoList = () => {
  const currentUser = useSelector((state: RootState) => state.user);
  const queryClient = useQueryClient();
  const { id: paramId } = useParams();

  const [editingText, setEditingText] = useState<string>('');
  const [editableMemos, setEditableMemos] = useState<Memo[]>([]);

  // 메모목록 가져오기
  const { isLoading: memoIsLoading, data: memos } = useQuery({
    queryKey: [QUERY_KEYS.MEMOS],
    queryFn: getMemos
  });
  const filteredMemos = memos
    ?.filter((memo) => memo.uid === currentUser.id && paramId === memo.bookId)
    .sort((a, b) => b.timeStamp - a.timeStamp);

  useEffect(() => {
    if (!filteredMemos) {
      return;
    } else {
      setEditableMemos(filteredMemos);
    }
  }, [memos]);

  const { deleteMemoMutation, updateMemoMutation } = useMemosQuery();
  const { mutate: updateMemoMutate } = updateMemoMutation;
  const { mutate: deleteMemoMutate } = deleteMemoMutation;

  //수정내용 onChange
  const onEditingText: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => setEditingText(e.target.value);

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
  const onEditDone = (id: string) => {
    const previousMemos = [...editableMemos];
    const updatedMemos = editableMemos.map((memo) => {
      if (memo.id === id) {
        return { ...memo, content: editingText, isEditing: false };
      }
      return memo;
    });

    setEditableMemos(updatedMemos);
    updateMemoMutate(
      { id, editingText },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([QUERY_KEYS.MEMOS]);
        },
        onError: () => {
          setEditableMemos(previousMemos);
        }
      }
    );
    updateMemoMutate({ id, editingText });
    console.log('updateMemo로 보낼 놈 ==> id:', id, '클릭된 메모 정보', editingText);
  };

  return (
    <St.Container>
      <ul>
        {memoIsLoading ? (
          <></>
        ) : (
          editableMemos?.map((memo) => {
            return (
              <St.Memo key={memo.id}>
                <p>{getFormattedDate(memo.timeStamp!)}</p>
                {memo.isEditing ? (
                  <>
                    <St.TextArea defaultValue={memo.content} onChange={onEditingText} autoFocus />
                    <St.Buttons>
                      <p className="leftBtn" onClick={() => onEditCancel(memo.id!)}>
                        취소
                      </p>
                      <p onClick={() => onEditDone(memo.id!)}>완료</p>
                    </St.Buttons>
                  </>
                ) : (
                  <>
                    <St.Content>{memo.content}</St.Content>
                    <St.Buttons>
                      <p className="leftBtn" onClick={() => openEditField(memo.id!)}>
                        수정
                      </p>
                      <p onClick={() => deleteMemo(memo.id!)}>삭제</p>
                    </St.Buttons>
                  </>
                )}
              </St.Memo>
            );
          })
        )}
      </ul>
    </St.Container>
  );
};

export default MemoList;
