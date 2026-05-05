import React, { useState, useEffect } from "react";
import { setWord, setCurrentWordIndex } from "./features/wordSlice";
import { useDispatch, useSelector } from "react-redux";
import { incrementFoundArticles } from "./features/countSlice";
import { setParsingArticle } from "./features/parsingSlice";
import { selectVerseMode, setMode } from "./features/verseSlice";
import { parseWord } from "./greek_text/parseLexicon";
import {
  resetFoundWords,
  selectScoreSlice,
  setCurrentScore,
} from "./features/scoreSlice";
import { scoringFunction } from "./utils";
import ToolkitPopup from "./ToolkitPopup";

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

  const { blankGrid, setArticleGrid, word, reset, setReset, verseReference, setShowPopup, setPopupPosition, setPopupCallback, wordIndex, wordParsingState, setWordParsingState } =
    props;

  // Load saved state on mount or when wordParsingState changes
  useEffect(() => {
    const savedState = wordParsingState[wordIndex];
    if (savedState) {
      if (savedState.isCorrect) {
        setIndicator(correctPick);
        const modeStyleKey = savedState.selectedMode;
        setHighlight(`-highlight-correct ${styleMap[modeStyleKey]}`);
      } else {
        setIndicator(wrongPick);
        setHighlight("-highlight-wrong");
      }
    }
  }, [wordParsingState, wordIndex]);

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

  async function correctGuess(prevScoreObject, reference) {
    let { currentScore } = prevScoreObject;
    let newScoreObject = { currentScore, correctWorth: 10 };
    const newScore = await scoringFunction(newScoreObject, "correct", reference);
    return dispatch(setCurrentScore(newScore));
  }

  const handleClick = (e) => {
    e.stopPropagation();
    
    // Check if this word has already been parsed successfully
    const alreadyParsed = wordParsingState[wordIndex];
    
    // If word was already parsed correctly, just load the word data without showing popup
    if (alreadyParsed && alreadyParsed.isCorrect) {
      let wordData = parseWord(word.word);
      if (wordData) {
        dispatch(setWord(wordData));
        dispatch(setCurrentWordIndex(wordIndex));
        dispatch(setMode(alreadyParsed.selectedMode));
      }
      return;
    }

    // Close any existing popup first, then open new one
    setShowPopup(false);
    
    // Use setTimeout to ensure state updates properly
    setTimeout(() => {
      const rect = e.target.getBoundingClientRect();
      
      // Use viewport coordinates (no scroll offset needed for fixed positioning)
      setPopupPosition({
        x: rect.left,
        y: rect.bottom + 5
      });
      
      setPopupCallback(() => handleModeSelect);
      setShowPopup(true);
    }, 0);
  };

  const handleModeSelect = (selectedMode, modeId) => {
    setShowPopup(false);
    
    // Don't allow changing mode if already parsed correctly
    if (wordParsingState[wordIndex] && wordParsingState[wordIndex].isCorrect) {
      return;
    }
    
    let wordData = parseWord(word.word);
    dispatch(resetFoundWords());
    
    if (!wordData) {
      setIndicator(wrongPick);
      setHighlight("-highlight-wrong");
      dispatch(setWord(removePunctuation(word.word)));
      dispatch(setCurrentScore(scoreOjbect.currentScore - 2));
      
      // Save to session state
      setWordParsingState(prev => ({
        ...prev,
        [wordIndex]: {
          selectedMode: selectedMode,
          isCorrect: false
        }
      }));
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
    
    let isCorrect = false;
    
    if (selectedMode === "Noun and Adjective") {
      if (
        wordData.parse.includes("Noun") ||
        wordData.parse.includes("Adjective")
      ) {
        isCorrect = true;
      }
    } else if (selectedMode === "Pronoun") {
      if (wordData.parse.includes("pronoun")) {
        isCorrect = true;
      }
    } else if (wordData.parse.includes(selectedMode)) {
      isCorrect = true;
    }
    
    if (isCorrect) {
      setIndicator(correctPick);
      setHighlight(`-highlight-correct ${styleMap[selectedMode]}`);
      correctGuess(scoreOjbect, verseReference);
      dispatch(incrementFoundArticles());
      dispatch(setParsingArticle(true));
      dispatch(setMode(selectedMode));
      
      // Save to session state
      setWordParsingState(prev => ({
        ...prev,
        [wordIndex]: {
          selectedMode: selectedMode,
          isCorrect: true
        }
      }));
    } else {
      setIndicator(wrongPick);
      setHighlight("-highlight-wrong");
      dispatch(setCurrentScore(scoreOjbect.currentScore - 2));
      
      // Save to session state
      setWordParsingState(prev => ({
        ...prev,
        [wordIndex]: {
          selectedMode: selectedMode,
          isCorrect: false
        }
      }));
    }
    
    setArticleGrid(blankGrid);
    if (reset) {
      setReset(false);
    } else {
      setReset(true);
    }
    dispatch(setWord(wordData));
    dispatch(setCurrentWordIndex(wordIndex));
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
