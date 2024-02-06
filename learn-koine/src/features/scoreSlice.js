import { createSlice } from "@reduxjs/toolkit";

const scoreSlice = createSlice({
  name: "score",
  initialState: {
    maxCorrect: 0,
    correctFound: 0,
    wrongFound: 0,
    correctWorth: 0,
    wrongWorth: 0,
    currentScore: 0,
  },
  reducers: {
    resetScoreState: (state) => {
      state.maxCorrect = 0;
      state.correctFound = 0;
      state.wrongFound = 0;
    },
    resetFoundWords: (state) => {
      state.correctFound = 0;
      state.wrongFound = 0;
    },
    increaseCorrect: (state) => {
      state.correctFound += 1;
    },
    increaseWrong: (state) => {
      state.wrongFound += 1;
    },
    setCorrectWorth: (state, action) => {
      state.correctWorth = action.payload;
    },
    setWrongWorth: (state, action) => {
      state.wrongWorth = action.payload;
    },
    setCurrentScore: (state, action) => {
      state.currentScore = action.payload;
    },
  },
});

export const {
  resetScoreState,
  increaseCorrect,
  increaseWrong,
  setCorrectWorth,
  setWrongWorth,
  resetFoundWords,
  setCurrentScore,
} = scoreSlice.actions;

export const selectScoreSlice = (state) => state.score;

export default scoreSlice.reducer;
