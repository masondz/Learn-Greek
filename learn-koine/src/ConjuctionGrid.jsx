import "./Word.css";
import { randomChoicesSelection } from "./greek_text/parseLexicon";
import { selectWordSlice, selectCurrentWordIndex } from "./features/wordSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { greekConjunctions } from "./greek_text/greekConjunctions";
import {
  selectScoreSlice,
  setCorrectWorth,
  setWrongWorth,
  setCurrentScore,
  increaseCorrect,
  increaseWrong,
} from "./features/scoreSlice";

import { scoringFunction } from "./utils";

const ConjuctionGrid = ({ reset, verseReference, wordParsingState, setWordParsingState }) => {
  const word = useSelector(selectWordSlice);
  const currentWordIndex = useSelector(selectCurrentWordIndex);
  const dispatch = useDispatch();
  const scoreObject = useSelector(selectScoreSlice);
  const [gridState, setGridState] = useState({});

  const guessArray = useMemo(() => {
    let array = [];
    if (word.parse.includes("Conjunction")) {
      array = randomChoicesSelection(
        greekConjunctions,
        greekConjunctions[word.word]
      );
      return array;
    }
  }, [word]);

  useEffect(() => {
    dispatch(setCorrectWorth(25));
    dispatch(setWrongWorth(5));
    
    // Restore grid state from wordParsingState
    if (currentWordIndex !== null && wordParsingState[currentWordIndex]?.gridSelections) {
      setGridState(wordParsingState[currentWordIndex].gridSelections);
    } else {
      setGridState({});
    }
  }, [word, reset, dispatch, currentWordIndex, wordParsingState]);

  const checkCase = async (e) => {
    let choice = e.target.innerHTML;
    if (scoreObject.correctFound >= 1) {
      return;
    }
    
    if (e.target.className.includes("correct") || e.target.className.includes("wrong")) {
      return;
    }
    
    let newClass = "";
    
    if (choice === greekConjunctions[word.word]) {
      newClass = " correct";
      e.target.className = e.target.className + newClass;
      dispatch(increaseCorrect());
      const newScore = await scoringFunction(scoreObject, "correct", verseReference);
      dispatch(setCurrentScore(newScore));
    } else {
      dispatch(increaseWrong());
      const newScore = await scoringFunction(scoreObject, "wrong");
      dispatch(setCurrentScore(newScore));
      newClass = " wrong";
      e.target.className = e.target.className + newClass;
    }
    
    // Save grid state
    const newGridState = { ...gridState, [choice]: newClass };
    setGridState(newGridState);
    
    if (currentWordIndex !== null) {
      setWordParsingState(prev => ({
        ...prev,
        [currentWordIndex]: {
          ...prev[currentWordIndex],
          gridSelections: newGridState
        }
      }));
    }
  };

  return (
    <div className="categories">
      <div className="cases-grid">
        {word.parse.includes("Conjunction") ? (
          guessArray.map((guess) => {
            return (
              <div
                className={"case-option" + (gridState[guess] || "")}
                onClick={(e) => checkCase(e)}
                key={guess}
              >
                {guess}
              </div>
            );
          })
        ) : (
          <>
            <div className={"case-option"}>Pick</div>
            <div className={"case-option"}>A</div>
            <div className={"case-option"}>Conjunction</div>
            <div className={"case-option"}>☺</div>
          </>
        )}
      </div>
    </div>
  );
};

export default ConjuctionGrid;
