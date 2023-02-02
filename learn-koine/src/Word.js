import React, {useState} from "react";
import { greekArticles } from "./greek_text/greekArticles";
import { useDispatch } from "react-redux";
import { randomVerse } from "./features/verseSlice";

const checkIfArticle = (word) => {
  if (greekArticles.includes(word.word)) {
    console.log("it's an article!");
    return true;
  } else {
    console.log("it is not an article :(");
    return false;
  }
};


const Word = (word) => {


  let theWord = checkIfArticle(word) ? `${word.word} - It's an article!` : `${word.word} - It's not an article :(`

  const dispatch = useDispatch();
  

  return (
    <div>
    <p>{theWord ? theWord : " "}</p>
    <button onClick={() => {dispatch(randomVerse())}}>New Verse</button>

  </div>
  );
};

export default Word;
