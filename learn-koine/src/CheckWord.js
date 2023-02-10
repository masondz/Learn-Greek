import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { randomVerse } from "./features/verseSlice";
import { clearWord, selectWordSlice } from "./features/wordSlice";
import { clearArticleCount, selectAllArticlesFound, selectArticleCount } from "./features/countSlice";
import "./Word.css";

const CheckWord = ({ children, setArticleGrid, blankGrid }) => {
  console.log("CheckWord renders")
  const { word, partOfSpeech } = useSelector(selectWordSlice);
  const allArticlesFound = useSelector(selectAllArticlesFound);
  const articleCount = useSelector(selectArticleCount)
  
  const dispatch = useDispatch();

  let selectedWord = "";
  let describeWord = "";

  if (word) {
    selectedWord = word;
  } else {
    selectedWord = " ";
  }

  if (partOfSpeech !== "article" && word) {
    describeWord = " - Not an artcle :(";
  } else if (partOfSpeech !== "article" && !word) {
    describeWord = "Select an article";
  }

  return (
    <div>
      <div className="chosen-word">
        <p>{selectedWord}</p>
        <p>{describeWord}</p>
      </div>
      {children}
      { allArticlesFound || articleCount === 0 ?
           <button
              className="button"
              onClick={() => {
                dispatch(clearArticleCount());
                dispatch(randomVerse());
                setArticleGrid(blankGrid);
                dispatch(clearWord());
              }}
            >
              New Verse
            </button>
        : <button className="button" disabled>Find articles first!</button>}
    </div>
  );
};

export default CheckWord;
