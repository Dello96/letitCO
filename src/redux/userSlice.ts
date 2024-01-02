import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
  id: string | undefined;
};

const initialState: User = {
  id: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id;
    },
    // 사용자 정보 초기화
    clearUser: (state) => {
      state.id = '';
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
