import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import collectionSlice from "./slices/collectionSlice";
import authSlice from "./slices/authSlice";
import cartSlice from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    collection: collectionSlice,
    auth: authSlice,
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
