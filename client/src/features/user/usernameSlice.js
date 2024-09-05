import { createSlice } from "@reduxjs/toolkit";

export const usernameSlice = createSlice({
  name: "username",
  initialState: {
    username: "",
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setUsername } = usernameSlice.actions;

export default usernameSlice.reducer;
