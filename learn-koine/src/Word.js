import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { randomVerse } from "./features/verseSlice";
import { clearWord, selectWordSlice } from "./features/wordSlice";
import "./Word.css";

const Word = ({ children, setArticleGrid, blankGrid }) => {
  const { word, partOfSpeech } = useSelector(selectWordSlice);
  console.log(word);
  console.log(partOfSpeech);

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

  console.log(children);

  return (
    <div>
      <p>{selectedWord}</p>
      <p>{describeWord}</p>
      {partOfSpeech === "article" ? children : <div></div>}
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

export default Word;
