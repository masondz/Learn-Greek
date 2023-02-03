import React, { useEffect, useState } from "react";
import "./Verse.css";
import Word from "./Word";
import { useSelector, useDispatch } from "react-redux";
import { selectVerseSlice } from "./features/verseSlice";
import { isArticle } from "./features/wordSlice";

//make the verse an array:
const arrayIffy = (verse) => {
  let sentenceSplit = verse.split(" ");
  let sentenceWords = sentenceSplit.map((word) => {
    return {
      word: word,
    };
  });
  console.log(sentenceWords);
  return sentenceWords;
};

const onClick = (e) => {
  e.preventDefault();
  return e.target.innerHTML;
};

console.log(isArticle);

const Verse = () => {
  let [word, setWord] = useState("");
  const dispatch = useDispatch();

  const verse = useSelector(selectVerseSlice);
  console.log("checking selector in Verse: " + verse);

  let verseArray = arrayIffy(verse);

  return (
    <div className="verse-sentence">
      {verseArray.map((word, i) => {
        return (
          <p
            className="verse-word"
            name={word.word}
            // onClick={(e) => setWord(onClick(e))}
            onClick={(e) => dispatch(isArticle(e.target.innerHTML))}
            key={word.word + i}
          >
            {word.word}
          </p>
        );
      })}
      <br></br>
      <div>
        <Word word={word} />
      </div>
    </div>
  );
};

export default Verse;
