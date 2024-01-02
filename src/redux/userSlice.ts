import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type User = {
  id: string | undefined ,
}

const initialState: User = {
  id: 'e8203e36-a4e5-4c5c-85c2-21b179016be8',
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
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
