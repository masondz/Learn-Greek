import { createSlice } from "@reduxjs/toolkit";

const alphabetSlice = createSlice({
  name: "alphabet",
  initialState: { currentScore: 0 },
  reducers: {
    setScore: (state, action) => {
      state.currentScore = action.payload;
    },
  },
});

export const { setScore } = alphabetSlice.actions;

export const selectScoreSlice = (state) => state.alphabet;

export default alphabetSlice.reducer;
