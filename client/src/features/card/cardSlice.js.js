import { createSlice } from "@reduxjs/toolkit";

export const cardSlice = createSlice({
  name: "card",
  initialState: {
    card: null,
  },
  reducers: {
    setCard: (state, action) => {
      state.card = action.payload;
    },
  },
});

export const { setCard } = cardSlice.actions;

export default cardSlice.reducer;
