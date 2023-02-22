import React, { useState } from "react";
import "./Vocabulary.css";
import { vocabListObj } from "./greek_text/vocabularyWords";
import ReactCardFlip from "react-card-flip";


export default function Vocabulary() {
  console.log(vocabListObj)
  const [vocabList, setVocabList] = useState({});
  const [deck, setDeck] = useState(["Pick Vocab List"]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [deckIndex, setDeckIndex] = useState(0);
  const [mostCommonStyle, setMostCommonStyle] = useState("vocab-button");
  const [moreCommonStyle, setMoreCommonStyle] = useState("vocab-button");
  const [commonStyle, setCommonStyle] = useState("vocab-button");

  const highlightStyle = "highlighted-option";

  const resetStyles = () => {
    setMostCommonStyle("vocab-button");
    setMoreCommonStyle("vocab-button");
    setCommonStyle("vocab-button");
  }

  const handleSetList = (option) => {
    let list = {}
    switch (option) {
      case "Most Common":
        for( let key in vocabListObj) {
          if(Number(vocabListObj[key].frequency) > 500) {
              list[key] = vocabListObj[key]
          }
        }
        setDeck(Object.keys(list))
        setVocabList(Object.keys(list))
        resetStyles();
        setMostCommonStyle(highlightStyle);
        break;
      case "More Common":
        for( let key in vocabListObj) {
          if(Number(vocabListObj[key].frequency) < 500 && Number(vocabListObj[key].frequency > 250)) {
              list[key] = vocabListObj[key]
          }
        }
        resetStyles();
        setMoreCommonStyle(highlightStyle)
        setDeck(Object.keys(list))
        setVocabList(Object.keys(list))
        break;
      case "Common":
        for( let key in vocabListObj) {
          if(Number(vocabListObj[key].frequency) < 250 && Number(vocabListObj[key].frequency > 49)) {
              list[key] = vocabListObj[key]
          }
        }
        resetStyles();
        setCommonStyle(highlightStyle)
        setDeck(Object.keys(list))
        setVocabList(Object.keys(list))
        break;  
      default:
        setDeck(["Pick Vocabulary List"])
        setVocabList({})
        break;
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
    }, 150)   
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
    }, 150);   
  };

  const addToLearnt = () => {
    //the word goes into learnt array
    if (isFlipped) {
      setIsFlipped(false);
    };
    setTimeout(() => {
     setDeck(deck.filter((word) => word !== deck[deckIndex]));
    console.log(deck);
    }, 150)  
  };

  const retryVocab = () => {
    setDeck(vocabList);
    setDeckIndex(0);
  };

  return (
    <div className="body">
      <div className={"vocab-options"}>
        <button className={mostCommonStyle} onClick={() => handleSetList("Most Common")}><p>Most Common</p></button>
        <button className={moreCommonStyle} onClick={() => handleSetList("More Common")}><p>More Common</p></button>
        <button className={commonStyle} onClick={() => handleSetList("Common")}><p>Common</p></button>
      </div>
      <ReactCardFlip
        isFlipped={isFlipped}
        flipDirection="horizontal"
        className="card-container"
      >
        <div key="front" onClick={onClick} className="card-front">
          {deck[deckIndex]}
        </div>
        <div onClick={onClick} key="back" className="card-back">
          {vocabListObj[deck[deckIndex]] ? vocabListObj[deck[deckIndex]].english : "Pick Vocabulary List"}
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