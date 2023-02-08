import React, { useState } from "react";
import "./Verse.css";
import CheckWord from "./CheckWord";
import { useSelector, useDispatch } from "react-redux";
import { selectVerseSlice } from "./features/verseSlice";
import { isArticle } from "./features/wordSlice";
import { ArticleGrid } from "./ArticleGrid";
import { PassageNumber } from "./PassageNumber";

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


console.log(isArticle);

const Verse = () => {

  let [word] = useState("");

  const [articleGrid, setArticleGrid] = useState({
    nominative: "-clear",
    genitive: "-clear",
    dative: "-clear",
    accusative: "-clear",
    singular: "-clear",
    plural: "-clear",
    masculine: "-clear",
    feminine: "-clear",
    neuter: "-clear",
  });

  const blankGrid = {
    nominative: "-clear",
    genitive: "-clear",
    dative: "-clear",
    accusative: "-clear",
    singular: "-clear",
    plural: "-clear",
    masculine: "-clear",
    feminine: "-clear",
    neuter: "-clear",
  };

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
          onClick={(e) => {
            dispatch(isArticle(e.target.innerHTML));
            setArticleGrid(blankGrid);
          }}
          key={word.word + i}
          >
            {word.word}
          </p>
        );
      })
    }
      <PassageNumber />
      <br></br>
      <div>
        <CheckWord word={word} setArticleGrid={setArticleGrid} blankGrid={blankGrid}>
          <ArticleGrid
            articleGrid={articleGrid}
            setArticleGrid={setArticleGrid}
          />
        </CheckWord>
      </div>
      <div>
      </div>
    </div>
  );
};

export default Verse;
