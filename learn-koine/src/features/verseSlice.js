import { createSlice } from "@reduxjs/toolkit";
import { greekText } from "../greek_text/greekText";

const organizeText = (text) => {
  let verses = [];
  let key = "";
  let value = "";

  const textArray = text.split("\n");

  for (let i = 0; i < textArray.length; i++) {
    key = textArray[i].slice(0, 8);
    value = textArray[i].slice(9);
    verses.push({ index: i, reference: key, verse: value });
  }
  return verses;
};

const getRandomVerse = (theText) => {
  let randomIndex = Math.floor(Math.random() * theText.length + 1);

  return [theText[randomIndex].reference, theText[randomIndex].verse];
};

const verseSlice = createSlice({
  name: "verse",
  initialState: { verse: "Selecting...", reference: "" },
  reducers: {
    checkVerseSlice: (state, action) => {
      console.log("check verse slice");
    },

    randomVerse: (state, action) => {
      state.verse = { verse: "Getting verse...", reference: "" };
      let randomVerse = getRandomVerse(organizeText(greekText));
      state.verse = randomVerse[1];
      state.reference = randomVerse[0];
    },
  },
});

export const { checkVerseSlice, randomVerse } = verseSlice.actions;

export const selectVerseSlice = (state) => state.verse.verse;

export const selectVerseReference = (state) => state.verse.reference;

export default verseSlice.reducer;
