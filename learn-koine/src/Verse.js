import React, { useState, useEffect } from "react";
import "./Verse.css";
import CheckWord from "./CheckWord";
import Word from "./Word";
import { useSelector, useDispatch } from "react-redux";
import {
  selectVerseSlice,
  setMode,
  selectVerseMode,
  setVerse,
} from "./features/verseSlice";
// import { setArticleCount } from "./features/countSlice";
import { ArticleGrid } from "./ArticleGrid";
import { PassageNumber } from "./PassageNumber";
import Menu from "./Menu";
// import { parseWord } from "./greek_text/parseLexicon";
import "./Menu.css";
import ConjuctionGrid from "./ConjuctionGrid";
import PrepositionGrid from "./PrepositionGrid";
import PronounGrid from "./PronounGrid";
import VerbGrid from "./VerbGrid";
import PickVerse from "./PickVerse";
import { newTestament } from "./PickVerse";
import { greekText } from "./greek_text/greekText";
import Toolkit from "./Toolkit";
import AdverbGrid from "./AdverbGrid";
import ParticleGrid from "./ParticleGrid";
import { setVerbType } from "./features/verbSlice";
import HelpTool from "./HelpTool";

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

export const organizeText = (text) => {
  // let verses = [];
  let verses = {};
  let key = "";
  let value = "";

  const textArray = text.split("\n");

  for (let i = 0; i < textArray.length; i++) {
    key = textArray[i].slice(0, 8);
    value = textArray[i].slice(9);
    verses[key] = value;
    // verses.push({ index: i, reference: key, verse: value });
  }
  return verses;
};

export const getRandomVerse = (theText) => {
  let bookArr = Object.keys(newTestament);
  let index = bookArr[Math.floor(Math.random() * bookArr.length)];

  let randomBook = newTestament[index];

  let chapters = randomBook.chapterVerseIndex;
  let randomChapter = Math.floor(Math.random() * chapters.length);

  let verse = Math.floor(
    Math.random() * randomBook.chapterVerseIndex[randomChapter]
  );

  randomChapter++;
  verse++;

  if (randomChapter < 10) {
    randomChapter = "0" + randomChapter;
  }

  if (verse < 10) {
    verse = "0" + verse;
  }

  let reference = randomBook.code + "0" + randomChapter + "0" + verse;

  return [reference, theText[reference]];
};

const Verse = () => {
  let [word] = useState("");
  const dispatch = useDispatch();
  const [reset, setReset] = useState(true);

  const [bookListIsOpen, setBookListIsOpen] = useState(false);
  const [chapterListIsOpen, setChapterListIsOpen] = useState(false);
  const [verseListIsOpen, setVerseListIsOpen] = useState(false);

  const [chosenBook, setChosenBook] = useState("");
  const [chosenChapter, setChosenChapter] = useState("");
  const [chosenVerse, setChosenVerse] = useState(0);

  useEffect(() => {
    const randomVerse = getRandomVerse(organizeText(greekText));
    console.log(randomVerse);
    dispatch(setVerse(randomVerse));
    dispatch(setMode("definite article"));
    dispatch(setVerbType(""));
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
    case "Adverb":
      practiceGrid = <AdverbGrid reset={reset} />;
      break;
    case "Particle":
      practiceGrid = <ParticleGrid rese={reset} />;
      break;
    default:
      practiceGrid = (
        <ArticleGrid
          articleGrid={articleGrid}
          setArticleGrid={setArticleGrid}
        />
      );
  }

  let verseArray = arrayIffy(verse);

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

  //close drop down menues on off-click
  const offClickCloseMenu = (e) => {
    if (
      !["booklist-button", "chapterlist-button", "verselist-button"].includes(
        e.target.className
      ) &&
      !e.target.className.includes("list-option")
    ) {
      setBookListIsOpen(false);
      setChapterListIsOpen(false);
      setVerseListIsOpen(false);
    }
    document.removeEventListener("click", offClickCloseMenu);
  };

  document.addEventListener("click", offClickCloseMenu);

  return (
    <>
      <div className="verse-component" onClick={offClickCloseMenu}>
        <div>
          <Menu
            setArticleGrid={setArticleGrid}
            blankGrid={blankGrid}
            menuOptions={menuOptions}
            menuLinks={menuLinks}
          />
        </div>
        <br></br>
        <PickVerse
          setArticleGrid={setArticleGrid}
          blankGrid={blankGrid}
          bookListIsOpen={bookListIsOpen}
          chapterListIsOpen={chapterListIsOpen}
          verseListIsOpen={verseListIsOpen}
          setBookListIsOpen={setBookListIsOpen}
          setChapterListIsOpen={setChapterListIsOpen}
          setVerseListIsOpen={setVerseListIsOpen}
          chosenBook={chosenBook}
          setChosenBook={setChosenBook}
          chosenChapter={chosenChapter}
          setChosenChapter={setChosenChapter}
          chosenVerse={chosenVerse}
          setChosenVerse={setChosenVerse}
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
              setChosenBook={setChosenBook}
              setChosenChapter={setChosenChapter}
              setChosenVerse={setChosenVerse}
            >
              {practiceGrid}
            </CheckWord>
          </div>

          <Toolkit />
        </div>
        <HelpTool pageName={"parse-help"} />
      </div>
    </>
  );
};

export default Verse;
