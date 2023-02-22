import React, { useState } from "react";
import { setWord, isArticle } from "./features/wordSlice";
import { useDispatch, useSelector } from "react-redux";
import { incrementFoundArticles } from "./features/countSlice";
import { setParsingArticle } from "./features/parsingSlice";
import { selectVerseMode } from "./features/verseSlice";
// import { selectWordSlice } from "./features/wordSlice";
import { parseWord } from "./greek_text/parseLexicon";
// import { wordUsages } from "./greek_text/greekLexiconObject";
// import { selectParsingArticle } from "./features/parsingSlice";

const wrongPick = "\u2716";
const correctPick = "\u2713";

function removePunctuation(str) {  //this is from ChatpGPT
  const punctuationRegex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~˚“‘”’·ʼ]/g;
  const punctuationRemoved = str.replace(punctuationRegex, '');
  return punctuationRemoved;
}

const Word = (props) => {
  const [indicator, setIndicator] = useState("o");
  const [highlight, setHighlight] = useState("");
  // const [parsingMode, setParsingMode] = useState("definite article")
  const dispatch = useDispatch();
  const verseMode = useSelector(selectVerseMode)
  
  const { blankGrid, setArticleGrid, word } = props;
  // const checkWord = parseWord(word.word)

  const handleClick = () => {
    let wordData = parseWord(word.word)
    console.log(wordData)
    if(!wordData) {
      setIndicator(wrongPick);
      setHighlight("-highlight-wrong")
      dispatch(setWord(removePunctuation(word.word)))
      return;
    }
    if (highlight === "-highlight-correct") {
      return;
    }
    if (wordData.partOfSpeech === verseMode) {
      setIndicator(correctPick);
      setHighlight("-highlight-correct");
      dispatch(incrementFoundArticles());
      dispatch(setParsingArticle(true));
    } else {
      console.log(`checking versmode in Word: ${verseMode}`)
      console.log(`checking word.partOfSpeech in Word: ${word.partOfSpeech}`)
      console.log(`Are they Equal: ${word.partOfSpeech === verseMode}`)
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
