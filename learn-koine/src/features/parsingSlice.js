import { createSlice } from "@reduxjs/toolkit";

const parsingSlice = createSlice({
  name: "parsing",
  initialState: { parsingArticle: false },
  reducers: {
    checkParsingSlice: () => {
      alert("checking parsing slice");
    },
    setParsingArticle: (state, action) => {
      state.parsingArticle = action.payload;
    },
  },
});

export const { checkParsingSlice, setParsingArticle } = parsingSlice.actions;

export const selectParsingArticle = (state) => state.parsing.parsingArticle;

export default parsingSlice.reducer;
