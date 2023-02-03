import React, { useState, useEffect } from "react";
import { greekArticles } from "./greek_text/greekArticles";
import { useDispatch, useSelector } from "react-redux";
import { randomVerse } from "./features/verseSlice";
import { selectWordSlice } from "./features/wordSlice";
import { checkWordSlice } from "./features/wordSlice";

const Word = () => {
  const { word, partOfSpeech, parse } = useSelector(selectWordSlice);
  console.log(word);
  console.log(partOfSpeech);
  console.log(parse);

  const dispatch = useDispatch();

  // checkWordSlice();

  return (
    <div>
      <p>{word ? word : " "}</p>
      <p>
        {partOfSpeech === "article"
          ? `${parse.case} - ${parse.number} - ${parse.gender}`
          : "No article selected"}
      </p>
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
