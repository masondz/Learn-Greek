import { useEffect, useState } from "react";
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
  const activeDeck = isLearnedDeckActive ? learnedDeck : deck;
  const currentWord = activeDeck[deckIndex];

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
        <ReactCardFlip
          isFlipped={isFlipped}
          flipDirection="horizontal"
          className="card-container"
        >
          <div key="front" onClick={onClick} className="card-front">
            <div className="category-name">{category}</div>
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
