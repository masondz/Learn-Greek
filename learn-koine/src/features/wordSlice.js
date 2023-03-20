import { createSlice } from "@reduxjs/toolkit";
import { greekArticles } from "../greek_text/greekArticles";
import { wordUsages } from "../greek_text/greekLexiconObject";

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
    parse: "",
    gNum: "",
    gloss: "",
  },
  reducers: {
    setWord: (state, action) => {
      const { word, parse, gNum, gloss } = action.payload;
      state.word = word;
      state.parse = parse;
      state.gNum = gNum;
      state.gloss = gloss;
      let splitParseOnOR = wordUsages[word].parse.split("｜");
      let splitOnComma = splitParseOnOR[1].split(", ");
      state.partOfSpeech = splitOnComma[0];
    },
    isArticle: (state, action) => {
      if (checkIfArticle(action.payload)) {
        state.word = action.payload;
        state.partOfSpeech = "definite article";
        state.parse = greekArticles[action.payload];
        state.parse.person = "";
      }
    },
    checkWordSlice: (state, action) => {
      console.log(state.word.word);
    },
    clearWord: (state, action) => {
      state.word = null;
      state.partOfSpeech = null;
      state.parse = "";
      state.gNum = "";
      state.gloss = "";
    },
  },
});

export const { isArticle, checkWordSlice, clearWord, setWord } =
  wordSlice.actions;

export const selectWordSlice = (state) => state.word; //returns an object {word: της, partOfSpeech: "article"}

export default wordSlice.reducer;
