import React, { useState } from "react";
import { greekArticles } from "./greek_text/greekArticles";
import { useDispatch } from "react-redux";
import { randomVerse } from "./features/verseSlice";

const checkIfArticle = (word) => {
  if (word in greekArticles) {
    console.log("it's an article!");
    console.log(greekArticles[word.word]);
    return true;
  } else {
    console.log("it is not an article :(");
    return false;
  }
};

const Word = (word) => {
  let [theWord, setTheWord] = useState(word.word);
  let [isArticle, setIsArticle] = useState(false);
  let [wordParsed, setWordParsed] = useState({});

  if (checkIfArticle(theWord)) {
    console.log("does if statement work?");
    setIsArticle(true);
    setWordParsed(greekArticles[theWord]);
  }

  const dispatch = useDispatch();

  return (
    <div>
      <p>{theWord ? theWord : " "}</p>
      <p>{isArticle ? greekArticles[theWord].case : ""}</p>
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
