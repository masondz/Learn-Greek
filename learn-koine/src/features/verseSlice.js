import { createSlice } from "@reduxjs/toolkit";
import { greekText } from "../greek_text/greekText";
import { newTestament } from "../PickVerse";

export const organizeText = (text) => {
  // let verses = [];
  let verses = {};
  let key = "";
  let value = "";

  const textArray = text.split("\n");

  for (let i = 0; i < textArray.length; i++) {
    key = textArray[i].slice(0, 8);
    value = textArray[i].slice(9);
    verses[key] = value;
    // verses.push({ index: i, reference: key, verse: value });
  }
  return verses;
};

const getRandomVerse = (theText) => {
  let bookArray = Object.keys(newTestament);
  let randomBook = Math.floor(Math.random() * bookArray.length + 1);
  let randomChapter = Math.floor(
    Math.random() * newTestament[bookArray[randomBook]].chapterVerseIndex.length
  );
  let randomVerse = Math.floor(
    Math.random() *
      newTestament[bookArray[randomBook]].chapterVerseIndex[randomChapter] +
      1
  );

  let tempChapter = "";
  let tempVerse = "";

  if (randomChapter < 10) {
    tempChapter = "0" + randomChapter;
  } else {
    tempChapter = randomChapter;
  }

  if (randomVerse < 10) {
    tempVerse = "0" + randomVerse;
  } else {
    tempVerse = randomVerse;
  }

  let randomReference = randomBook + 40 + "0" + tempChapter + "0" + tempVerse;
  console.log(randomReference);
  console.log(theText[randomReference]);
  // let randomIndex = Math.floor(Math.random() * theText.length + 1);

  // return [theText[randomIndex].reference, theText[randomIndex].verse];
  return [randomReference, theText[randomReference]];
};

const verseSlice = createSlice({
  name: "verse",
  initialState: {
    verse: "Selecting...",
    reference: "",
    mode: "definite articles",
  },
  reducers: {
    checkVerseSlice: (state, action) => {
      console.log("check verse slice");
    },

    setVerse: (state, action) => {
      state.verse = action.payload[1];
      state.reference = action.payload[0];
    },

    randomVerse: (state, action) => {
      let randomVerse = getRandomVerse(organizeText(greekText));
      state.verse = randomVerse[1];
      state.reference = randomVerse[0];
    },
    clearVerse: (state, action) => {
      state.verse = "";
      state.reference = "";
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { checkVerseSlice, randomVerse, clearVerse, setMode, setVerse } =
  verseSlice.actions;

export const selectVerseSlice = (state) => state.verse.verse;

export const selectVerseReference = (state) => state.verse.reference;

export const selectVerseMode = (state) => state.verse.mode;

export default verseSlice.reducer;
