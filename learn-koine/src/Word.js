import React, { useState } from "react";
import { setWord } from "./features/wordSlice";
import { useDispatch, useSelector } from "react-redux";
import { incrementFoundArticles } from "./features/countSlice";
import { setParsingArticle } from "./features/parsingSlice";
import { selectVerseMode } from "./features/verseSlice";
import { parseWord } from "./greek_text/parseLexicon";
import {
  resetFoundWords,
  selectScoreSlice,
  setCurrentScore,
} from "./features/scoreSlice";
import { scoringFunction } from "./utils";

const wrongPick = "\u2716";
const correctPick = "\u2713";

function removePunctuation(str) {
  //this is from ChatpGPT
  const punctuationRegex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~˚“‘”’·ʼ]/g;
  const punctuationRemoved = str.replace(punctuationRegex, "");
  return punctuationRemoved;
}

const Word = (props) => {
  const [indicator, setIndicator] = useState("o");
  const [highlight, setHighlight] = useState("");
  const dispatch = useDispatch();
  const verseMode = useSelector(selectVerseMode);
  const scoreOjbect = useSelector(selectScoreSlice);

  const { blankGrid, setArticleGrid, word, reset, setReset, verseReference } =
    props;

  const styleMap = {
    "definite article": "da",
    Conjunction: "conj",
    Preposition: "prep",
    "Noun and Adjective": "na",
    Pronoun: "pron",
    Verb: "vrb",
    Particle: "prt",
    Adverb: "adv",
  };

  function correctGuess(prevScoreObject, reference) {
    let { currentScore } = prevScoreObject;
    let newScoreObject = { currentScore, correctWorth: 10 };
    return dispatch(
      setCurrentScore(scoringFunction(newScoreObject, "correct", reference))
    );
  }

  const handleClick = () => {
    let wordData = parseWord(word.word);
    dispatch(resetFoundWords());
    if (!wordData) {
      setIndicator(wrongPick);
      setHighlight("-highlight-wrong");
      dispatch(setWord(removePunctuation(word.word)));
      dispatch(setCurrentScore(scoreOjbect.currentScore - 2));
      return;
    }
    if (highlight.includes("-highlight-correct")) {
      return;
    }
    if (
      wordData.parse.includes("Interjection") ||
      wordData.parse.includes("Hebrew transliterated word (indeclinable)")
    ) {
      setHighlight("-highlight-odd");
      setIndicator(correctPick);
      correctGuess(scoreOjbect, verseReference);
      dispatch(setWord(wordData));
      return;
    }
    if (verseMode === "Noun and Adjective") {
      if (
        wordData.parse.includes("Noun") ||
        wordData.parse.includes("Adjective")
      ) {
        setIndicator(correctPick);
        setHighlight(`-highlight-correct ${styleMap[verseMode]}`);
        dispatch(incrementFoundArticles());
        correctGuess(scoreOjbect, verseReference);
        dispatch(setParsingArticle(true));
      } else {
        setIndicator(wrongPick);
        setHighlight("-highlight-wrong");
        dispatch(setCurrentScore(scoreOjbect.currentScore - 2));
      }
    } else if (verseMode === "Pronoun") {
      if (wordData.parse.includes("pronoun")) {
        setIndicator(correctPick);
        correctGuess(scoreOjbect, verseReference);
        setHighlight(`-highlight-correct ${styleMap[verseMode]}`);
      } else {
        setIndicator(wrongPick);
        setHighlight("-highlight-wrong");
        dispatch(setCurrentScore(scoreOjbect.currentScore - 2));
      }
    } else if (wordData.parse.includes(verseMode)) {
      setIndicator(correctPick);
      setHighlight(`-highlight-correct ${styleMap[verseMode]}`);
      correctGuess(scoreOjbect, verseReference);
      dispatch(incrementFoundArticles());
      dispatch(setParsingArticle(true));
    } else if (!wordData.parse.includes(verseMode)) {
      setIndicator(wrongPick);
      setHighlight("-highlight-wrong");
      dispatch(setCurrentScore(scoreOjbect.currentScore - 2));
    }
    setArticleGrid(blankGrid);
    if (reset) {
      setReset(false);
    } else {
      setReset(true);
    }
    dispatch(setWord(wordData));
  };

  return (
    <div className={"verse-word" + highlight}>
      <p className={"indicator" + highlight}>{indicator}</p>
      <p className="inner-word" name={word.word} onClick={handleClick}>
        {word.word}
      </p>
    </div>
  );
};

export default Word;
