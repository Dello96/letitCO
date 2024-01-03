import React, { useState } from 'react';
import St from './style';
import { QUERY_KEYS } from '../../../query/keys';
import { useQueryClient } from 'react-query';
import useMemosQuery from '../../../query/useMemosQuery';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const NewMemo = () => {
  const queryClient = useQueryClient();
  const { id: paramId } = useParams();

  const [memo, setMemo] = useState('');
  const [isWritingMemo, setIsWritingMemo] = useState(false);
  
  const currentUser = useSelector((state: RootState) => state.user) as { id: string };

  const { addMemoMutation } = useMemosQuery();
  const { mutate: addMemoMutate } = addMemoMutation;

  const toggleAddMemoForm = () => setIsWritingMemo(!isWritingMemo);
  const handleMemoOnChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => setMemo(e.target.value);
  const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const newMemo = {
      bookId: paramId!,
      content: memo,
      uid: currentUser.id,
      isEditing: false,
      timeStamp: Date.now()
    };    
    addMemoMutate(newMemo, {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.MEMOS);
      }
    });
    setMemo('');
    setIsWritingMemo(false);
  };

  return (
    <St.Container>
      <St.AddMemoToggleBtn type="button" onClick={toggleAddMemoForm}>
        {isWritingMemo ? '닫기' : '메모 작성'}
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
    </St.Container>
  );
};

export default NewMemo;
