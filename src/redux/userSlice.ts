import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
  id: string | undefined;
};

const initialState: User = {
  id: localStorage.getItem('sb-bsnozctogedtgqvbhqby-auth-token')
    ? JSON.parse(localStorage.getItem('sb-bsnozctogedtgqvbhqby-auth-token')!).user.id
    : ''
  // id: localStorage.getItem('user.id') || null
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

    // loginUser: (state) => {
    //   const storedId = localStorage.getItem('sb-bsnozctogedtgqvbhqby-auth-token');
    //   state.id = storedId || '';
    // }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
