import React, { useState } from "react";
import { setWord, isArticle } from "./features/wordSlice";
import { useDispatch } from "react-redux";
import { incrementFoundArticles } from "./features/countSlice";
import { setParsingArticle } from "./features/parsingSlice";
// import { selectParsingArticle } from "./features/parsingSlice";

const wrongPick = "\u2716";
const correctPick = "\u2713";

function removePunctuation(str) {  //this is from ChatpGPT
  const punctuationRegex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~˚“‘”’·ʼ]/g;
  // const diacriticsRegex = /[\u0300-\u036f]/g;
  // const greekLettersRegex = /[α-ωΑ-Ω]/g;

  const punctuationRemoved = str.replace(punctuationRegex, '');
  // const diacriticsKept = punctuationRemoved.replace(diacriticsRegex, (match) => match);
  // const greekLettersKept = diacriticsKept.replace(greekLettersRegex, (match) => match);

  return punctuationRemoved;
}

const Word = (props) => {
  const [indicator, setIndicator] = useState("o");
  const [highlight, setHighlight] = useState("");
  //   const articleParsingMode = useSelector(selectParsingArticle);
  const dispatch = useDispatch();

  const { blankGrid, setArticleGrid, word } = props;

  const handleClick = () => {
    // let parsing = wordUsages[word.word];
    // setParseInfo(parsing);
    // printThing();
    console.log(word.partOfSpeech)
    if (highlight === "-highlight-correct") {
      return;
    }
    if (word.partOfSpeech === "definite article") {
      setIndicator(correctPick);
      setHighlight("-highlight-correct");
      dispatch(incrementFoundArticles());
      dispatch(setParsingArticle(true));
    } else {
      setIndicator(wrongPick);
      setHighlight("-highlight-wrong");
    }
    setArticleGrid(blankGrid);
    dispatch(setWord(removePunctuation(word.word)))
    dispatch(isArticle(word.word));
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
