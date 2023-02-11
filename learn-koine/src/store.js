import { configureStore } from "@reduxjs/toolkit";
import verseSlice from "./features/verseSlice";
import wordSlice from "./features/wordSlice";
import countSlice from "./features/countSlice";
import parsingSlice from "./features/parsingSlice";

const store = configureStore({
  reducer: {
    verse: verseSlice,
    word: wordSlice,
    count: countSlice,
    parsing: parsingSlice,
  },
});

export default store;
