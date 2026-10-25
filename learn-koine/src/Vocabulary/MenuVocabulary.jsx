import { useEffect, useState } from "react";
import { vocabListObj } from "../greek_text/vocabularyWords";
import { bookRareWords, newTestamentBookNames } from "../greek_text/bookRareWords";
import StudySidebar from "../StudySidebar";

const categories = ["Most Common", "More Common", "Common"];

const descriptions = {
  "Most Common": "500+ occurrences",
  "More Common": "250-500 occurrences",
  Common: "50-250 occurrences",
};

const MenuVocabulary = ({ selectedCategory = "", setDeck, setDeckIndex, setVocabList, setIsFlipped, onDeckSelected }) => {
  const [category, setCategory] = useState("");
  const [selectedBook, setSelectedBook] = useState("");

  useEffect(() => {
    setCategory(selectedCategory);
    setSelectedBook(selectedCategory.startsWith("Rare in ") ? selectedCategory.slice("Rare in ".length) : "");
  }, [selectedCategory]);

  const selectDeck = (selectedCategory, list) => {
    setIsFlipped(false);
    setDeckIndex(0);
    setDeck(list);
    setVocabList(list);
    onDeckSelected?.(selectedCategory, list);
    setCategory(selectedCategory);
  };

  const handleSelect = (selectedCategory) => {
    const list = Object.keys(vocabListObj).filter((key) => {
      const frequency = Number(vocabListObj[key].frequency);
      if (selectedCategory === "Most Common") return frequency > 500;
      if (selectedCategory === "More Common") return frequency <= 500 && frequency > 250;
      return frequency < 250 && frequency > 49;
    });
    selectDeck(selectedCategory, list);
  };

  const handleRareBookSelect = () => {
    if (!selectedBook) return;
    const rareCategory = `Rare in ${selectedBook}`;
    const list = Object.keys(bookRareWords[selectedBook] || {});
    selectDeck(rareCategory, list);
  };

  const handleRareBookChange = (event) => {
    const book = event.target.value;
    if (!book) return;
    setSelectedBook(book);
    if (category.startsWith("Rare in ")) {
      const rareCategory = `Rare in ${book}`;
      const list = Object.keys(bookRareWords[book] || {});
      selectDeck(rareCategory, list);
    }
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
        <h3 className="vocab-sidebar-subheading">Rare words by book</h3>
        <label className="vocab-sidebar-book-label" htmlFor="rare-word-book">New Testament book</label>
        <select
          id="rare-word-book"
          className="vocab-sidebar-book-select"
          value={selectedBook}
          onChange={handleRareBookChange}
        >
          <option value="">Choose a book</option>
          {newTestamentBookNames.map((book) => <option key={book} value={book}>{book}</option>)}
        </select>
        <button
          type="button"
          className={`vocab-sidebar-deck${category.startsWith("Rare in ") ? " is-selected" : ""}`}
          aria-pressed={category === `Rare in ${selectedBook}`}
          onClick={handleRareBookSelect}
          disabled={!selectedBook}
        >
          <span>{selectedBook ? `Rare in ${selectedBook}` : "Choose a rare word deck"}</span>
          {selectedBook && <small>{Object.keys(bookRareWords[selectedBook] || {}).length} headwords (25–49 NT occurrences)</small>}
        </button>
      </section>
    </StudySidebar>
  );
};

export default MenuVocabulary;
