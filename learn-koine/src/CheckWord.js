import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { randomVerse } from "./features/verseSlice";
import { clearWord, selectWordSlice } from "./features/wordSlice";
import "./Word.css";

const CheckWord = ({ children, setArticleGrid, blankGrid }) => {
  const { word, partOfSpeech } = useSelector(selectWordSlice);



  const dispatch = useDispatch();

  let selectedWord = "";
  let describeWord = "";

  if (word) {
    selectedWord = word;
  } else {
    selectedWord = " ";
  }

  if (partOfSpeech !== "article" && word) {
    describeWord = "Not an artcle :(";
  } else if (partOfSpeech !== "article" && !word) {
    describeWord = "Select an article";
  }


  return (
    <div>
      <p>{selectedWord}</p>
      <p>{describeWord}</p>
      {children}
      <button
        className="button"
        onClick={() => {
          dispatch(randomVerse());
          setArticleGrid(blankGrid);
          dispatch(clearWord());
        }}
      >
        New Verse
      </button>
    </div>
  );
};

export default CheckWord;
