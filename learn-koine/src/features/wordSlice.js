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
    parse: { case: [], number: "", gender: [], person: "" },
  },
  reducers: {
    setWord: (state, action) => {
      state.word = action.payload;
      let chosenWord = action.payload;
      console.log(`Setting word action... ${chosenWord}`)
      if (wordUsages[chosenWord] === undefined && wordUsages[chosenWord.toLowerCase() === undefined]) { 
        console.log(`${chosenWord} is not in lexicon...`)
        state.partOfSpeech = "Sorry, word isn't in our lexicon "
        state.parse = { case: [null], number: null, gender: null};
        return;
      } else if (wordUsages[chosenWord] === undefined && wordUsages[chosenWord.toLowerCase()] !== undefined) {
        chosenWord = chosenWord.toLowerCase(); //the lexicon has some words with and without capitalized letters.
      }
        console.log(`${chosenWord}: ${wordUsages[chosenWord].parse}`)
        let splitParseOnOR = wordUsages[chosenWord].parse.split('｜');
        let splitOnComma = splitParseOnOR[1].split(', ')
        state.partOfSpeech = splitOnComma[0];
        if(state.partOfSpeech !== "Verb") {  
          if (state.partOfSpeech !== "Personal pronoun") {    //"Αὐτῶν":{"parse":"P-GPM｜Personal pronoun, genitive, plural, masculine","GN":"G846"}
          state.parse.case = splitOnComma[1];           //"ἐγώ":{"parse":"P-1NS｜Personal pronoun, first, nominative, singular","GN":"G1473"}
          state.parse.number = splitOnComma[2];         //"ὑμῖν":{"parse":"P-2DP｜Personal pronoun, second, dative, plural","GN":"G4771"}
          state.parse.gender = splitOnComma[3];
          state.parse.person = "";
          } else if (state.partOfSpeech === "Personal pronoun") {
            if(splitOnComma.includes("first") || splitOnComma.includes("second") || splitOnComma.includes("third")) {
              state.parse.person = splitOnComma[1];
              state.parse.case = splitOnComma[2];
              state.parse.number = splitOnComma[3];
              state.parse.gender = null;
            } else {
              state.parse.case = splitOnComma[1];           
              state.parse.number = splitOnComma[2];         
              state.parse.gender = splitOnComma[3];
            }
          } 
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
    },
    isArticle: (state, action) => {
      if (checkIfArticle(action.payload)) {
        state.word = action.payload;
        state.partOfSpeech = "definite article";
        state.parse = greekArticles[action.payload];
      }
    },
    checkWordSlice: (state, action) => {
      console.log(state.word.word);
    },
    clearWord: (state, action) => {
      state.word = null;
      state.partOfSpeech = null;
      state.parse = { case: [], number: "", gender: [], person: "", tense: "", voice: "", };
    },
  },
});

export const { isArticle, checkWordSlice, clearWord, setWord } = wordSlice.actions;

export const selectWordSlice = (state) => state.word; //returns an object {word: της, partOfSpeech: "article"}

export default wordSlice.reducer;
