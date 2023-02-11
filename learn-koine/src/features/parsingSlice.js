import { createSlice } from "@reduxjs/toolkit";

const parsingSlice = createSlice({
  name: "parsing",
  initialState: { parsingArticle: false },
  reducers: {
    checkParsingSlice: () => {
      alert("checking parsing slice");
    },
  },
});

export const { checkParsingSlice } = parsingSlice.actions;

export const selectParsingArticle = (state) => state.parsing.parsingArticle;

export default parsingSlice;
