import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import userFavoritesReducer from "./reducers/userFavoritesReducer";
import monstersReducer from "./reducers/monstersReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    userFavorites: userFavoritesReducer,
    monsters: monstersReducer,
  },
});

export default store;
