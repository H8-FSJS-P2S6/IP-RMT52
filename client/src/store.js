import { configureStore } from "@reduxjs/toolkit";
import { cardsSlice } from "./features/card/cardsSlice";
import { archetypesSlice } from "./features/card/archetypesSlice";
import { quizSlice } from "./features/quiz/quizSlice";
import { favoritesSlice } from "./features/card/favoritesSlice";
import { cardSlice } from "./features/card/cardSlice.js";
import { filterSlice } from "./features/card/filterSlice.js";

export const store = configureStore({
  reducer: {
    cards: cardsSlice.reducer,
    archetypes: archetypesSlice.reducer,
    quiz: quizSlice.reducer,
    favorites: favoritesSlice.reducer,
    card: cardSlice.reducer,
    filter: filterSlice.reducer,
  },
});
