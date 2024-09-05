import { createSlice } from "@reduxjs/toolkit";

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favorites: [],
  },
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
      state.pagination = action.payload.pagination;
    },
  },
});

export const { setFavorites } = favoriteSlice.actions;

export default favoriteSlice.reducer;
