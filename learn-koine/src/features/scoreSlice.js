import { createSlice } from "@reduxjs/toolkit";

const scoreSlice = createSlice({
  name: "score",
  initialState: { currentScore: 0 },
  reducers: {
    setScore: (state, action) => {
      state.currentScore = action.payload;
    },
  },
});

export const { setScore } = scoreSlice.actions;

export const selectScoreSlice = (state) => state.score;

export default scoreSlice.reducer;
