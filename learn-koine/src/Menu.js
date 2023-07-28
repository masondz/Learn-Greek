import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectVerseMode, setMode } from "./features/verseSlice";
import { clearWord } from "./features/wordSlice";
import "./Menu.css";

const Menu = ({ setArticleGrid, blankGrid, menuOptions, menuLinks }) => {
  const verseMode = useSelector(selectVerseMode);
  const [openOrClosed, setIsOpenOrClosed] = useState("closed");

  const dispatch = useDispatch();

  const handleClick = ({ option }) => {
    dispatch(clearWord());
    if (option === "definite article") {
      dispatch(setMode("definite article"));
    } else if (option === "Noun and Adjective") {
      dispatch(setMode("Noun and Adjective"));
    } else if (option === "Conjunction") {
      dispatch(setMode("Conjunction"));
    } else if (option === "Preposition") {
      dispatch(setMode("Preposition"));
    } else if (option === "Pronoun") {
      dispatch(setMode("Pronoun"));
    } else if (option === "Verb") {
      dispatch(setMode("Verb"));
    } else if (option === "Particle") {
      dispatch(setMode("Particle"));
    } else if (option === "Adverb") {
      dispatch(setMode("Adverb"));
    } else {
      return console.log("missed styling");
    }
    setArticleGrid(blankGrid);
    setTimeout(() => {
      setIsOpenOrClosed("closed");
    }, 10);
  };

  return (
    <div className={`menu-container-${openOrClosed}`}>
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

      <div>
        <div></div>
        <div
          className={`menu-options-${openOrClosed}`}
          initial="closed"
          animate="open"
          exit="closed"
        >
          <h3>
            {verseMode === "definite article" ? "Definite Article" : verseMode}
          </h3>
          {menuOptions.map((option) => {
            return (
              <div key={option}>
                <button
                  className="menu-button"
                  onClick={() => handleClick({ option })}
                >
                  {option}
                </button>
                <br></br>
              </div>
            );
          })}
        </div>
        <br></br>
        <div key="menu-links" className="menu-links">
          <h3>Links</h3>
          {menuLinks.map((link) => {
            return (
              <div key={link}>
                <Link
                  to={"/" + link}
                  className="menu-link"
                  onClick={() => dispatch(clearWord())}
                >
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
    </div>
  );
};

export default Menu;
