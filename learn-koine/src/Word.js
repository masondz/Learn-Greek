import React, { useState } from "react";
import { greekArticles } from "./greek_text/greekArticles";
import { useDispatch } from "react-redux";
import { randomVerse } from "./features/verseSlice";

const checkIfArticle = (word) => {
  if (word.word in greekArticles) {
    console.log("it's an article!");
    console.log(greekArticles[word.word]);
    return true;
  } else {
    console.log("it is not an article :(");
    return false;
  }
};

const Word = (word) => {
  let theWord = checkIfArticle(word)
    ? `${word.word} - It's an article!`
    : `${word.word} - It's not an article :(`;

  const dispatch = useDispatch();

  return (
    <div>
      <p>{theWord ? theWord : " "}</p>
      <p>{word.word in greekArticles ? greekArticles[word.word].case : ""}</p>
      <button
        onClick={() => {
          dispatch(randomVerse());
        }}
      >
        New Verse
      </button>
    </div>
  );
};

export default Word;
