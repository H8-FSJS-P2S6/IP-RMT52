import { createSlice } from "@reduxjs/toolkit";

export const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    quiz: null,
    guess: "",
    feedback: "",
    hintVisible: false,
  },
  reducers: {
    setQuiz: (state, action) => {
      if (!state.quiz) {
        state.quiz = action.payload;
      } else {
        state.quiz;
      }
    },
    setGuess: (state, action) => {
      state.guess = action.payload;
    },
    setFeedback: (state, action) => {
      state.feedback = action.payload;
    },
    toggleHintVisibility: (state) => {
      state.hintVisible = !state.hintVisible;
    },
  },
});

export const { setQuiz, setGuess, setFeedback, toggleHintVisibility } =
  quizSlice.actions;

export default quizSlice.reducer;
