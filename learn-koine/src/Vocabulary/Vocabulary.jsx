import { useEffect, useRef, useState } from "react";
import "./Vocabulary.css";
import { vocabListObj } from "../greek_text/vocabularyWords";
import ReactCardFlip from "react-card-flip";
import MenuVocabulary from "./MenuVocabulary";
import HelpTool from "../ParsingPractice/HelpTool.jsx";
import {
  readVocabularyProgress,
  saveGuestResumeLocation,
  saveVocabularyProgress,
} from "../guestProgress";
import ConfirmModal from "./ConfirmModal";
import { useAuth } from "../AuthContext";

const deckCategories = ["Most Common", "More Common", "Common"];

const getWordsForCategory = (category) => Object.keys(vocabListObj).filter((key) => {
  const frequency = Number(vocabListObj[key].frequency);
  if (category === "Most Common") return frequency > 500;
  if (category === "More Common") return frequency <= 500 && frequency > 250;
  return frequency < 250 && frequency > 49;
});

export default function Vocabulary() {
  const { user } = useAuth();
  const username = user?.username || null;
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
  const [category, setCategory] = useState("");
  const [deckProgress, setDeckProgress] = useState({});
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [gestureExit, setGestureExit] = useState("");
  const gestureStart = useRef(null);
  const gestureAxis = useRef(null);
  const suppressCardClick = useRef(false);
  const activeDeck = isLearnedDeckActive ? learnedDeck : deck;
  const currentWord = activeDeck[deckIndex];
  const gestureCue = Math.abs(dragOffset.x) >= 75
    ? (dragOffset.x < 0 ? "Next" : "Previous")
    : dragOffset.y >= 75
      ? (isLearnedDeckActive ? "↓ Unlearn" : "↓ Learned")
      : "";

  useEffect(() => {
    const saved = readVocabularyProgress(username);
    const savedDecks = saved.decks || {};
    const normalizedDecks = Object.fromEntries(deckCategories.map((deckCategory) => {
      const words = getWordsForCategory(deckCategory);
      const learnedSet = new Set((savedDecks[deckCategory]?.learned || []).filter((word) => words.includes(word)));
      return [deckCategory, {
        learned: words.filter((word) => learnedSet.has(word)),
        unlearned: words.filter((word) => !learnedSet.has(word)),
      }];
    }));
    setDeckProgress(normalizedDecks);
    const savedCategory = deckCategories.includes(saved.category) ? saved.category : "";
    setCategory(savedCategory);
    if (savedCategory) {
      const words = getWordsForCategory(savedCategory);
      const learned = normalizedDecks[savedCategory].learned;
      setVocabList(words);
      setDeck(normalizedDecks[savedCategory].unlearned);
      setLearnedDeck(learned);
      setIsLearnedDeckActive(false);
      setDeckIndex(0);
      setIsFlipped(false);
    }
    setProgressLoaded(true);
  }, [username]);
  useEffect(() => {
    if (progressLoaded) saveVocabularyProgress(username, { decks: deckProgress, category });
  }, [username, deckProgress, category, progressLoaded]);

  const handleDeckSelected = (selectedCategory, words) => {
    const savedLearned = new Set(deckProgress[selectedCategory]?.learned || []);
    const learned = words.filter((word) => savedLearned.has(word));
    const unlearned = words.filter((word) => !savedLearned.has(word));
    setDeckProgress((previous) => ({ ...previous, [selectedCategory]: { learned, unlearned } }));
    setCategory(selectedCategory);
    setDeck(unlearned);
    setLearnedDeck(learned);
    setIsLearnedDeckActive(false);
    setDeckIndex(0);
    setIsFlipped(false);
  };

  const onClick = () => {
    if (suppressCardClick.current) {
      suppressCardClick.current = false;
      return;
    }
    isFlipped ? setIsFlipped(false) : setIsFlipped(true);
  };

  const handlePointerDown = (event) => {
    if (!currentWord || event.button > 0) return;
    gestureStart.current = { x: event.clientX, y: event.clientY, pointerId: event.pointerId };
    gestureAxis.current = null;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!gestureStart.current || gestureStart.current.pointerId !== event.pointerId) return;
    const x = event.clientX - gestureStart.current.x;
    const y = event.clientY - gestureStart.current.y;
    if (!gestureAxis.current && Math.max(Math.abs(x), Math.abs(y)) > 12) {
      gestureAxis.current = Math.abs(x) > Math.abs(y) ? "horizontal" : "vertical";
    }
    const maxTravel = 140;
    setDragOffset(gestureAxis.current === "horizontal"
      ? { x: Math.max(-maxTravel, Math.min(maxTravel, x)), y: 0 }
      : gestureAxis.current === "vertical"
        ? { x: 0, y: Math.max(0, Math.min(maxTravel, y)) }
        : { x: 0, y: 0 });
  };

  const cancelPointerGesture = (event) => {
    if (!gestureStart.current || gestureStart.current.pointerId !== event.pointerId) return;
    gestureStart.current = null;
    gestureAxis.current = null;
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  };

  const finishPointerGesture = (event) => {
    if (!gestureStart.current || gestureStart.current.pointerId !== event.pointerId) return;
    const { x, y } = dragOffset;
    const isHorizontalSwipe = Math.abs(x) >= 75 && Math.abs(x) > Math.abs(y) * 1.2;
    const isDownwardSwipe = y >= 75 && y > Math.abs(x) * 1.2;
    gestureStart.current = null;
    gestureAxis.current = null;
    setIsDragging(false);
    if (!isHorizontalSwipe && !isDownwardSwipe) {
      setDragOffset({ x: 0, y: 0 });
      suppressCardClick.current = true;
      window.setTimeout(() => { suppressCardClick.current = false; }, 300);
      setIsFlipped((flipped) => !flipped);
      return;
    }
    suppressCardClick.current = true;
    window.setTimeout(() => { suppressCardClick.current = false; }, 300);
    setIsFlipped(false);
    if (isHorizontalSwipe) {
      const direction = x < 0 ? "next" : "previous";
      setGestureExit(direction);
      window.setTimeout(() => {
        setGestureExit("");
        setDragOffset({ x: 0, y: 0 });
        direction === "next" ? handleNext() : handlePrev();
      }, 180);
    } else {
      setGestureExit("reclassify");
      addToLearnt();
      window.setTimeout(() => {
        setGestureExit("");
        setDragOffset({ x: 0, y: 0 });
      }, 220);
    }
  };

  const cardGestureProps = {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: finishPointerGesture,
    onPointerCancel: cancelPointerGesture,
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
      const becomingLearned = !isLearnedDeckActive;
      setDeckProgress((previous) => {
        const state = previous[category] || { learned: [], unlearned: vocabList };
        return {
          ...previous, [category]: {
            learned: becomingLearned ? [...new Set([...state.learned, currentWord])] : state.learned.filter((word) => word !== currentWord),
            unlearned: becomingLearned ? state.unlearned.filter((word) => word !== currentWord) : [...new Set([...state.unlearned, currentWord])],
          }
        };
      });
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
    if (category) {
      setDeckProgress((previous) => ({ ...previous, [category]: { learned: [], unlearned: vocabList } }));
    }
    setDeckIndex(0);
    setIsLearnedDeckActive(false);
    setIsFlipped(false);
    setShowRetryConfirmation(false);
  };

  return (
    <div className="vocab-component">
      <MenuVocabulary
        selectedCategory={category}
        setDeck={setDeck}
        setDeckIndex={setDeckIndex}
        setVocabList={setVocabList}
        setIsFlipped={setIsFlipped}
        onDeckSelected={handleDeckSelected}
      />

      <div className="vocab-container">
        <div
          className={`vocab-card-drag-wrapper${isDragging ? " is-dragging" : ""}${gestureExit ? ` is-exiting-${gestureExit}` : ""}`}
          style={{
            transform: `translate(${dragOffset.x}px, ${dragOffset.y}px)`,
            transition: isDragging ? "none" : undefined,
          }}
        >
          <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <div key="front" onClick={onClick} {...cardGestureProps} className="card-front vocab-card">
              <div className="category-name">{category}</div>
              {currentWord || "Pick Vocabulary List"}
              {isDragging && gestureCue && <span className="gesture-cue">{gestureCue}</span>}
            </div>
            <div onClick={onClick} key="back" {...cardGestureProps} className="card-back vocab-card">
              {vocabListObj[currentWord]
                ? vocabListObj[currentWord].english
                : "Pick Vocabulary List"}
              {isDragging && gestureCue && <span className="gesture-cue">{gestureCue}</span>}
            </div>
          </ReactCardFlip>
        </div>
        <p className="vocab-gesture-instructions">
          Swipe right or left to change cards. Drag down to mark learned or unlearned.
        </p>

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
