import React, { useState } from "react";
import "./Verse.css";
import Word from "./Word";

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

const Verse = ({ verse }) => {
  let [word, setWord] = useState("");

  let verseArray = arrayIffy(verse);

  return (
    <div className="verse-sentence">
      {verseArray.map((word) => {
        return (
          <p
            className="verse-word"
            name={word.word}
            onClick={(e) => setWord(onClick(e))}
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
