import { configureStore } from "@reduxjs/toolkit";
import { cardSlice } from "./features/card/cardSlice";
import { archetypeSlice } from "./features/card/archetypeSlice";
import { quizSlice } from "./features/quiz/quizSlice";
import { favoriteSlice } from "./features/card/favoriteSlice";

export const store = configureStore({
  reducer: {
    card: cardSlice.reducer,
    archetype: archetypeSlice.reducer,
    quiz: quizSlice.reducer,
    favorite: favoriteSlice.reducer,
  },
});
