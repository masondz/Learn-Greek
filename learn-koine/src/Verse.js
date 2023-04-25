import React, { useState, useEffect } from "react";
import "./Verse.css";
import CheckWord from "./CheckWord";
import Word from "./Word";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectVerseSlice,
  randomVerse,
  setMode,
  selectVerseMode,
} from "./features/verseSlice";
import { setArticleCount } from "./features/countSlice";
import { ArticleGrid } from "./ArticleGrid";
import { PassageNumber } from "./PassageNumber";
import Menu from "./Menu";
import { parseWord } from "./greek_text/parseLexicon";
import "./Menu.css";
import ConjuctionGrid from "./ConjuctionGrid";
import PrepositionGrid from "./PrepositionGrid";
import PronounGrid from "./PronounGrid";
import VerbGrid from "./VerbGrid";

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
  const [reset, setReset] = useState(true);

  useEffect(() => {
    dispatch(randomVerse());
    dispatch(setMode("definite article"));
  }, [dispatch]);

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

  let practiceGrid;
  switch (verseMode) {
    case "Conjunction":
      practiceGrid = <ConjuctionGrid reset={reset} />;
      break;
    case "Preposition":
      practiceGrid = <PrepositionGrid reset={reset} />;
      break;
    case "Pronoun":
      practiceGrid = <PronounGrid reset={reset} />;
      break;
    case "Verb":
      practiceGrid = <VerbGrid verbMode={"parsing"} reset={reset} />;
      break;
    default:
      practiceGrid = (
        <ArticleGrid
          articleGrid={articleGrid}
          setArticleGrid={setArticleGrid}
        />
      );
  }

  let articleCount = 0;

  let verseArray = arrayIffy(verse);
  for (let i = 0; i < verseArray.length; i++) {
    let parsedWord = parseWord(verseArray[i].word);
    if (parsedWord.parse.includes(verseMode)) {
      articleCount++;
    }
  }

  dispatch(setArticleCount(articleCount));

  const menuOptions = [
    "definite article",
    "Conjunction",
    "Preposition",
    "Noun and Adjective",
    "Pronoun",
    "Verb",
    "Particle",
    "Adverb",
  ];

  const menuLinks = ["vocabulary", "verb"];

  return (
    <div className="body">
      <Menu
        setArticleGrid={setArticleGrid}
        blankGrid={blankGrid}
        menuOptions={menuOptions}
        menuLinks={menuLinks}
      />
      <div className="verse-sentence">
        {verseArray.map((word, i) => {
          return (
            <Word
              key={word.word + i}
              word={word}
              setArticleGrid={setArticleGrid}
              setReset={setReset}
              reset={reset}
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
            {practiceGrid}
          </CheckWord>
        </div>
      </div>
    </div>
  );
};

export default Verse;
