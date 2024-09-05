import { configureStore } from "@reduxjs/toolkit";
import { cardsSlice } from "./features/card/cardsSlice";
import { archetypesSlice } from "./features/card/archetypesSlice";
import { quizSlice } from "./features/quiz/quizSlice";
import { favoritesSlice } from "./features/card/favoritesSlice";
import { cardSlice } from "./features/card/cardSlice.js";
import { stockSlice } from "./features/card/stockSlicer.js";
import { emailSlice } from "./features/user/emailSlice.js";
import { passwordSlice } from "./features/user/passwordSlice.js";
import { usernameSlice } from "./features/user/usernameSlice.js";

export const store = configureStore({
  reducer: {
    cards: cardsSlice.reducer,
    archetypes: archetypesSlice.reducer,
    quiz: quizSlice.reducer,
    favorites: favoritesSlice.reducer,
    card: cardSlice.reducer,
    stock: stockSlice.reducer,
    email: emailSlice.reducer,
    password: passwordSlice.reducer,
    username: usernameSlice.reducer,
  },
});
