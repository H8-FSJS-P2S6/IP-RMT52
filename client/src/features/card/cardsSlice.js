import { createSlice } from "@reduxjs/toolkit";

export const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    cards: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalRows: 0,
    },
  },
  reducers: {
    setCards: (state, action) => {
      state.cards = action.payload.cards;
      state.pagination = action.payload.pagination;
    },
  },
});

export const { setCards } = cardsSlice.actions;

export default cardsSlice.reducer;
