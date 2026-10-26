import { useEffect, useState } from "react";
import { vocabListObj } from "../greek_text/vocabularyWords";
import { bookRareWords, newTestamentBookNames } from "../greek_text/bookRareWords";
import StudySidebar from "../StudySidebar";

//const categories = ["Most Common", "More Common", "Common"];

function frequencyRange(frequency, min, max) {
  if (min === undefined && max === undefined) return false;
  if (min === undefined) return frequency <= max;
  if (max === undefined) return frequency >= min;
  return frequency >= min && frequency <= max;
}

class GeneralCategory {
  constructor(name, rangeMin, rangeMax, description, rangeExpression) {
    this.name = name;
    this.rangeMin = rangeMin;
    this.rangeMax = rangeMax;
    this.description = description;
    this.rangeExpression = rangeExpression
  }
}

const blankCat = new GeneralCategory("", null, null, "", frequencyRange);
const mostCommon = new GeneralCategory("Most Common", 500, undefined, "500+ occurrences", frequencyRange);
const moreCommon = new GeneralCategory("More Common", 250, 499, "250-499 occurrences", frequencyRange);
const common = new GeneralCategory("Common", 50, 249, "50-249 occurrences", frequencyRange);

const categoriesList = [mostCommon, moreCommon, common];

//const descriptions = {
//  "Most Common": "500+ occurrences",
//  "More Common": "250-500 occurrences",
//  Common: "50-250 occurrences",
//};

const MenuVocabulary = ({ selectedCategory = "", setDeck, setDeckIndex, setVocabList, setIsFlipped, onDeckSelected }) => {
  const [category, setCategory] = useState(blankCat);
  const [selectedBook, setSelectedBook] = useState("");

  useEffect(() => {
    setCategory(new GeneralCategory(name = selectedCategory));
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
      return selectedCategory.rangeExpression(frequency, selectedCategory.rangeMin, selectedCategory.rangeMax);
      //  if (selectedCategory.name === mostCommon.name) return frequency > mostCommon.frequency;
      //  if (selectedCategory.name === moreCommon.name) return frequency <= mostCommon.frequency && frequency > moreCommon.frequency;
      //  return frequency < moreCommon.frequency && frequency >= common.frequency;
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
    if (category.name.startsWith("Rare in ")) {
      const rareCategory = `Rare in ${book}`;
      const list = Object.keys(bookRareWords[book] || {});
      selectDeck(rareCategory, list);
    }
  };

  return (
    <StudySidebar currentPage="vocabulary">
      <section className="vocab-sidebar-decks" aria-label="Vocabulary decks">
        <h3>Vocabulary Decks</h3>
        {categoriesList.map((categoryOption) => (
          <button
            type="button"
            key={categoryOption.name}
            className={`vocab-sidebar-deck${categoryOption.name === category.name ? " is-selected" : ""}`}
            aria-pressed={categoryOption.name === category.name}
            onClick={() => handleSelect(categoryOption)}
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
          {newTestamentBookNames.map((book) => <option key={book} value={book}>{book}</option>)}
        </select>
        <button
          type="button"
          className={`vocab-sidebar-deck${category.name.startsWith("Rare in ") ? " is-selected" : ""}`}
          aria-pressed={category.name === `Rare in ${selectedBook}`}
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
