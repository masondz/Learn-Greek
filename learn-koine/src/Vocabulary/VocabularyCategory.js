import { bookRareWords, newTestamentBookNames } from "../greek_text/bookRareWords";

export class GeneralCategory {
  constructor({ id, name, rangeMin, rangeMax, description }) {
    this.id = id;
    this.type = "general";
    this.name = name;
    this.rangeMin = rangeMin;
    this.rangeMax = rangeMax;
    this.description = description;
  }

  includesFrequency(frequency) {
    return frequency >= this.rangeMin && (this.rangeMax == null || frequency <= this.rangeMax);
  }

  getWords(vocabulary) {
    return Object.keys(vocabulary).filter((word) =>
      this.includesFrequency(Number(vocabulary[word].frequency))
    );
  }
}

export class BookCategory {
  constructor(bookName) {
    this.id = `book:${encodeURIComponent(bookName)}:rare-25-49`;
    this.type = "book";
    this.bookName = bookName;
    this.name = bookName;
    this.description = "25–49 NT occurrences";
  }

  getWords() {
    return Object.keys(bookRareWords[this.bookName] || {});
  }

  getBookFrequency(word) {
    return bookRareWords[this.bookName]?.[word] ?? null;
  }
}

export const commonVocabulary = [
  new GeneralCategory({ id: "general:most-common", name: "Most Common", rangeMin: 500, description: "500+ occurrences" }),
  new GeneralCategory({ id: "general:more-common", name: "More Common", rangeMin: 250, rangeMax: 499, description: "250–499 occurrences" }),
  new GeneralCategory({ id: "general:common", name: "Common", rangeMin: 50, rangeMax: 249, description: "50–249 occurrences" }),
];

export const bookVocabulary = newTestamentBookNames.map((bookName) => new BookCategory(bookName));
export const vocabularyCategories = [...commonVocabulary, ...bookVocabulary];
const categoriesById = new Map(vocabularyCategories.map((category) => [category.id, category]));
const categoriesByLegacyName = new Map(vocabularyCategories.map((category) => [
  category.type === "book" ? `Rare in ${category.bookName}` : category.name,
  category,
]));

export const getVocabularyCategory = (categoryIdOrLegacyName) =>
  categoriesById.get(categoryIdOrLegacyName) || categoriesByLegacyName.get(categoryIdOrLegacyName) || null;

export const getCategoryId = (category) =>
  typeof category === "string" ? getVocabularyCategory(category)?.id || category : category?.id || "";

export const getWordsForCategory = (category, vocabulary) => {
  if (!category) return [];
  return category.type === "book" ? category.getWords() : category.getWords(vocabulary);
};
