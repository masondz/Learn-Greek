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
    parse: { case: [], number: "", gender: [] },
  },
  reducers: {
    setWord: (state, action) => {
      state.word = action.payload;
      console.log(`Setting word action... ${action.payload}`)
      if (wordUsages[action.payload] === undefined) {
        console.log(`${action.payload} is not in lexicon...`)
        state.partOfSpeech = "Sorry, word isn't in our lexicon "
        state.parse = { case: [null], number: null, gender: null}
      } else {
        console.log(`${action.payload}: ${wordUsages[action.payload].parse}`)
        let splitParseOnOR = wordUsages[action.payload].parse.split('｜');
        let splitOnComma = splitParseOnOR[1].split(', ')
        state.partOfSpeech = splitOnComma[0];
        if(state.partOfSpeech !== "Verb") {
          state.parse.case = splitOnComma[1];
          state.parse.number = splitOnComma[2];
          state.parse.gender = splitOnComma[3];
        } else if (state.partOfSpeech === "Verb") {
          if (splitOnComma[1].includes("iNfinitive")) {  //"ἀγαθοποιοῦντες":{"parse":"V-PAP-NPM｜Verb, Present, Active, Participle, Nominative, Plural, Masculine","GN":"G15"}
            state.parse.tense = splitOnComma[1];         //"ἀγαλλιῶμεν":{"parse":"V-PAS-1P｜Verb, Present, Active, Subjunctive, first, Plural","GN":"G21"},
            state.parse.voice = splitOnComma[2];         //"ἀγαπάτω":{"parse":"V-PAM-3S｜Verb, Present, Active, iMperative, third, Singular","GN":"G25"}
            state.parse.mood = splitOnComma[3];
            state.parse.case = [null];
            state.parse.person = null;
            state.parse.number = null;
            state.parse.gender = [null];
          } else {
            state.parse = {tense: splitOnComma[1], voice: splitOnComma[2], mood: splitOnComma[3], }
            if(state.parse.mood === "Participle") {
              state.parse.case = splitOnComma[4];
              state.parse.number = splitOnComma[5];
              state.parse.gender = splitOnComma[6];
            } else {
              state.parse.person = splitOnComma[4];
              state.parse.number = splitOnComma[5];
            }
          }
        }
      }
    },
    isArticle: (state, action) => {
      if (checkIfArticle(action.payload)) {
        state.word = action.payload;
        state.partOfSpeech = "definite article";
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

export const { isArticle, checkWordSlice, clearWord, setWord } = wordSlice.actions;

export const selectWordSlice = (state) => state.word; //returns an object {word: της, partOfSpeech: "article"}

export default wordSlice.reducer;
