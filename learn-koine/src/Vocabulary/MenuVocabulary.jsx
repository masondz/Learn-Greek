import { useEffect, useState } from "react";
import { vocabListObj } from "../greek_text/vocabularyWords";
import StudySidebar from "../StudySidebar";
import { bookVocabulary, commonVocabulary, getWordsForCategory } from "./VocabularyCategory";

const MenuVocabulary = ({ selectedCategory = null, setDeck, setDeckIndex, setVocabList, setIsFlipped, onDeckSelected }) => {
  const [category, setCategory] = useState(selectedCategory);
  const [selectedBook, setSelectedBook] = useState(selectedCategory?.type === "book" ? selectedCategory.bookName : "");

  useEffect(() => {
    setCategory(selectedCategory);
    setSelectedBook(selectedCategory?.type === "book" ? selectedCategory.bookName : "");
  }, [selectedCategory]);

  const selectDeck = (selectedCategory) => {
    const list = getWordsForCategory(selectedCategory, vocabListObj);
    setIsFlipped(false);
    setDeckIndex(0);
    setDeck(list);
    setVocabList(list);
    onDeckSelected?.(selectedCategory, list);
    setCategory(selectedCategory);
  };

  const handleRareBookChange = (event) => {
    const book = event.target.value;
    setSelectedBook(book);
    if (category?.type === "book") {
      const nextCategory = bookVocabulary.find((item) => item.bookName === book);
      if (nextCategory) selectDeck(nextCategory);
    }
  };

  const selectedBookCategory = bookVocabulary.find((item) => item.bookName === selectedBook) || null;

  return (
    <StudySidebar currentPage="vocabulary">
      <section className="vocab-sidebar-decks" aria-label="Vocabulary decks">
        <h3>Vocabulary Decks</h3>
        {commonVocabulary.map((categoryOption) => (
          <button
            type="button"
            key={categoryOption.id}
            className={`vocab-sidebar-deck${categoryOption.id === category?.id ? " is-selected" : ""}`}
            aria-pressed={categoryOption.id === category?.id}
            onClick={() => selectDeck(categoryOption)}
          >
            <span>{categoryOption.name}</span>
            <small>{categoryOption.description}</small>
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
          {bookVocabulary.map((bookCategory) => <option key={bookCategory.id} value={bookCategory.bookName}>{bookCategory.bookName}</option>)}
        </select>
        <button
          type="button"
          className={`vocab-sidebar-deck${category?.type === "book" ? " is-selected" : ""}`}
          aria-pressed={category?.type === "book" && category.bookName === selectedBook}
          onClick={() => selectedBookCategory && selectDeck(selectedBookCategory)}
          disabled={!selectedBookCategory}
        >
          <span>{selectedBook || "Choose a book deck"}</span>
          {selectedBookCategory && <small>{selectedBookCategory.getWords().length} headwords ({selectedBookCategory.description})</small>}
        </button>
      </section>
    </StudySidebar>
  );
};

export default MenuVocabulary;
