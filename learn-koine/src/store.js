import { configureStore } from "@reduxjs/toolkit";
import verseSlice from "./features/verseSlice";
import wordSlice from "./features/wordSlice";

const store = configureStore({
  reducer: {
    verse: verseSlice,
    word: wordSlice,
  },
});

export default store;
