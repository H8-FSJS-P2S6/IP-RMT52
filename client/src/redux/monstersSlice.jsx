// src/redux/monstersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import { baseURL } from "../helpers/http-client";

export const fetchMonsters = createAsyncThunk(
  "monsters/fetchMonsters",
  async () => {
    const response = await baseURL.get("/monster");
    return response.data;
  }
);

const monstersSlice = createSlice({
  name: "monsters",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonsters.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchMonsters.pending, (state) => {})
      .addCase(fetchMonsters.rejected, (state, action) => {
        console.error("Failed to fetch monsters:", action.error.message);
      });
  },
});

export default monstersSlice.reducer;
