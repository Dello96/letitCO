import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { supabase } from '../supabaseClient';

export type User = {
  id: string;
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
    // loginUser: async (state) => {
    //   try {
    //     const { data } = await supabase.auth.getUser();
    //     const user = data?.user;
    //     if (user) {
    //       state.id = user.id;
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
