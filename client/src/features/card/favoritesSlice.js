import { createSlice } from "@reduxjs/toolkit";

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
  },
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
  },
});

export const { setFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
