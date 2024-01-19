/*
set worth of correct and wrong in useEffect
increase/decrease in checWord function
*/

import "./Word.css";
import { randomChoicesSelection } from "./greek_text/parseLexicon";
import { selectWordSlice } from "./features/wordSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
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

const ConjuctionGrid = ({ reset }) => {
  const word = useSelector(selectWordSlice);
  const dispatch = useDispatch();
  const scoreObject = useSelector(selectScoreSlice);

  const guessArray = useMemo(() => {
    let array = [];
    if (word.parse.includes("Conjunction")) {
      array = randomChoicesSelection(
        greekConjunctions,
        greekConjunctions[word.word]
      );
      console.log(array);
      return array;
    }
  }, [word]);

  useEffect(() => {
    let caseOptions = document.getElementsByClassName("case-option");
    if (caseOptions) {
      for (let i = 0; i < caseOptions.length; i++) {
        caseOptions[i].className = "case-option";
      }
    }

    dispatch(setCorrectWorth(25));
    dispatch(setWrongWorth(5));
  }, [word, reset, dispatch]);

  const checkCase = (e) => {
    let choice = e.target.innerHTML;
    if (scoreObject.correctFound >= 1) {
      console.log("found enough correct");
      return;
    }
    if (choice === greekConjunctions[word.word]) {
      console.log("correct!");
      e.target.className = e.target.className + " correct";
      dispatch(increaseCorrect());
      dispatch(setCurrentScore(scoringFunction(scoreObject, "correct")));
    } else {
      console.log("wrong");
      dispatch(increaseWrong());
      dispatch(setCurrentScore(scoringFunction(scoreObject, "wrong")));
      e.target.className = e.target.className + " wrong";
    }
  };

  return (
    <div className="categories">
      <div className="cases-grid">
        {word.parse.includes("Conjunction") ? (
          guessArray.map((guess) => {
            return (
              <div
                className={"case-option"}
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
