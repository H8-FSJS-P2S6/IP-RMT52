import { createSlice } from "@reduxjs/toolkit";

export const passwordSlice = createSlice({
  name: "password",
  initialState: {
    password: "",
  },
  reducers: {
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

export const { setPassword } = passwordSlice.actions;

export default passwordSlice.reducer;
