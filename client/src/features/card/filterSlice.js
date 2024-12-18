import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filters",
  initialState: {
    search: "",
    archetype: "",
    sort: "DESC",
    page: 1,
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setArchetype: (state, action) => {
      state.archetype = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setSearch, setArchetype, setSort, setPage } =
  filterSlice.actions;

export default filterSlice.reducer;
