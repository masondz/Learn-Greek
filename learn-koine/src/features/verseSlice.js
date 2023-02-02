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
  
//   const theText = organizeText(greekText);
  
  const getRandomVerse = (theText) => {
    let randomIndex = Math.floor(Math.random() * theText.length + 1);
    return theText[randomIndex].verse;
  };
  
//   let verse = getRandomVerse();


const verseSlice = createSlice({
    name: "verse",
    initialState: {verse: "Selecting..."},
    reducers: {
        checkVerseSlice: (state, action) => {
            console.log("check verse slice")
        },
        
        randomVerse: (state, action) => {
            state.verse = getRandomVerse(organizeText(greekText));
            console.log(typeof state)
        }
    },


})

export const { checkVerseSlice, randomVerse } = verseSlice.actions;

export const selectVerseSlice = state => state.verse.verse;


export default verseSlice.reducer;