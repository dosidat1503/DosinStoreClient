import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: null;
  isSignIn: boolean;
  isUnauthorized: boolean;
  isExpiredToken: boolean;
  isForbidden: boolean;
}

const initialState: AuthState = {
  user: null,
  isSignIn: false,
  isUnauthorized: false,
  isExpiredToken: false,
  isForbidden: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = { ...action.payload };
    },
    setIsUnauthorized: (state, action: PayloadAction<boolean>) => {
      state.isUnauthorized = action.payload;
    },
    setIsExpiredToken: (state, action: PayloadAction<boolean>) => {
      state.isExpiredToken = action.payload;
    },
    setIsForbidden: (state, action: PayloadAction<boolean>) => {
      state.isForbidden = action.payload;
    },
    setIsSignIn: (state, action: PayloadAction<boolean>) => {
      state.isSignIn = action.payload;
    },
  },
});

export const { setUser, setIsUnauthorized, setIsExpiredToken, setIsSignIn } = authSlice.actions;

export default authSlice.reducer;
