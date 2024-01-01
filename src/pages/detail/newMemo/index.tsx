import React, { useEffect, useState } from 'react';
import St from './style';
import { QUERY_KEYS } from '../../../query/keys';
import { getCurrentUser } from '../../../api/supabaseData';
import { useQuery, useQueryClient } from 'react-query';
import useMemosQuery from '../../../query/useMemosQuery';
import { useParams } from 'react-router-dom';
type NewMemoProps = {
  currentUserId: string;
  setCurrentUserId: React.Dispatch<React.SetStateAction<string>>;
};

const NewMemo = ({ currentUserId, setCurrentUserId }: NewMemoProps) => {
  const queryClient = useQueryClient();
  const { id: paramId } = useParams();

  // 상태관리
  const [memo, setMemo] = useState('');
  const [isWritingMemo, setIsWritingMemo] = useState(false);

  //현재 로그인된 유저 정보 가져오기
  const { data: userData } = useQuery({
    queryKey: [QUERY_KEYS.AUTH],
    queryFn: getCurrentUser
  });

  useEffect(() => {
    if (userData) {
      setCurrentUserId(userData.id);
      console.log('현재 로그인된 유저 ==>', userData.id);
    }
  }, [userData]);

  const { addMemoMutation } = useMemosQuery();
  const { mutate: addMemoMutate } = addMemoMutation;

  const toggleAddMemoForm = () => setIsWritingMemo(!isWritingMemo);
  const handleMemoOnChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => setMemo(e.target.value);
  const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const newMemo = {
      bookId: paramId!,
      content: memo,
      uid: currentUserId,
      isEditing: false,
      timeStamp: Date.now()
    };
    addMemoMutate(newMemo, {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.MEMOS);
      }
    });
    //위치?
    setMemo('');
    setIsWritingMemo(false);
  };

  return (
    <St.Container>
      {/* '메모작성 아이콘' */}
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
