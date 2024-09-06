import { createSlice } from "@reduxjs/toolkit";

const monstersSlice = createSlice({
  name: "monsters",
  initialState: [],
  reducers: {
    setMonsters(state, action) {
      return action.payload;
    },
  },
});

export const { setMonsters } = monstersSlice.actions;
export default monstersSlice.reducer;
