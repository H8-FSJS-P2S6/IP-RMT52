import { configureStore } from "@reduxjs/toolkit";
import { cardSlice } from "./features/card/cardSlice";
import { archetypeSlice } from "./features/card/archetypeSlice";

export const store = configureStore({
  reducer: {
    card: cardSlice.reducer,
    archetype: archetypeSlice.reducer,
  },
});
