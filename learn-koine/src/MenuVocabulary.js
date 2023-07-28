import React, { useState } from "react";
import { Link } from "react-router-dom";
import { vocabListObj } from "./greek_text/vocabularyWords";

import "./Menu.css";

const MenuVocabulary = ({
  setDeck,
  setDeckIndex,
  setVocabList,
  setIsFlipped,
}) => {
  const [openOrClosed, setIsOpenOrClosed] = useState("open");
  const [category, setCategory] = useState("Pick a Category");

  const menuLinks = ["parsing-verse", "verb"];

  const handleSetList = (option) => {
    let list = {};
    setIsFlipped(false);
    setTimeout(() => {
      setDeckIndex(0);
      switch (option) {
        case "Most Common":
          for (let key in vocabListObj) {
            if (Number(vocabListObj[key].frequency) > 500) {
              list[key] = vocabListObj[key];
            }
          }
          setDeck(Object.keys(list));
          setVocabList(Object.keys(list));
          setCategory("Most Common");
          break;
        case "More Common":
          for (let key in vocabListObj) {
            if (
              Number(vocabListObj[key].frequency) < 500 &&
              Number(vocabListObj[key].frequency > 250)
            ) {
              list[key] = vocabListObj[key];
            }
          }
          setDeck(Object.keys(list));
          setVocabList(Object.keys(list));
          setCategory("More Common");
          break;
        case "Common":
          for (let key in vocabListObj) {
            if (
              Number(vocabListObj[key].frequency) < 250 &&
              Number(vocabListObj[key].frequency > 49)
            ) {
              list[key] = vocabListObj[key];
            }
          }
          setDeck(Object.keys(list));
          setVocabList(Object.keys(list));
          setCategory("Common");
          break;
        default:
          setDeck(["Pick Vocabulary List"]);
          setVocabList({});
          break;
      }
      setTimeout(() => {
        setIsOpenOrClosed("closed");
      }, 10);
    }, 150);
  };

  return (
    <div className={`menu-container-${openOrClosed}`} key="verb-menu-container">
      <div
        className={`menu-button-container-${openOrClosed}`}
        key="verb-menu-button"
      >
        <button
          className="menu-toggle-button"
          onClick={() =>
            openOrClosed === "open"
              ? setIsOpenOrClosed("closed")
              : setIsOpenOrClosed("open")
          }
        >
          {openOrClosed === "open" ? "X" : "="}
        </button>
      </div>
      <h4 style={{ whiteSpace: "nowrap" }}>
        {category === "Pick a Category" ? category : `Studying: ${category}`}
      </h4>
      <button
        className="menu-button"
        onClick={() => handleSetList("Most Common")}
      >
        Most Common
      </button>
      <br></br>
      <button
        className="menu-button"
        onClick={() => handleSetList("More Common")}
      >
        More Common
      </button>
      <br></br>
      <button className="menu-button" onClick={() => handleSetList("Common")}>
        Common
      </button>
      <br></br>
      <div className="menu-links" key="menu-lins">
        <h3 key="links-title">Links</h3>
        {menuLinks.map((link) => {
          return (
            <div key={link + "-div"}>
              <Link to={"/" + link} className="menu-link" key={link}>
                {link === "parsing-verse" ? "parsing practice" : link}
              </Link>
              <br></br>
            </div>
          );
        })}
        <Link to={"/"} className="menu-link" key="home-link">
          Home
        </Link>
      </div>
    </div>
  );
};

export default MenuVocabulary;
