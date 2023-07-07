import React, { useState } from "react";
import "./PickVerse.css";
import { organizeText } from "./features/verseSlice";
import { greekText } from "./greek_text/greekText";
import { useDispatch, useSelector } from "react-redux";
import { setVerse, clearVerse } from "./features/verseSlice";
import { clearWord } from "./features/wordSlice";
import { selectVerseReference } from "./features/verseSlice";
import { decodeReference } from "./PassageNumber";

const PickVerse = ({
  setArticleGrid,
  blankGrid,
  setVerseListIsOpen,
  setChapterListIsOpen,
  setBookListIsOpen,
  bookListIsOpen,
  chapterListIsOpen,
  verseListIsOpen,
}) => {
  const verseReferenceFromStore = useSelector(selectVerseReference);

  const bookNames = Object.keys(newTestament);

  const referenceRaw = decodeReference(verseReferenceFromStore);

  const [chapterList, setChapterList] = useState([]);
  const [verseList, setVerseList] = useState([]);

  const [chosenBook, setChosenBook] = useState("");
  const [chosenChapter, setChosenChapter] = useState(
    referenceRaw.chapterNumber
  );
  const [chosenVerse, setChosenVerse] = useState(0);

  const dispatch = useDispatch();

  const makeHighlight = (e) => {
    e.preventDefault();
    const specificList = e.target.className.split(" ")[1];

    const options = ["book-option", "chapter-option", "verse-option"];
    const classesToRemove = options.slice(options.indexOf(specificList));

    classesToRemove.forEach((className) => {
      removeHighlight(className);
    });

    e.target.classList.add("selected");
  };

  const removeHighlight = (listOption) => {
    const highlightedChoices = document.getElementsByClassName(listOption);
    for (let i = 0; i < highlightedChoices.length; i++) {
      highlightedChoices[i].className = `list-option ${listOption}`;
    }
    return;
  };

  const handlePickBook = (e) => {
    e.preventDefault();
    const pickedBook = e.target.innerHTML;
    makeHighlight(e);
    setChapterList(updateChapterList(pickedBook));
    setChosenBook(pickedBook);
    setVerseList(updateVerseList(currentChapter, pickedBook));
    setChosenVerse("Select Verse");
    setChosenChapter("Select Chapter");
  };

  const updateChapterList = (pickedBook) => {
    const chaptersArray = [];
    for (
      let i = 1;
      i < newTestament[pickedBook].chapterVerseIndex.length + 1;
      i++
    ) {
      chaptersArray.push(i);
    }
    return chaptersArray;
  };

  const handlePickChapter = (e) => {
    e.preventDefault();
    makeHighlight(e);
    const chapterNumber = e.target.innerHTML;
    setVerseList(updateVerseList(chapterNumber));
    setChosenVerse("Select Verse");

    let encodeChapter = "";

    if (chapterNumber < 10) {
      encodeChapter = "0" + chapterNumber;
    } else {
      encodeChapter = chapterNumber;
    }

    setChosenChapter(encodeChapter);
  };

  if (referenceRaw.chapterNumber < 10) {
    referenceRaw.chapterNumber = "0" + referenceRaw.chapterNumber;
  }

  const updateVerseList = (
    chapterNumber,
    book = bookNames[referenceRaw.bookIndex]
  ) => {
    const numberOfVerses =
      newTestament[book].chapterVerseIndex[chapterNumber - 1];
    const versesArray = [];
    for (let i = 1; i < numberOfVerses + 1; i++) {
      versesArray.push(i);
    }
    return versesArray;
  };

  const handlePickVerse = (e) => {
    e.preventDefault();
    makeHighlight(e);
    let encodeVerse = "";
    if (Number(e.target.innerHTML) < 10) {
      encodeVerse = "0" + e.target.innerHTML;
    } else {
      encodeVerse = e.target.innerHTML;
    }
    setChosenVerse(encodeVerse);
  };

  const lookUpVerse = (ref) => {
    setBookListIsOpen(false);
    setChapterListIsOpen(false);
    setVerseListIsOpen(false);
    let allVerses = organizeText(greekText);
    if (!allVerses[ref]) {
      // alert("Verse doesn't exist!");
      return false;
    }
    const verse = allVerses[ref];
    const payload = [ref, verse];
    dispatch(clearVerse());
    setTimeout(() => {
      setArticleGrid(blankGrid);
      dispatch(setVerse(payload));
      dispatch(clearWord());
    }, 1);
    return true;
  };

  let currentBook = chosenBook ? chosenBook : bookNames[referenceRaw.bookIndex];
  let currentChapter = chosenChapter
    ? chosenChapter
    : referenceRaw.chapterNumber;
  let currentVerse = chosenVerse ? chosenVerse : referenceRaw.verseNumber;

  function nextVerse() {
    let tempVerse = Number(currentVerse) + 1;

    if (tempVerse < 10) {
      tempVerse = "0" + tempVerse;
    }

    let nextReference =
      newTestament[currentBook].code + "0" + currentChapter + "0" + tempVerse;

    if (lookUpVerse(nextReference)) {
      setChosenVerse(tempVerse);
      setChosenChapter(currentChapter);
      if (!chosenBook) {
        setChosenBook(currentBook);
        setChapterList(updateChapterList(currentBook));
        setVerseList(updateVerseList(Number(currentChapter)));
      }
    } else {
      tempVerse = "01";
      let tempChapter = Number(currentChapter) + 1;
      if (tempChapter < 10) {
        tempChapter = "0" + tempChapter;
      }
      nextReference =
        newTestament[currentBook].code + "0" + tempChapter + "0" + tempVerse;
      if (lookUpVerse(nextReference)) {
        //update chapter and vere list
        setVerseList(updateVerseList(Number(tempChapter)));
        setChosenChapter(tempChapter);
        setChosenVerse(tempVerse);
      } else {
        let tempBookCode = newTestament[currentBook].code + 1;
        if (tempBookCode > 66) {
          return alert("You've reached the end!");
        }

        for (let book in newTestament) {
          if (newTestament[book].code === Number(tempBookCode)) {
            tempChapter = "01";
            setChosenBook(book);
            setChapterList(updateChapterList(book));
            setVerseList(updateVerseList(Number(tempChapter), book));
            setChosenChapter("01");
            setChosenVerse("01");
          }
        }

        lookUpVerse(`${tempBookCode}001001`);
      }
    }
  }

  function prevVerse() {
    let tempVerse = Number(currentVerse) - 1;

    if (tempVerse < 10) {
      tempVerse = "0" + tempVerse;
    }

    let tempChapter = Number(currentChapter);
    let tempBookCode = newTestament[currentBook].code;
    let tempBook = "";
    let reference = "";

    if (tempVerse < 1) {
      tempChapter = tempChapter - 1;

      if (tempChapter < 1) {
        tempBookCode = tempBookCode - 1;
        if (tempBookCode < 40) {
          return alert("You are already at the beginning.");
        } else {
          for (let bookTitle in newTestament) {
            if (newTestament[bookTitle].code === tempBookCode) {
              tempBook = bookTitle;
              tempChapter = newTestament[bookTitle].chapterVerseIndex.length;
              tempVerse =
                newTestament[bookTitle].chapterVerseIndex[tempChapter - 1];
              if (tempChapter < 10) {
                tempChapter = "0" + tempChapter;
              }

              reference = tempBookCode + "0" + tempChapter + "0" + tempVerse;
              setChosenBook(tempBook);
              setChosenChapter(tempChapter);
              setChosenVerse(tempVerse);
              setChapterList(updateChapterList(tempBook));
              setVerseList(updateVerseList(Number(tempChapter), tempBook));
              lookUpVerse(reference);
              dispatch(clearWord());
              return;
            }
          }
        }
      }

      tempVerse = newTestament[currentBook].chapterVerseIndex[tempChapter - 1];
      setChosenBook(currentBook);
      setVerseList(updateVerseList(Number(tempChapter)));
      setChapterList(updateChapterList(currentBook));
    }

    if (tempChapter < 10) {
      tempChapter = "0" + tempChapter;
    }

    reference = tempBookCode + "0" + tempChapter + "0" + tempVerse;

    lookUpVerse(reference);
    setChosenBook(currentBook);
    setChapterList(updateChapterList(currentBook));
    setVerseList(updateVerseList(Number(currentChapter), currentBook));
    setChosenVerse(tempVerse);
    setChosenChapter(tempChapter);
    dispatch(clearWord());
    return;
  }

  //this will turn the selected book chapter and verse into its reference code in the grktext
  const encodeReference = () => {
    let bookCode = newTestament[currentBook].code;

    let reference = bookCode + "0" + currentChapter + "0" + currentVerse;
    if (!lookUpVerse(reference)) {
      return alert("Check verse reference");
    }
  };

  const handleOpenBookList = () => {
    setBookListIsOpen(!bookListIsOpen);
  };
  const handleOpenChapterList = () => {
    if (chapterList.length === 0) {
      setChapterList(updateChapterList(currentBook));
    }
    setChapterListIsOpen(!chapterListIsOpen);
  };

  const handleOpenVerseList = () => {
    if (verseList.length === 0) {
      setVerseList(updateVerseList(Number(currentChapter), currentBook));
    }
    setVerseListIsOpen(!verseListIsOpen);
  };

  //attempt to close menues if off-clicked

  return (
    <div className="pick-component">
      <div className="pick-verse-menu">
        <div className="drop-lists">
          <button onClick={handleOpenBookList} className="booklist-button">
            {chosenBook ? chosenBook : bookNames[referenceRaw.bookIndex]}
          </button>
        </div>
        <div className="drop-lists">
          <button
            onClick={handleOpenChapterList}
            className="chapterlist-button"
          >
            {chosenChapter ? chosenChapter : referenceRaw.chapterNumber}
          </button>
        </div>
        <div className="drop-lists">
          <button onClick={handleOpenVerseList} className="verselist-button">
            {chosenVerse ? chosenVerse : referenceRaw.verseNumber}
          </button>
        </div>
        <button className="go-button" onClick={encodeReference}>
          Go
        </button>
      </div>{" "}
      <div className="lists-container">
        <div className={`lists ${bookListIsOpen}`} id="book-list">
          {bookNames.map((book) => {
            return (
              <div
                className="list-option book-option"
                value={book}
                onClick={handlePickBook}
                key={book}
              >
                {book}
              </div>
            );
          })}
        </div>
        <div className={`lists ${chapterListIsOpen}`} id="chapter-list">
          {chapterList.map((chapter) => {
            return (
              <div
                className="list-option chapter-option"
                value={chapter}
                onClick={handlePickChapter}
                key={chapter}
              >
                {chapter}
              </div>
            );
          })}
        </div>
        <div className={`lists ${verseListIsOpen}`} id="verse-list">
          {verseList.map((verse) => {
            return (
              <div
                className="list-option verse-option"
                value={verse}
                onClick={handlePickVerse}
                key={verse}
              >
                {verse}
              </div>
            );
          })}
        </div>
      </div>
      <div className="nav-buttons">
        <button className="button" onClick={prevVerse}>
          prev
        </button>
        <button className="button" onClick={nextVerse}>
          next
        </button>
      </div>
    </div>
  );
};

export default PickVerse;

// const bookCode = {
//   Matthew: {code:{}, chapters:{}}
//   Mark: 41,
//   Luke:
// }

export const newTestament = {
  Matthew: {
    code: 40,
    //chapter are arranged by index - 1, and the value is verse count. ex. Matt. chapter 1 has 25 verses (Matthew.chapterVerseIndex[0] = 25)
    chapterVerseIndex: [
      25, 23, 17, 25, 48, 34, 29, 34, 38, 42, 30, 50, 58, 36, 39, 28, 27, 35,
      30, 34, 46, 46, 39, 51, 46, 75, 66, 20,
    ],
  },
  Mark: {
    code: 41,
    chapterVerseIndex: [
      45, 28, 35, 41, 43, 56, 37, 38, 50, 52, 33, 44, 37, 72, 47, 8,
    ],
  },
  Luke: {
    code: 42,
    chapterVerseIndex: [
      80, 52, 38, 44, 39, 49, 50, 56, 62, 42, 54, 59, 35, 35, 32, 31, 37, 43,
      48, 47, 38, 71, 56, 53,
    ],
  },

  John: {
    code: 43,
    chapterVerseIndex: [
      51, 25, 36, 54, 47, 71, 53, 59, 41, 42, 57, 50, 38, 31, 27, 33, 26, 40,
      42, 31, 25,
    ],
  },

  Acts: {
    code: 44,
    chapterVerseIndex: [
      26, 47, 26, 37, 42, 15, 60, 40, 43, 48, 30, 25, 52, 28, 41, 40, 34, 28,
      41, 38, 40, 30, 35, 27, 27, 32, 44, 31,
    ],
  },

  Romans: {
    code: 45,
    chapterVerseIndex: [
      32, 29, 31, 25, 21, 23, 25, 39, 33, 21, 36, 21, 14, 23, 33, 27,
    ],
  },

  "1 Corinthians": {
    code: 46,
    chapterVerseIndex: [
      31, 16, 23, 21, 13, 20, 40, 13, 27, 33, 34, 31, 13, 40, 58, 24,
    ],
  },

  "2 Corinthians": {
    code: 47,
    chapterVerseIndex: [24, 17, 18, 18, 21, 18, 16, 24, 15, 18, 33, 21, 14],
  },

  Galatians: { code: 48, chapterVerseIndex: [24, 21, 29, 31, 26, 18] },

  Ephesians: { code: 49, chapterVerseIndex: [23, 22, 21, 32, 33, 24] },

  Philippians: { code: 50, chapterVerseIndex: [30, 30, 21, 23] },

  Colossians: { code: 51, chapterVerseIndex: [29, 23, 25, 18] },

  "1 Thessalonians": { code: 52, chapterVerseIndex: [10, 20, 13, 18, 28] },

  "2 Thessalonians": { code: 53, chapterVerseIndex: [12, 17, 18] },

  "1 Timothy": { code: 54, chapterVerseIndex: [20, 15, 16, 16, 25, 21] },

  "2 Timothy": { code: 55, chapterVerseIndex: [18, 26, 17, 22] },

  Titus: { code: 56, chapterVerseIndex: [16, 15, 15] },

  Philemon: { code: 57, chapterVerseIndex: [25] },

  Hebrews: {
    code: 58,
    chapterVerseIndex: [14, 18, 19, 16, 14, 20, 28, 13, 28, 39, 40, 29, 25],
  },

  James: { code: 59, chapterVerseIndex: [27, 26, 18, 17, 20] },

  "1 Peter": { code: 60, chapterVerseIndex: [25, 25, 22, 19, 14] },

  "2 Peter": { code: 61, chapterVerseIndex: [21, 22, 18] },

  "1 John": { code: 62, chapterVerseIndex: [10, 29, 24, 21, 21] },

  "2 John": { code: 63, chapterVerseIndex: [13] },

  "3 John": { code: 64, chapterVerseIndex: [14] },

  Jude: { code: 65, chapterVerseIndex: [25] },

  Revelation: {
    code: 66,
    chapterVerseIndex: [
      20, 29, 22, 11, 14, 17, 17, 13, 21, 11, 19, 17, 18, 20, 8, 21, 18, 24, 21,
      15, 27, 21,
    ],
  },
};
