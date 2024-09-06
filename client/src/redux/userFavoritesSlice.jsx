import { createSlice } from "@reduxjs/toolkit";

const userFavoritesSlice = createSlice({
  name: "userFavorites",
  initialState: [],
  reducers: {
    addFavorite(state, action) {
      state.push(action.payload);
    },
    removeFavorite(state, action) {
      return state.filter(
        (favorite) =>
          !(
            favorite.userId === action.payload.userId &&
            favorite.monsterId === action.payload.monsterId
          )
      );
    },
  },
});

export const { addFavorite, removeFavorite } = userFavoritesSlice.actions;

export default userFavoritesSlice.reducer;
