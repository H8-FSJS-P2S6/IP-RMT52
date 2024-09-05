import { createSlice } from "@reduxjs/toolkit";

export const archetypeSlice = createSlice({
  name: "archetype",
  initialState: {
    archetypes: [],
  },
  reducers: {
    setArchetypes: (state, action) => {
      state.archetypes = action.payload;
    },
  },
});

export const { setArchetypes } = archetypeSlice.actions;

export default archetypeSlice.reducer;
