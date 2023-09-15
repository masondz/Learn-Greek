import { createSlice } from "@reduxjs/toolkit";

const alphabetSlice = createSlice({
  name: "alphabet",
  initialState: { currentScore: 0, randomLetters: [] },
  reducers: {
    setScore: (state, action) => {
      state.currentScore = action.payload;
    },
    setRandomLetters: (state, action) => {
      state.randomLetters = action.payload; //array
    },
  },
});

export const { setScore, setRandomLetters } = alphabetSlice.actions;

export const selectScoreSlice = (state) => state.alphabet;

export const selectRandomLetters = (state) => state.alphabet.randomLetters;

export default alphabetSlice.reducer;
