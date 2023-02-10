import { createSlice } from "@reduxjs/toolkit";
import { greekArticles } from "../greek_text/greekArticles";

export const checkIfArticle = (word) => {
  if (word in greekArticles) {
    return true;
  } else {
    return false;
  }
};

const wordSlice = createSlice({
  name: "word",
  initialState: {
    word: null,
    partOfSpeech: null,
    parse: { case: [], number: "", gender: [] },
  },
  reducers: {
    isArticle: (state, action) => {
      if (checkIfArticle(action.payload)) {
        state.word = action.payload;
        state.partOfSpeech = "article";
        state.parse = greekArticles[action.payload];
      } else {
        state.word = action.payload;
        state.partOfSpeech = "";
        state.parse = { case: [], number: "", gender: [] };
      }
    },
    checkWordSlice: (state, action) => {
      console.log(state.word.word);
    },
    clearWord: (state, action) => {
      state.word = null;
      state.partOfSpeech = null;
      state.parse = { case: [], number: "", gender: [] };
    },
  },
});

export const { isArticle, checkWordSlice, clearWord } = wordSlice.actions;

export const selectWordSlice = (state) => state.word; //returns an object {word: της, partOfSpeech: "article"}

export default wordSlice.reducer;
