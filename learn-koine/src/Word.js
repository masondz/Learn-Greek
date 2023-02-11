import React, { useState } from "react";
import { isArticle } from "./features/wordSlice";
import { useDispatch, useSelector } from "react-redux";
import { incrementFoundArticles } from "./features/countSlice";
import { setParsingArticle } from "./features/parsingSlice";
import { selectParsingArticle } from "./features/parsingSlice";

const wrongPick = "\u2716";
const correctPick = "\u2713";

const Word = (props) => {
  const [indicator, setIndicator] = useState("o");
  const [highlight, setHighlight] = useState("");
  const articleParsingMode = useSelector(selectParsingArticle);
  const dispatch = useDispatch();

  const { blankGrid, setArticleGrid, word } = props;

  const handleClick = () => {
    if (highlight === "-highlight-correct" || articleParsingMode) {
      return;
    }
    if (word.partOfSpeech === "article") {
      setIndicator(correctPick);
      setHighlight("-highlight-correct");
      dispatch(incrementFoundArticles());
      dispatch(setParsingArticle(true));
    } else {
      setIndicator(wrongPick);
      setHighlight("-highlight-wrong");
    }
    dispatch(isArticle(word.word));
    setArticleGrid(blankGrid);
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
