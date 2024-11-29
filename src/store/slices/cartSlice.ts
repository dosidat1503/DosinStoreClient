import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  isShowPopup: boolean;
  isClickPaymentAtCartPopup: number;
}

const initialState: CartState = {
  isShowPopup: false,
  isClickPaymentAtCartPopup: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setIsShowPopup: (state, action: PayloadAction<boolean>) => {
      state.isShowPopup = action.payload;
    },
    setIsClickPaymentAtCartPopup: (state, action: PayloadAction<number>) => {
      state.isClickPaymentAtCartPopup = action.payload;
    },
  },
});

export const { setIsShowPopup, setIsClickPaymentAtCartPopup } = cartSlice.actions;

export default cartSlice.reducer;
