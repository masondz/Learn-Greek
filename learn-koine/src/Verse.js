import React, { useState } from "react";
import "./Verse.css";
import CheckWord from "./CheckWord";
import Word from "./Word";
import { useSelector, useDispatch } from "react-redux";
import { selectVerseSlice } from "./features/verseSlice";
import { setArticleCount } from "./features/countSlice";
import { ArticleGrid } from "./ArticleGrid";
import { PassageNumber } from "./PassageNumber";
import { checkIfArticle } from "./features/wordSlice";
import { greekArticles } from "./greek_text/greekArticles";

//make the verse an array:
const arrayIffy = (verse) => {
  let sentenceSplit = verse.split(" ");
  let sentenceWords = sentenceSplit.map((word) => {
    return {
      word: word,
    };
  });
  return sentenceWords;
};

const Verse = () => {
  let [word] = useState("");
  const dispatch = useDispatch();

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

  const verse = useSelector(selectVerseSlice);

  let articleCount = 0;

  let verseArray = arrayIffy(verse);
  for (let i = 0; i < verseArray.length; i++) {
    if (checkIfArticle(verseArray[i].word)) {
      verseArray[i].partOfSpeech = "definite article";
      verseArray[i].parse = greekArticles[verseArray[i].word];
      articleCount++;
    } else {
      verseArray[i].partOfSpeech = "";
      verseArray[i].parse = { case: [], number: "", gender: [] };
    }
  }

  dispatch(setArticleCount(articleCount));

  return (
    <div className="verse-sentence">
      {verseArray.map((word, i) => {
        return (
          <Word
            key={word.word + i}
            word={word}
            setArticleGrid={setArticleGrid}
            blankGrid={blankGrid}
          />
        );
      })}
      <br></br>
      <br></br>
      <PassageNumber />
      <br></br>
      <div>
        <CheckWord
          word={word}
          setArticleGrid={setArticleGrid}
          blankGrid={blankGrid}
        >
          <ArticleGrid
            articleGrid={articleGrid}
            setArticleGrid={setArticleGrid}
          />
        </CheckWord>
      </div>
      <div></div>
    </div>
  );
};

export default Verse;
