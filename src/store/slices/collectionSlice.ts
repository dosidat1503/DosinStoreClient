import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { sortTypeList } from "@/features/collection/constants";

export interface CollectionState {
  query: string;
  fashionType: number;
  category: number;
  sortBy: string;
}

const initialState: CollectionState = {
  query: "",
  fashionType: 1,
  category: 1,
  sortBy: sortTypeList[0].id,
};

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setFashionType: (state, action: PayloadAction<number>) => {
      state.fashionType = action.payload;
    },
    setCategory: (state, action: PayloadAction<number>) => {
      state.category = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setQuery, setFashionType, setCategory, setSortBy } = collectionSlice.actions;

export default collectionSlice.reducer;
