import React, { useState } from "react";
import "./Vocabulary.css";
import { mostCommonObj, vocabListObj} from "./greek_text/vocabularyWords";
import ReactCardFlip from "react-card-flip";

let mostCKeys = Object.keys(mostCommonObj);


export default function Vocabulary() {
  console.log(vocabListObj)
  const [vocabList, setVocabList] = useState(["Pick Vocab List"]);
  const [deck, setDeck] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);
  // const [mode, setMode] = useState("");
  // const [learnedWords, setLearnedWords] = useState([])
  const [deckIndex, setDeckIndex] = useState(0);


  const handleSetList = (option) => {
    let list = {}
    if (option === "Most Common") {
      for( let key in vocabListObj) {
        if(Number(vocabListObj[key].frequency) > 500) {
          list[key] = vocabListObj[key]
        }
      }
      console.log(list)

      return list;
    }
  }

  const onClick = () => {
    isFlipped ? setIsFlipped(false) : setIsFlipped(true);
  };

  const handleNext = () => {
    if (isFlipped) {
      setIsFlipped(false);
    };
    setTimeout (() => {
     if (deckIndex + 1 > deck.length - 1) {
      setDeckIndex(0);
     } else {
      setDeckIndex(deckIndex + 1);
     }
    }, 301)   
  };

  const handlePrev = () => {
    if (isFlipped) {
      setIsFlipped(false);
    };
    setTimeout(() => {
     if (deckIndex - 1 < 0) {
      setDeckIndex(deck.length - 1);
     } else {
      setDeckIndex(deckIndex - 1);
     }
    }, 301);   
  };

  const addToLearnt = () => {
    //the word goes into learnt array
    if (isFlipped) {
      setIsFlipped(false);
    };
    setTimeout(() => {
     setDeck(deck.filter((word) => word !== deck[deckIndex]));
    console.log(deck);
    }, 301)  
  };

  const retryVocab = () => {
    setDeck(mostCKeys);
    setDeckIndex(0);
  };

  console.log(mostCommonObj);
  console.log(deck);

  return (
    <div className="body">
      <p onClick={() => handleSetList("Most Common")}>Most Common</p>
      <ReactCardFlip
        isFlipped={isFlipped}
        flipDirection="horizontal"
        className="card-container"
      >
        <div key="front" onClick={onClick} className="card-front">
          The Front
        </div>
        <div onClick={onClick} key="back" className="card-back">
          The Back
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
