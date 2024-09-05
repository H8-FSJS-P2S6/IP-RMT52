import { createSlice } from "@reduxjs/toolkit";

export const stockSlice = createSlice({
  name: "stock",
  initialState: {
    stock: 0,
  },
  reducers: {
    setStock: (state, action) => {
      state.stock = action.payload;
    },
  },
});

export const { setStock } = stockSlice.actions;

export default stockSlice.reducer;
