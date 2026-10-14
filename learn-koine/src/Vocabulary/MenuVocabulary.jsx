import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { vocabListObj } from "../greek_text/vocabularyWords";
import "../Menu.css";

const categories = ["Most Common", "More Common", "Common"];

const MenuVocabulary = ({ setDeck, setDeckIndex, setVocabList, setIsFlipped }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(true);
  const [category, setCategory] = useState("Pick a Category");
  const [draftCategory, setDraftCategory] = useState("");

  useEffect(() => {
    if (!optionsOpen) return undefined;

    const previousBodyOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
    };
  }, [optionsOpen]);

  const handleSubmit = () => {
    if (!draftCategory) return;

    setIsFlipped(false);
    setTimeout(() => {
      const list = Object.keys(vocabListObj).filter((key) => {
        const frequency = Number(vocabListObj[key].frequency);
        if (draftCategory === "Most Common") return frequency > 500;
        if (draftCategory === "More Common") return frequency <= 500 && frequency > 250;
        return frequency < 250 && frequency > 49;
      });

      setDeckIndex(0);
      setDeck(list);
      setVocabList(list);
      setCategory(draftCategory);
      setOptionsOpen(false);
    }, 150);
  };

  const menuLinks = ["parsing-verse", "Verb"];

  return (
    <>
      <div className="vocab-sidebar">
        <button
          type="button"
          className="verb-sidebar-toggle"
          aria-label={sidebarOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={sidebarOpen}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "×" : "☰"}
        </button>
        {sidebarOpen && (
          <nav className="verb-sidebar-content" aria-label="Vocabulary navigation">
            <h3>Links</h3>
            <div className="menu-links">
              {menuLinks.map((link) => (
                <div key={link}>
                  <Link to={`/${link}`} className="menu-link">
                    {link === "parsing-verse" ? "Parsing Practice" : link}
                  </Link>
                </div>
              ))}
              <Link to="/" className="menu-link">Home</Link>
            </div>
          </nav>
        )}
      </div>

      <button
        type="button"
        className="verb-options-toggle"
        aria-label={optionsOpen ? "Close vocabulary options" : "Open vocabulary options"}
        aria-expanded={optionsOpen}
        onClick={() => setOptionsOpen(!optionsOpen)}
      >
        <span className="material-symbols-outlined" aria-hidden="true">settings</span>
      </button>

      {optionsOpen && (
        <button
          type="button"
          className="verb-options-backdrop"
          aria-label="Close vocabulary options"
          onClick={() => setOptionsOpen(false)}
        />
      )}

      <div className={`vocab-options-panel ${optionsOpen ? "is-open" : "is-closed"}`}>
        <p>{category === "Pick a Category" ? "Select a vocabulary list" : `Studying: ${category}`}</p>
        <div className="vocab-options-grid">
          {categories.map((option) => (
              <button
                type="button"
                key={option}
                className={`verb-menu-group vocab-option-card${draftCategory === option ? " chosen-option" : ""}`}
                onClick={() => setDraftCategory(option)}
              >
                <span className="vocab-option-title">{option}</span>
                <span className="vocab-option-description">
                  {option === "Most Common"
                    ? "500+ occurrences"
                    : option === "More Common"
                      ? "250-500 occurrences"
                      : "50-250 occurrences"}
                </span>
              </button>
          ))}
        </div>
        <section className="verb-menu-group verb-menu-submit-card">
          <div className="verb-menu-actions">
            <button type="button" className="submit-button" onClick={handleSubmit} disabled={!draftCategory}>
              Submit
            </button>
            <button type="button" className="submit-button verb-menu-cancel" onClick={() => setOptionsOpen(false)}>
              Cancel
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default MenuVocabulary;
