import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: null;
  isSignIn: boolean;
}

const initialState: AuthState = {
  user: null,
  isSignIn: localStorage.getItem("email") ? true : false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = { ...action.payload };
    },
    setIsSignIn: (state, action: PayloadAction<boolean>) => {
      state.isSignIn = action.payload;
    },
  },
});

export const { setUser, setIsSignIn } = authSlice.actions;

export default authSlice.reducer;
