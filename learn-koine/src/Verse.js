import React, { useState, useEffect } from "react";
import "./Verse.css";
import CheckWord from "./CheckWord";
import Word from "./Word";
import { useSelector, useDispatch } from "react-redux";
import {
  selectVerseSlice,
  randomVerse,
  setMode,
  selectVerseMode,
} from "./features/verseSlice";
import { setArticleCount, clearArticleCount } from "./features/countSlice";
import { ArticleGrid } from "./ArticleGrid";
import { PassageNumber } from "./PassageNumber";
import Menu from "./Menu";
import { parseWord } from "./greek_text/parseLexicon";
import './Menu.css'
// import { greekArticles } from "./greek_text/greekArticles";
// import { wordUsages } from "../greek_text/greekLexiconObject";

//make the verse an array:
const arrayIffy = (verse) => {
  let sentenceSplit = verse.split(" ");
  let sentenceWords = sentenceSplit.map((word) => {
    return {
      word: word,
    };
  });
  return sentenceWords;
};

const Verse = () => {
  let [word] = useState("");
  const dispatch = useDispatch();
  const [defArticlStyle, setDefArticleStyle] = useState(
    "option-nav-highlighted"
  );
  const [nounsStyle, setNounsStyle] = useState("option-nav");
  const [conjStyle, setConjStyle] = useState("option-nav");
  const [prepStyle, setPrepStyle] = useState("option-nav");

  useEffect(() => {
    dispatch(randomVerse());
    dispatch(setMode("definite article"));
  }, [dispatch]);

  const resetStyles = () => {
    setDefArticleStyle("option-nav");
    setNounsStyle("option-nav");
    setConjStyle("option-nav");
    setPrepStyle("option-nav");
  };

  // resetStyles(0)

  const [articleGrid, setArticleGrid] = useState({
    nominative: "-clear",
    genitive: "-clear",
    dative: "-clear",
    accusative: "-clear",
    singular: "-clear",
    plural: "-clear",
    masculine: "-clear",
    feminine: "-clear",
    neuter: "-clear",
    first: "-clear",
    second: "-clear",
    third: "-clear",
  });

  const blankGrid = {
    nominative: "-clear",
    genitive: "-clear",
    dative: "-clear",
    accusative: "-clear",
    singular: "-clear",
    plural: "-clear",
    masculine: "-clear",
    feminine: "-clear",
    neuter: "-clear",
    first: "-clear",
    second: "-clear",
    third: "-clear",
  };

  const verse = useSelector(selectVerseSlice);
  const verseMode = useSelector(selectVerseMode);

  let articleCount = 0;

  let verseArray = arrayIffy(verse);
  for (let i = 0; i < verseArray.length; i++) {
    let parsedWord = parseWord(verseArray[i].word);
    if (parsedWord.parse.includes(verseMode)) {
      // verseArray[i].partOfSpeech = "definite article";
      // verseArray[i].parse = greekArticles[verseArray[i].word];
      articleCount++;
    } else if (verseArray[i].partOfSpeech === "Noun") {
      verseArray[i].partOfSpeech = "Noun";
    }
  }

  dispatch(setArticleCount(articleCount));

  const handleChangeMode = (option) => {
    resetStyles();
    setArticleGrid(blankGrid);
    dispatch(clearArticleCount());
    if (option === "definite article") {
      setDefArticleStyle("option-nav-highlighted");
      dispatch(setMode("definite article"));
    } else if (option === "Noun and Adjective") {
      setNounsStyle("option-nav-highlighted");
      dispatch(setMode("Noun and Adjective"));
    } else if (option === "Conjunction") {
      setConjStyle("option-nav-highlighted");
      dispatch(setMode("Conjunction"));
    } else if (option === "Preposition") {
      setPrepStyle("option-nav-highlighted");
      dispatch(setMode("Preposition"));
    } else {
      console.log("missed styling");
    }
  };

  return (
    <div className="body">
      <Menu />
      {/* <nav className="nav-bar">
        <div className="nav-options">
          <button
            className={defArticlStyle}
            onClick={() => handleChangeMode("definite article")}
          >
            Definite Articles
          </button>
          <button
            className={nounsStyle}
            onClick={() => handleChangeMode("Noun and Adjective")}
          >
            Nouns and Adjectives
          </button>
          <button
            className={conjStyle}
            onClick={() => handleChangeMode("Conjunction")}
          >
            Conjunctions
          </button>
          <button
            className={prepStyle}
            onClick={() => handleChangeMode("Preposition")}
          >
            Prepositions
          </button>
      </nav>
        </div> */}
      <div className="verse-sentence">
        {verseArray.map((word, i) => {
          return (
            <Word
              key={word.word + i}
              word={word}
              setArticleGrid={setArticleGrid}
              blankGrid={blankGrid}
            />
          );
        })}
        <br></br>
        <br></br>
        <PassageNumber />
        <br></br>
        <div>
          <CheckWord
            word={word}
            setArticleGrid={setArticleGrid}
            blankGrid={blankGrid}
          >
            <ArticleGrid
              articleGrid={articleGrid}
              setArticleGrid={setArticleGrid}
            />
          </CheckWord>
        </div>
      </div>
    </div>
  );
};

export default Verse;
