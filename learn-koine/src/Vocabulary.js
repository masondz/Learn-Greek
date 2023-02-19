import React, { useState } from "react";
import "./Vocabulary.css";
import { mostCommonObj } from "./greek_text/vocabularyWords";
import ReactCardFlip from "react-card-flip";

let mostCKeys = Object.keys(mostCommonObj);

export default function Vocabulary() {
  const [deck, setDeck] = useState(mostCKeys);
  const [isFlipped, setIsFlipped] = useState(false);
  // const [mode, setMode] = useState("");
  // const [learnedWords, setLearnedWords] = useState([])
  const [deckIndex, setDeckIndex] = useState(0);

  const onClick = () => {
    isFlipped ? setIsFlipped(false) : setIsFlipped(true);
  };

  const handleNext = () => {
    if (isFlipped) {
      setIsFlipped(false);
    };
    if (deckIndex + 1 > deck.length - 1) {
      setDeckIndex(0);
    } else {
      setDeckIndex(deckIndex + 1);
    }
  };

  const handlePrev = () => {
    if (isFlipped) {
      setIsFlipped(false);
    };
    if (deckIndex - 1 < 0) {
      setDeckIndex(deck.length - 1);
    } else {
      setDeckIndex(deckIndex - 1);
    }
  };

  const addToLearnt = () => {
    //the word goes into learnt array
    setDeck(deck.filter((word) => word !== deck[deckIndex]));
    console.log(deck);
  };

  const retryVocab = () => {
    setDeck(mostCKeys);
    setDeckIndex(0);
  };

  console.log(mostCommonObj);
  console.log(deck);

  return (
    <div className="body">
      <ReactCardFlip
        isFlipped={isFlipped}
        flipDirection="horizontal"
        className="card-container"
      >
        <div key="front" onClick={onClick} className="card-front">
          {deck[deckIndex]}
        </div>
        <div onClick={onClick} key="back" className="card-back">
          {mostCommonObj[deck[deckIndex]]}
        </div>
      </ReactCardFlip>
      <div className="card-buttons">
        <button className="button-vocabulary" onClick={handlePrev}>
          {"<"}
        </button>
        <button className="button-vocabulary" onClick={addToLearnt}>
          Learnt
        </button>
        <button className="button-vocabulary" onClick={retryVocab}>
          Retry
        </button>
        <button className="button-vocabulary" onClick={handleNext}>
          {">"}
        </button>
      </div>
    </div>
  );
}
