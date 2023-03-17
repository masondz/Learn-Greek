import React, { useState } from "react";
import "./Word.css";
import { randomConjuctionSelection } from "./greek_text/parseLexicon";
import { selectWordSlice } from "./features/wordSlice";
import { useSelector } from "react-redux";

const checkCase = (e) => {
  e.preventDefault();
  console.log(e.target.innerHTML);
};

const ConjuctionGrid = () => {
  const word = useSelector(selectWordSlice);
  const [guessArray] = useState([]);
  console.log(word);
  let someArray = [];
  if (word.partOfSpeech !== null) {
    if (word.partOfSpeech.includes("Conjunction")) {
      let gloss = word.gloss;
      someArray = randomConjuctionSelection(gloss);
      console.log(someArray);
    }
  }
  return (
    <div className="categories">
      <div className="cases">
        <div className={"case-option"} onClick={(e) => checkCase(e)}>
          {guessArray.length > 0
            ? "Testing Coming Soon"
            : "Testing Coming Soon!"}
        </div>
      </div>
    </div>
  );
};

export default ConjuctionGrid;
