import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  randomVerse,
  clearVerse,
  selectVerseMode,
} from "./features/verseSlice";
import { clearWord, selectWordSlice } from "./features/wordSlice";
import {
  clearArticleCount,
  selectAllArticlesFound,
  selectArticleCount,
} from "./features/countSlice";
import { setParsingArticle } from "./features/parsingSlice";
import "./Word.css";

const CheckWord = ({ children, setArticleGrid, blankGrid }) => {
  console.log("CheckWord renders");
  const { word, partOfSpeech } = useSelector(selectWordSlice);
  const [checkComplete, setCheckComplete] = useState("Check");
  const allArticlesFound = useSelector(selectAllArticlesFound);
  const articleCount = useSelector(selectArticleCount);
  const verseMode = useSelector(selectVerseMode);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setParsingArticle(false));
    if (allArticlesFound || articleCount === 0) {
      setCheckComplete("Good Job!");
      setTimeout(() => {
        dispatch(clearVerse());
      }, 500);
      setTimeout(() => {
        setCheckComplete("Check");
        setTimeout(() => {
          dispatch(clearArticleCount());
          dispatch(randomVerse());
          setArticleGrid(blankGrid);
          dispatch(clearWord());
        }, 1);
      }, 501);
    } else {
      setParsingArticle(false);
      setCheckComplete("Find More Words!");
      setTimeout(() => {
        setCheckComplete("Check");
      }, 500);
    }
  };

  let selectedWord = "";
  let describeWord = ` - ${partOfSpeech}`;

  if (word) {
    selectedWord = word;
  } else {
    selectedWord = " ";
  }

  if (!word) {
    describeWord = `Select ${verseMode}s`;
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
        <button className="button" onClick={handleClick}>
          {checkComplete}
        </button>

        <button
          className="button"
          onClick={() => {
            dispatch(clearVerse());
            setCheckComplete("Check");
            setTimeout(() => {
              dispatch(clearArticleCount());
              dispatch(randomVerse());
              setArticleGrid(blankGrid);
              dispatch(clearWord());
            }, 1);
          }}
        >
          Skip
        </button>
      </div>
    </div>
  );
};

export default CheckWord;
