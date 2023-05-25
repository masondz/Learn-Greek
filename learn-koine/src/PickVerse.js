import React, { useState } from "react";
import "./PickVerse.css";
import { organizeText } from "./features/verseSlice";
import { greekText } from "./greek_text/greekText";
import { useDispatch } from "react-redux";
import { setVerse } from "./features/verseSlice";

const PickVerse = () => {
  const [bookListIsOpen, setBookListIsOpen] = useState(false);
  const [chapterListIsOpen, setChapterListIsOpen] = useState(false);
  const [verseListIsOpen, setVerseListIsOpen] = useState(false);
  const [chapterList, setChapterList] = useState([]);
  const [verseList, setVerseList] = useState([]);

  const [chosenBook, setChosenBook] = useState("");
  const [chosenChapter, setChosenChapter] = useState(0);
  const [chosenVerse, setChosenVerse] = useState(0);

  const dispatch = useDispatch();

  const bookNames = Object.keys(newTestament);

  const handlePickBook = (e) => {
    e.preventDefault();
    const pickedBook = e.target.innerHTML;
    const chaptersArray = [];
    for (
      let i = 1;
      i < newTestament[pickedBook].chapterVerseIndex.length + 1;
      i++
    ) {
      chaptersArray.push(i);
    }
    console.log(chaptersArray);
    setChosenBook(pickedBook);
    setChapterList(chaptersArray);
  };

  const handlePickChapter = (e) => {
    e.preventDefault();
    const chapterNumber = e.target.innerHTML;
    const numberOfVerses =
      newTestament[chosenBook].chapterVerseIndex[chapterNumber - 1];
    const versesArray = [];

    for (let i = 1; i < numberOfVerses + 1; i++) {
      versesArray.push(i);
    }

    setChosenChapter(chapterNumber);
    setVerseList(versesArray);
  };

  const handlePickVerse = (e) => {
    e.preventDefault();
    setChosenVerse(e.target.innerHTML);
  };

  //"40 0 01 0 01 Βίβλος γενέσεως ˚Ἰησοῦ ˚Χριστοῦ, υἱοῦ Δαυὶδ, υἱοῦ Ἀβραάμ:"

  /*
  const decodeReference = (ref) => {
  //book
  let bookIndex = ref.slice(0, 2) - 40;
  //chapter
  let chapterNumber = ref.slice(3, 5);
  if (chapterNumber[0] === "0") {
    chapterNumber = chapterNumber[1];
  }
  //verse
  let verseNumber = ref.slice(6, 9);
  return {
    bookIndex: bookIndex,
    chapterNumber: chapterNumber,
    verseNumber: verseNumber,
  };
};
  */

  //this will turn the selected book chapter and verse into its reference code in the grktext
  const encodeReference = () => {
    if (!chosenBook || !chosenChapter || !chosenVerse) {
      return;
    }
    let bookCode = newTestament[chosenBook].code;
    let tempChapter = "";
    let tempVerse = "";

    if (chosenChapter < 10) {
      tempChapter = "0" + chosenChapter;
    } else {
      tempChapter = chosenChapter;
    }

    if (chosenVerse < 10) {
      tempVerse = "0" + chosenVerse;
    } else {
      tempVerse = chosenVerse;
    }
    let reference = bookCode + "0" + tempChapter + "0" + tempVerse;
    lookUpVerse(reference);
  };

  const lookUpVerse = (ref) => {
    setBookListIsOpen(false);
    setChapterListIsOpen(false);
    setVerseListIsOpen(false);
    let allVerses = organizeText(greekText);
    const verse = allVerses[ref];
    const payload = [ref, verse];
    console.log(payload);
    dispatch(setVerse(payload));
  };

  const handleOpenBookList = () => {
    bookListIsOpen ? setBookListIsOpen(false) : setBookListIsOpen(true);
  };
  const handleOpenChapterList = () => {
    chapterListIsOpen
      ? setChapterListIsOpen(false)
      : setChapterListIsOpen(true);
  };
  const handleOpenVerseList = () => {
    verseListIsOpen ? setVerseListIsOpen(false) : setVerseListIsOpen(true);
  };

  return (
    <div className="pick-component">
      <div className="pick-verse-menu">
        <div className="drop-lists">
          <button onClick={handleOpenBookList} className="booklist-button">
            {chosenBook ? chosenBook : "Select Book"}
          </button>
        </div>
        <div className="drop-lists">
          <button
            onClick={handleOpenChapterList}
            className="chapterlist-button"
          >
            {chosenChapter ? chosenChapter : "Select Chapter"}
          </button>
        </div>
        <div className="drop-lists">
          <button onClick={handleOpenVerseList} className="verselist-button">
            {chosenVerse ? chosenVerse : "Select Verse"}
          </button>
        </div>
        <button className="go-button" onClick={encodeReference}>
          Go
        </button>
      </div>{" "}
      <div className="lists-container">
        {bookListIsOpen && (
          <div className="lists" id="book-list">
            {bookNames.map((book) => {
              return (
                <div
                  className="list-option"
                  value={book}
                  onClick={handlePickBook}
                >
                  {book}
                </div>
              );
            })}
          </div>
        )}
        {chapterListIsOpen && (
          <div className="lists" id="chapter-list">
            {chapterList.map((chapter) => {
              return (
                <div
                  className="list-option"
                  value={chapter}
                  onClick={handlePickChapter}
                >
                  {chapter}
                </div>
              );
            })}
          </div>
        )}
        {verseListIsOpen && (
          <div className="lists" id="verse-list">
            {verseList.map((verse) => {
              return (
                <div
                  className="list-option"
                  value={verse}
                  onClick={handlePickVerse}
                >
                  {verse}
                </div>
              );
            })}
          </div>
        )}
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
      45, 28, 35, 41, 43, 56, 37, 38, 50, 52, 33, 44, 37, 72, 47, 20,
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

  "2 Corinthians.": {
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
