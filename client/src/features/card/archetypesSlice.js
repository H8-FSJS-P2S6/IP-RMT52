import { createSlice } from "@reduxjs/toolkit";

export const archetypesSlice = createSlice({
  name: "archetypes",
  initialState: {
    archetypes: [],
  },
  reducers: {
    setArchetypes: (state, action) => {
      state.archetypes = action.payload;
    },
  },
});

export const { setArchetypes } = archetypesSlice.actions;

export default archetypesSlice.reducer;
