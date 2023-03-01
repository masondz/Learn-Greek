import React, { useState } from "react";
import "./Vocabulary.css";
import { vocabListObj } from "./greek_text/vocabularyWords";
import ReactCardFlip from "react-card-flip";
import MenuVocabulary from "./MenuVocabulary";

export default function Vocabulary() {
  const [vocabList, setVocabList] = useState({});
  const [deck, setDeck] = useState(["Pick Vocab List"]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [deckIndex, setDeckIndex] = useState(0);


  const onClick = () => {
    isFlipped ? setIsFlipped(false) : setIsFlipped(true);
  };

  const handleNext = () => {
    if (isFlipped) {
      setIsFlipped(false);
    }
    setTimeout(() => {
      if (deckIndex + 1 > deck.length - 1) {
        setDeckIndex(0);
      } else {
        setDeckIndex(deckIndex + 1);
      }
    }, 150);
  };

  const handlePrev = () => {
    if (isFlipped) {
      setIsFlipped(false);
    }
    setTimeout(() => {
      if (deckIndex - 1 < 0) {
        setDeckIndex(deck.length - 1);
      } else {
        setDeckIndex(deckIndex - 1);
      }
    }, 150);
  };

  const addToLearnt = () => {
    //the word goes into learnt array
    if (isFlipped) {
      setIsFlipped(false);
    }
    setTimeout(() => {
      setDeck(deck.filter((word) => word !== deck[deckIndex]));
      console.log(deck);
    }, 150);
  };

  const retryVocab = () => {
    setDeck(vocabList);
    setDeckIndex(0);
  };

  return (
    <div className="body">
      
      <MenuVocabulary setDeck={setDeck} setDeckIndex={setDeckIndex} setVocabList={setVocabList} setIsFlipped={setIsFlipped}/>
      
      <div className="vocab-container">
      <ReactCardFlip
        isFlipped={isFlipped}
        flipDirection="horizontal"
        className="card-container"
        >
        <div key="front" onClick={onClick} className="card-front">
          {deck[deckIndex]}
        </div>
        <div onClick={onClick} key="back" className="card-back">
          {vocabListObj[deck[deckIndex]]
            ? vocabListObj[deck[deckIndex]].english
            : "Pick Vocabulary List"}
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
      <div>
        <p>
          {deck[0] !== "Pick Vocab List" ? `Cards in deck: ${deck.length}` : ""}
        </p>
      </div>
      </div>
    </div>
  );
}
