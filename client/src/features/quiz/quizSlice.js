import { createSlice } from "@reduxjs/toolkit";

export const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    quiz: null,
  },
  reducers: {
    setQuiz: (state, action) => {
      if (!state.quiz) {
        state.quiz = action.payload;
      } else {
        state.quiz;
      }
    },
  },
});

export const { setQuiz } = quizSlice.actions;

export default quizSlice.reducer;
