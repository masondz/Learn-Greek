import React, { useState } from "react";
import { setWord } from "./features/wordSlice";
import { useDispatch, useSelector } from "react-redux";
import { incrementFoundArticles } from "./features/countSlice";
import { setParsingArticle } from "./features/parsingSlice";
import { selectVerseMode } from "./features/verseSlice";
import { parseWord } from "./greek_text/parseLexicon";

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

  const { blankGrid, setArticleGrid, word, reset, setReset } = props;

  const handleClick = () => {
    let wordData = parseWord(word.word);
    if (!wordData) {
      setIndicator(wrongPick);
      setHighlight("-highlight-wrong");
      dispatch(setWord(removePunctuation(word.word)));
      return;
    }
    if (highlight === "-highlight-correct") {
      return;
    }
    if (verseMode === "Noun and Adjective") {
      if (
        wordData.parse.includes("Noun") ||
        wordData.parse.includes("Adjective")
      ) {
        setIndicator(correctPick);
        setHighlight("-highlight-correct");
        dispatch(incrementFoundArticles());
        dispatch(setParsingArticle(true));
      } else {
        setIndicator(wrongPick);
        setHighlight("-highlight-wrong");
      }
    } else if (verseMode === "Pronoun") {
      if (wordData.parse.includes("pronoun")) {
        setIndicator(correctPick);
        setHighlight("-highlight-correct");
      } else {
        setIndicator(wrongPick);
        setHighlight("-highlight-wrong");
      }
    } else if (wordData.parse.includes(verseMode)) {
      setIndicator(correctPick);
      setHighlight("-highlight-correct");
      dispatch(incrementFoundArticles());
      dispatch(setParsingArticle(true));
    } else if (!wordData.parse.includes(verseMode)) {
      setIndicator(wrongPick);
      setHighlight("-highlight-wrong");
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
