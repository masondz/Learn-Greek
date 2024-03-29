import { configureStore } from "@reduxjs/toolkit";
import verseSlice from "./features/verseSlice";
import wordSlice from "./features/wordSlice";
import countSlice from "./features/countSlice";
import parsingSlice from "./features/parsingSlice";
import verbSlice from "./features/verbSlice";
import scoreSlice from "./features/scoreSlice";
// import alphabetSlice from "./features/alphabetSlice";

const store = configureStore({
  reducer: {
    verse: verseSlice,
    word: wordSlice,
    count: countSlice,
    parsing: parsingSlice,
    verb: verbSlice,
    score: scoreSlice,
    // alphabet: alphabetSlice,
  },
});

export default store;
