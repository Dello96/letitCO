import React, { useState } from 'react';
import St from './style';

import { QUERY_KEYS } from '../../../query/keys';
import { getMemos } from '../../../api/supabaseData';
import { useQuery, useQueryClient } from 'react-query';
import useMemosQuery from '../../../query/useMemosQuery';
import { getFormattedDate } from '../../../util/date';

const MemoSection = () => {
  const queryClient = useQueryClient();

  const [memo, setMemo] = useState('');
  // const [isReading, setIsReading] = useState<boolean>(false);

  // const [editedMemo, setEditedMemo] = useState('');
  const [isWritingMemo, setIsWritingMemo] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { isLoading: memoIsLoading, data: memos } = useQuery({
    queryKey: [QUERY_KEYS.MEMOS],
    queryFn: getMemos
  });
  
  //로그인 기능 완성 후 사용
  // const memos = data?.filter(d => data.uid === currentUer && 파람아이디 === data.id)

  const { addMemoMutation, deleteMemoMutation } = useMemosQuery();
  const { mutate: addMemoMutate } = addMemoMutation;
  // const { mutate: updateMemoMutate } = updateMemoMutation;
  const { mutate: deleteMemoMutate } = deleteMemoMutation;

  const toggleAddMemoForm = () => setIsWritingMemo(!isWritingMemo);
  const handleMemoOnChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => setMemo(e.target.value);
  const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const newMemo = { content: memo };
    addMemoMutate(newMemo, {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.MEMOS);
      }
    });
    //위치?
    setMemo('');
  };

  // const completeUpdateMemo = (id: string) => {
  //   updateMemoMutate(id);
  // };

  const deleteMemo = (id: string) => {
    deleteMemoMutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.MEMOS);
      }
    });
  };

  const openEditField = () => setIsEditing(true);
  const onEditCancel = () => {
    setIsEditing(false);
  };
  const onEditDone = () => {
    setIsEditing(false);
  };

  return (
    <St.Container>
      {/* '메모작성 아이콘' */}
      <St.AddMemoToggleBtn type="button" onClick={toggleAddMemoForm}>
        메모 작성
      </St.AddMemoToggleBtn>
      {isWritingMemo ? (
        <St.AddMemoForm onSubmit={handleOnSubmit}>
          <div>
            <label htmlFor="memo" />
            <textarea
              value={memo}
              onChange={handleMemoOnChange}
              id="memo"
              placeholder="내용을 입력해주세요."
              maxLength={3000}
            />
          </div>
          <button type="submit">등록</button>
        </St.AddMemoForm>
      ) : null}

      <ul>
        {memoIsLoading ? (
          <h1>메모 가져오는중</h1>
        ) : (
          memos?.map((memo) => {
            return (
              <St.Memo key={memo.id}>
                <p>{getFormattedDate(memo.createdAt)}</p>
                <St.Content>{memo.content}</St.Content>

                {isEditing ? (
                  <>
                    <St.TextArea />
                    <St.Buttons>
                      <button onClick={onEditCancel} type="button">
                        취소
                      </button>
                      <button onClick={onEditDone} type="button">
                        완료
                      </button>
                    </St.Buttons>
                  </>
                ) : (
                  <>
                    <button onClick={openEditField} type="button">
                      수정
                    </button>
                    <button onClick={() => deleteMemo(memo.id)} type="button">
                      삭제
                    </button>
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

export default MemoSection;
