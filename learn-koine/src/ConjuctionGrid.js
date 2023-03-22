import "./Word.css";
import { randomChoicesSelection } from "./greek_text/parseLexicon";
import { selectWordSlice } from "./features/wordSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { greekConjunctions } from "./greek_text/greekConjunctions";

const ConjuctionGrid = ({ reset }) => {
  const word = useSelector(selectWordSlice);
  let guessArray = [];

  if (word.parse.includes("Conjunction")) {
    guessArray = randomChoicesSelection(
      greekConjunctions,
      greekConjunctions[word.word]
    );
    console.log(guessArray);
  }

  useEffect(() => {
    let caseOptions = document.getElementsByClassName("case-option");
    if (caseOptions) {
      for (let i = 0; i < caseOptions.length; i++) {
        caseOptions[i].className = "case-option";
      }
    }
  }, [word, reset]);

  const checkCase = (e) => {
    let choice = e.target.innerHTML;
    if (choice === greekConjunctions[word.word]) {
      console.log("correct!");
      e.target.className = e.target.className + " correct";
    } else {
      console.log("wrong");
      e.target.className = e.target.className + " wrong";
    }
  };

  return (
    <div className="categories">
      <div className="cases-grid">
        {word.parse.includes("Conjunction") ? (
          guessArray.map((guess) => {
            return (
              <div className={"case-option"} onClick={(e) => checkCase(e)}>
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
