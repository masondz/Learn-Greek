import React from "react";
// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearVerse, selectVerseMode, setVerse } from "./features/verseSlice";
import { clearWord, selectWordSlice } from "./features/wordSlice";
import "./Word.css";
import { getRandomVerse, organizeText } from "./Verse";
import { greekText } from "./greek_text/greekText";

const CheckWord = ({ children, setArticleGrid, blankGrid }) => {
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
    partOfSpeech.includes("Particle") ||
    partOfSpeech.includes("Interjection")
  ) {
    describeWord = `${selectedWord} - ${partOfSpeech} - "${gloss}"`;
  } else if (partOfSpeech.includes("Hebrew")) {
    describeWord = `${selectedWord} - Hebrew transliteration (indeclinable) - ${gloss}`;
  } else if (partOfSpeech.includes("Aramaic")) {
    describeWord = `${selectedWord} - Aramaic transliteration (indeclinable) - ${gloss}`;
  } else {
    describeWord = `${selectedWord} - ${partOfSpeech}`;
  }

  return (
    <div>
      <div className="chosen-word">
        <p>{describeWord}</p>
      </div>
      <br></br>
      <div className="grid-area">{children}</div>
      <br></br>
      <div className="button-group">
        <button
          className="button"
          id="Random-Verse-Button"
          onClick={() => {
            dispatch(clearVerse());
            // setCheckComplete("Check");
            let newRandomVerse = getRandomVerse(organizeText(greekText));
            setTimeout(() => {
              // dispatch(clearArticleCount());
              dispatch(setVerse(newRandomVerse));
              setArticleGrid(blankGrid);
              dispatch(clearWord());
            }, 1);
          }}
        >
          Random Verse
        </button>
      </div>
    </div>
  );
};

export default CheckWord;
