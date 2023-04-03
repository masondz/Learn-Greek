import React from "react";
// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  randomVerse,
  clearVerse,
  selectVerseMode,
} from "./features/verseSlice";
import { clearWord, selectWordSlice } from "./features/wordSlice";
import "./Word.css";

const CheckWord = ({ children, setArticleGrid, blankGrid }) => {
  console.log("CheckWord renders");
  const { word, partOfSpeech, gloss } = useSelector(selectWordSlice);
  const verseMode = useSelector(selectVerseMode);
  const dispatch = useDispatch();

  let selectedWord = "";
  let describeWord = ` - ${partOfSpeech}`;

  if (word) {
    selectedWord = word;
  } else {
    selectedWord = " ";
  }

  if (!word) {
    describeWord = `Select ${verseMode}s`;
  } else if (
    partOfSpeech.includes("Noun") ||
    partOfSpeech.includes("Adjective") ||
    partOfSpeech.includes("Verb") ||
    partOfSpeech.includes("Adverb") ||
    partOfSpeech.includes("Particle")
  ) {
    describeWord = ` - ${partOfSpeech} - "${gloss}"`;
  }

  return (
    <div>
      <div className="chosen-word">
        <p>{selectedWord}</p>
        <p>{describeWord}</p>
      </div>
      {children}
      <br></br>
      <div className="button-group">
        <button
          className="button"
          onClick={() => {
            dispatch(clearVerse());
            // setCheckComplete("Check");
            setTimeout(() => {
              // dispatch(clearArticleCount());
              dispatch(randomVerse());
              setArticleGrid(blankGrid);
              dispatch(clearWord());
            }, 1);
          }}
        >
          Next Verse
        </button>
      </div>
    </div>
  );
};

export default CheckWord;
