import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { randomVerse } from "./features/verseSlice";
import { clearWord, selectWordSlice } from "./features/wordSlice";
import { clearArticleCount, selectAllArticlesFound, selectArticleCount } from "./features/countSlice";
import "./Word.css";

const CheckWord = ({ children, setArticleGrid, blankGrid }) => {
  console.log("CheckWord renders")
  const { word, partOfSpeech } = useSelector(selectWordSlice);
  const [checkComplete, setCheckComplete] = useState("Check")
  const allArticlesFound = useSelector(selectAllArticlesFound);
  const articleCount = useSelector(selectArticleCount)
  
  const dispatch = useDispatch();

  const handleClick = () => {
    if (allArticlesFound || articleCount === 0) {
      setCheckComplete("Good Job!")
      setTimeout(() => {
        setCheckComplete("Check")
        setTimeout(() => {
          dispatch(clearArticleCount());
          dispatch(randomVerse());
          setArticleGrid(blankGrid);
          dispatch(clearWord());
        }, 1)
      }, 500)
    } else {
      setCheckComplete("Find More Articles!")
      setTimeout(() => {
        setCheckComplete("Check")
      }, 500)
    }
  }

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
      <br></br>
      <div className="button-group">
      <button className="button" onClick={handleClick}>{checkComplete}</button>

      <button className="button" onClick={() => {
        setCheckComplete("Check")
        setTimeout(() => {
            dispatch(clearArticleCount());
            dispatch(randomVerse());
            setArticleGrid(blankGrid);
            dispatch(clearWord());
          }, 1)
      }}>Skip</button>
      </div>
    </div>
  );
};

export default CheckWord;
