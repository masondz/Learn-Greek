import { useState, useEffect } from "react";
import "./Verse.css";
import CheckWord from "./CheckWord.jsx";
import Word from "./Word.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  selectVerseSlice,
  selectVerseReference,
  setMode,
  selectVerseMode,
  setVerse,
} from "../features/verseSlice";
// import { setArticleCount } from "../features/countSlice";
import { ArticleGrid } from "./ArticleGrid.jsx";
import { PassageNumber } from "./PassageNumber.jsx";
import Menu from "../Menu";
// import { parseWord } from "../greek_text/parseLexicon";
import "../Menu.css";
import ConjuctionGrid from "./ConjuctionGrid.jsx";
import PrepositionGrid from "./PrepositionGrid.jsx";
import PronounGrid from "./PronounGrid.jsx";
import VerbGrid from "../Verbs/VerbGrid.jsx";
import PickVerse from "./PickVerse.jsx";
import { newTestament } from "./PickVerse.jsx";
import { greekText } from "../greek_text/greekText";
// import Toolkit from "./Toolkit.jsx";
import AdverbGrid from "./AdverbGrid.jsx";
import ParticleGrid from "./ParticleGrid.jsx";
import { setVerbType } from "../features/verbSlice";
import HelpTool from "./HelpTool.jsx";
import { scoreVerse } from "../utils";
import ScoreBoard from "./ScoreBoard.jsx";
import ToolkitPopup from "./ToolkitPopup.jsx";
import { useAuth } from "../AuthContext.jsx";
import { AUTH_ENABLED } from "../authConfig.js";
import { saveGuestResumeLocation } from "../guestProgress.js";

const GUEST_DEPONENT_SETTING_KEY = "didakey.guest.enableDeponentVerbs";

const readGuestDeponentSetting = () => {
  try {
    if (AUTH_ENABLED && localStorage.getItem("token")) return false;
    return localStorage.getItem(GUEST_DEPONENT_SETTING_KEY) === "true";
  } catch (error) {
    console.error("Unable to read guest deponent setting:", error);
    return false;
  }
};

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
  const { user, loading: authLoading } = useAuth();
  const [enableDeponentVerbs, setEnableDeponentVerbs] = useState(readGuestDeponentSetting);

  const [bookListIsOpen, setBookListIsOpen] = useState(false);
  const [chapterListIsOpen, setChapterListIsOpen] = useState(false);
  const [verseListIsOpen, setVerseListIsOpen] = useState(false);

  const [chosenBook, setChosenBook] = useState("");
  const [chosenChapter, setChosenChapter] = useState("");
  const [chosenVerse, setChosenVerse] = useState(0);

  //this is for VerbGrid. Must be set to false to stop random verb after correct guesses.
  const [correctCount, setCorrectCount] = useState(false);

  // Popup state management
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [popupCallback, setPopupCallback] = useState(null);

  // Word parsing state for the current session
  const [wordParsingState, setWordParsingState] = useState({});

  // Get verse data from Redux - must be before useEffect that uses verseReference
  const verse = useSelector(selectVerseSlice);
  const verseMode = useSelector(selectVerseMode);
  const verseReference = useSelector(selectVerseReference);

  useEffect(() => {
    if (authLoading || user) return;

    try {
      localStorage.setItem(GUEST_DEPONENT_SETTING_KEY, String(enableDeponentVerbs));
    } catch (error) {
      console.error("Unable to save guest deponent setting:", error);
    }
  }, [enableDeponentVerbs, authLoading, user]);

  useEffect(() => {
    function getVerseFromUrl(pathRaw) {
      //check if numbered book
      let path = pathRaw.slice(15);

      // let selection = path.split("-").join(" "); //removes hyphen
      let selection = path.split("-");
      let referenceCode = "";
      let book = "";
      let chapter = "";
      let verse = "";
      if (["1", "2", "3"].includes(selection[0])) {

        book =
          selection[0] +
          " " +
          selection[1].charAt(0).toUpperCase() +
          selection[1].slice(1);

        chapter = selection[2];
        if (chapter.length < 2) {
          chapter = "0" + chapter;
        }

        verse = selection[3];
        if (verse.length < 2) {
          verse = "0" + verse;
        }
      } else {
        book = selection[0].charAt(0).toUpperCase() + selection[0].slice(1);

        chapter = selection[1];
        if (chapter.length < 2) {
          chapter = "0" + chapter;
        }

        verse = selection[2];
        if (verse.length < 2) {
          verse = "0" + verse;
        }
      }

      referenceCode = newTestament[book].code + "0" + chapter + "0" + verse;

      //need this to get the text of the verse
      let chosenVerseText = organizeText(greekText)[referenceCode];
      return [referenceCode, chosenVerseText];
    }

    const currentPath = window.location.pathname;
    const resumePath = currentPath === "/parsing-verse" ? "/parsing-verse/" : currentPath;
    saveGuestResumeLocation(resumePath);
    if (currentPath === "/parsing-verse/" || currentPath === "/parsing-verse") {
      const randomVerse = getRandomVerse(organizeText(greekText));
      dispatch(setVerse(randomVerse));
      if (currentPath === "/parsing-verse") {
        window.history.replaceState(
          { set: "setting url" },
          "",
          "/parsing-verse/"
        );
      }
    } else {
      let pickedVerse = getVerseFromUrl(currentPath);
      dispatch(setVerse(pickedVerse));
    }
    dispatch(setMode("definite article"));
    dispatch(setVerbType(""));
  }, [dispatch]);

  // Reset word parsing state whenever verse reference changes
  useEffect(() => {
    setWordParsingState({});
  }, [verseReference]);

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

  let practiceGrid;
  switch (verseMode) {
    case "Conjunction":
      practiceGrid = (
        <ConjuctionGrid reset={reset} verseReference={verseReference} wordParsingState={wordParsingState} setWordParsingState={setWordParsingState} />
      );
      break;
    case "Preposition":
      practiceGrid = (
        <PrepositionGrid reset={reset} verseReference={verseReference} wordParsingState={wordParsingState} setWordParsingState={setWordParsingState} />
      );
      break;
    case "Pronoun":
      practiceGrid = (
        <PronounGrid reset={reset} verseReference={verseReference} wordParsingState={wordParsingState} setWordParsingState={setWordParsingState} />
      );
      break;
    case "Verb":
      practiceGrid = (
        <VerbGrid
          verbMode={"parsing"}
          correctCount={correctCount}
          setCorrectCount={setCorrectCount}
          reset={reset}
          dispatch={dispatch}
          verseReference={verseReference}
          wordParsingState={wordParsingState}
          setWordParsingState={setWordParsingState}
          enableDeponentVerbs={enableDeponentVerbs}
        />
      );
      break;
    case "Adverb":
      practiceGrid = (
        <AdverbGrid reset={reset} verseReference={verseReference} wordParsingState={wordParsingState} setWordParsingState={setWordParsingState} />
      );
      break;
    case "Particle":
      practiceGrid = (
        <ParticleGrid rese={reset} verseReference={verseReference} wordParsingState={wordParsingState} setWordParsingState={setWordParsingState} />
      );
      break;
    default:
      practiceGrid = (
        <ArticleGrid
          articleGrid={articleGrid}
          setArticleGrid={setArticleGrid}
          verseReference={verseReference}
          wordParsingState={wordParsingState}
          setWordParsingState={setWordParsingState}
        />
      );
  }

  let verseArray = arrayIffy(verse);

  // useMemo(
  //   () => filterTodos(todos, tab),
  //   [todos, tab]
  // );

  let scoreMax = scoreVerse(verseArray);

  const menuLinks = ["Vocabulary", "Verb"];

  //close drop down menues on off-click
  useEffect(() => {
    const offClickCloseMenu = (e) => {
      if (
        !["booklist-button", "chapterlist-button", "verselist-button"].includes(
          e.target.className
        ) &&
        !e.target.className.includes("list-option") &&
        !e.target.className.includes("toolkit-popup") &&
        !e.target.className.includes("popup-tool")
      ) {
        setBookListIsOpen(false);
        setChapterListIsOpen(false);
        setVerseListIsOpen(false);
        setShowPopup(false);
      }
    };

    document.addEventListener("click", offClickCloseMenu);

    return () => {
      document.removeEventListener("click", offClickCloseMenu);
    };
  }, []);

  return (
    <>
      <div className="verse-component">
        <div>
          <Menu
            setArticleGrid={setArticleGrid}
            blankGrid={blankGrid}
            menuLinks={menuLinks}
            enableDeponentVerbs={enableDeponentVerbs}
            setEnableDeponentVerbs={setEnableDeponentVerbs}
          />
        </div>
        <ScoreBoard />
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
                wordIndex={i}
                setArticleGrid={setArticleGrid}
                setReset={setReset}
                reset={reset}
                blankGrid={blankGrid}
                verseReference={verseReference}
                setShowPopup={setShowPopup}
                setPopupPosition={setPopupPosition}
                setPopupCallback={setPopupCallback}
                wordParsingState={wordParsingState}
                setWordParsingState={setWordParsingState}
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

          {
            /*<Toolkit />*/
          }
        </div>
        <HelpTool pageName={"parse-help"} />
      </div>
      {showPopup && popupCallback && (
        <ToolkitPopup
          position={popupPosition}
          onSelectMode={popupCallback}
        />
      )}
    </>
  );
};

export default Verse;
