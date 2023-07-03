import { createSlice } from "@reduxjs/toolkit";

const verbSlice = createSlice({
  name: "verb",
  initialState: { partOfSpeech: "Verb", Type: "" },
  reducers: {
    setVerbType: (state, action) => {
      state.Type = action.payload;
    },
  },
});

export const { setVerbType } = verbSlice.actions;

export const selectVerbSlice = (state) => state.verb;

export default verbSlice.reducer;
