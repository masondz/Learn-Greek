import { useEffect, useState } from "react";
import "./Vocabulary.css";
import { vocabListObj } from "../greek_text/vocabularyWords";
import ReactCardFlip from "react-card-flip";
import MenuVocabulary from "./MenuVocabulary";
import HelpTool from "../ParsingPractice/HelpTool.jsx";
import { saveGuestResumeLocation } from "../guestProgress";
import ConfirmModal from "./ConfirmModal";

export default function Vocabulary() {
  useEffect(() => {
    saveGuestResumeLocation("/vocabulary");
  }, []);
  const [vocabList, setVocabList] = useState({});
  const [deck, setDeck] = useState(["Pick Vocab List"]);
  const [learnedDeck, setLearnedDeck] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLearnedDeckActive, setIsLearnedDeckActive] = useState(false);
  const [deckIndex, setDeckIndex] = useState(0);
  const [showRetryConfirmation, setShowRetryConfirmation] = useState(false);
  const activeDeck = isLearnedDeckActive ? learnedDeck : deck;
  const currentWord = activeDeck[deckIndex];

  const onClick = () => {
    isFlipped ? setIsFlipped(false) : setIsFlipped(true);
  };

  const handleNext = () => {
    if (!activeDeck.length) return;
    if (isFlipped) {
      setIsFlipped(false);
    }
    setTimeout(() => {
      if (deckIndex + 1 > activeDeck.length - 1) {
        setDeckIndex(0);
      } else {
        setDeckIndex(deckIndex + 1);
      }
    }, 150);
  };

  const handlePrev = () => {
    if (!activeDeck.length) return;
    if (isFlipped) {
      setIsFlipped(false);
    }
    setTimeout(() => {
      if (deckIndex - 1 < 0) {
        setDeckIndex(activeDeck.length - 1);
      } else {
        setDeckIndex(deckIndex - 1);
      }
    }, 150);
  };

  const addToLearnt = () => {
    if (isFlipped) {
      setIsFlipped(false);
    }
    setTimeout(() => {
      if (!currentWord) return;
      if (isLearnedDeckActive) {
        setLearnedDeck((words) => words.filter((word) => word !== currentWord));
        setDeck((words) => words.includes(currentWord) ? words : [...words, currentWord]);
      } else {
        setDeck((words) => words.filter((word) => word !== currentWord));
        setLearnedDeck((words) => words.includes(currentWord) ? words : [...words, currentWord]);
      }
      setDeckIndex((index) => Math.min(index, Math.max(0, activeDeck.length - 2)));
    }, 150);
  };

  const toggleLearnedUnlearnedDeck = () => {
    setIsLearnedDeckActive((active) => !active);
    setDeckIndex(0);
    setIsFlipped(false);
  };

  const retryVocab = () => {
    setDeck(vocabList);
    setLearnedDeck([]);
    setDeckIndex(0);
    setIsLearnedDeckActive(false);
    setIsFlipped(false);
    setShowRetryConfirmation(false);
  };

  return (
    <div className="vocab-component">
      <MenuVocabulary
        setDeck={setDeck}
        setDeckIndex={setDeckIndex}
        setVocabList={setVocabList}
        setIsFlipped={setIsFlipped}
      />

      <div className="vocab-container">
        <ReactCardFlip
          isFlipped={isFlipped}
          flipDirection="horizontal"
          className="card-container"
        >
          <div key="front" onClick={onClick} className="card-front">
            {currentWord || "Pick Vocabulary List"}
          </div>
          <div onClick={onClick} key="back" className="card-back">
            {vocabListObj[currentWord]
              ? vocabListObj[currentWord].english
              : "Pick Vocabulary List"}
          </div>
        </ReactCardFlip>

        <div className="card-buttons">
          <button className="button-vocabulary" onClick={handlePrev}>
            {"<"}
          </button>
          <button className="button-vocabulary" onClick={addToLearnt} disabled={!currentWord}>
            {isLearnedDeckActive ? "Unlearn" : "Learnt"}
          </button>
          <button
            className="button-vocabulary"
            onClick={() => setShowRetryConfirmation(true)}
          >
            Retry
          </button>
          <button className="button-vocabulary" onClick={handleNext} disabled={!currentWord}>
            {">"}
          </button>
        </div>
        <div>
          <p>
            {vocabList.length
              ? `Cards in ${isLearnedDeckActive ? "learned" : "unlearned"} deck: ${activeDeck.length}`
              : ""}
          </p>
        </div>
        <button className="button-vocabulary" onClick={toggleLearnedUnlearnedDeck}>
          {isLearnedDeckActive ? "View unlearned" : "View learned"}
        </button>
      </div>
      {showRetryConfirmation && (
          <ConfirmModal
            title="Retry this deck?"
            message="This will reset the current deck and start again from the first card."
            confirmLabel="Retry deck"
            onConfirm={retryVocab}
            onCancel={() => setShowRetryConfirmation(false)}
          />
      )}
      <HelpTool pageName={"vocabulary-help"} />
    </div >
  );
}
