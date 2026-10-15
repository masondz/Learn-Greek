import { useState } from "react";
import { vocabListObj } from "../greek_text/vocabularyWords";
import StudySidebar from "../StudySidebar";

const categories = ["Most Common", "More Common", "Common"];

const descriptions = {
  "Most Common": "500+ occurrences",
  "More Common": "250-500 occurrences",
  Common: "50-250 occurrences",
};

const MenuVocabulary = ({ setDeck, setDeckIndex, setVocabList, setIsFlipped }) => {
  const [category, setCategory] = useState("");

  const handleSelect = (selectedCategory) => {
    setIsFlipped(false);
    const list = Object.keys(vocabListObj).filter((key) => {
      const frequency = Number(vocabListObj[key].frequency);
      if (selectedCategory === "Most Common") return frequency > 500;
      if (selectedCategory === "More Common") return frequency <= 500 && frequency > 250;
      return frequency < 250 && frequency > 49;
    });

    setDeckIndex(0);
    setDeck(list);
    setVocabList(list);
    setCategory(selectedCategory);
  };

  return (
    <StudySidebar currentPage="vocabulary">
      <section className="vocab-sidebar-decks" aria-label="Vocabulary decks">
        <h3>Vocabulary Decks</h3>
        {categories.map((option) => (
          <button
            type="button"
            key={option}
            className={`vocab-sidebar-deck${category === option ? " is-selected" : ""}`}
            aria-pressed={category === option}
            onClick={() => handleSelect(option)}
          >
            <span>{option}</span>
            <small>{descriptions[option]}</small>
          </button>
        ))}
      </section>
    </StudySidebar>
  );
};

export default MenuVocabulary;
