import React, { useState } from "react";
import "./PickVerse.css";
const PickVerse = () => {
  const [listIsOpen, setListIsOpen] = useState(false);
  const [chapterList, setChapterList] = useState([]);
  const [verseList, setVerseList] = useState([]);

  const [chosenBook, setChosenBook] = useState("");
  const [chosenChapter, setChosenChapter] = useState(0);
  const [chosenVerse, setChosenVerse] = useState(0);

  const bookNames = Object.keys(newTestament);

  const handleOpenList = () => {
    listIsOpen ? setListIsOpen(false) : setListIsOpen(true);
  };

  const handlePickBook = (e) => {
    e.preventDefault();
    const pickedBook = e.target.innerHTML;
    const chaptersArray = [];
    for (let i = 1; i < newTestament[pickedBook].length + 1; i++) {
      chaptersArray.push(i);
    }
    console.log(chaptersArray);
    setChosenBook(pickedBook);
    setChapterList(chaptersArray);
  };

  const handlePickChapter = (e) => {
    e.preventDefault();
    const chapterNumber = e.target.innerHTML - 1;
    const numberOfVerses = newTestament[chosenBook][chapterNumber].verses;
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

  return (
    <div>
      <p onClick={handleOpenList}>
        {chosenBook} {chosenChapter}: {chosenVerse}
      </p>
      {listIsOpen && (
        <div className="pick-verse-menu">
          <div className="book-lists" onClick={handlePickBook}>
            {bookNames.map((book) => {
              return <p>{book}</p>;
            })}
          </div>
          <div className="book-lists" onClick={handlePickChapter}>
            {chapterList.map((chapter) => {
              return <p>{chapter}</p>;
            })}
          </div>
          <div className="book-lists" onClick={handlePickVerse}>
            {verseList.map((verse) => {
              return <p>{verse}</p>;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PickVerse;

const newTestament = {
  Matthew: [
    { chapter: 1, verses: 25 },
    { chapter: 2, verses: 23 },
    { chapter: 3, verses: 17 },
    { chapter: 4, verses: 25 },
    { chapter: 5, verses: 48 },
    { chapter: 6, verses: 34 },
    { chapter: 7, verses: 29 },
    { chapter: 8, verses: 34 },
    { chapter: 9, verses: 38 },
    { chapter: 10, verses: 42 },
    { chapter: 11, verses: 30 },
    { chapter: 12, verses: 50 },
    { chapter: 13, verses: 58 },
    { chapter: 14, verses: 36 },
    { chapter: 15, verses: 39 },
    { chapter: 16, verses: 28 },
    { chapter: 17, verses: 27 },
    { chapter: 18, verses: 35 },
    { chapter: 19, verses: 30 },
    { chapter: 20, verses: 34 },
    { chapter: 21, verses: 46 },
    { chapter: 22, verses: 46 },
    { chapter: 23, verses: 39 },
    { chapter: 24, verses: 51 },
    { chapter: 25, verses: 46 },
    { chapter: 26, verses: 75 },
    { chapter: 27, verses: 66 },
    { chapter: 28, verses: 20 },
  ],
  Mark: [
    { chapter: 1, verses: 45 },
    { chapter: 2, verses: 28 },
    { chapter: 3, verses: 35 },
    { chapter: 4, verses: 41 },
    { chapter: 5, verses: 43 },
    { chapter: 6, verses: 56 },
    { chapter: 7, verses: 37 },
    { chapter: 8, verses: 38 },
    { chapter: 9, verses: 50 },
    { chapter: 10, verses: 52 },
    { chapter: 11, verses: 33 },
    { chapter: 12, verses: 44 },
    { chapter: 13, verses: 37 },
    { chapter: 14, verses: 72 },
    { chapter: 15, verses: 47 },
    { chapter: 16, verses: 20 },
  ],
  Luke: [
    { chapter: 1, verses: 80 },
    { chapter: 2, verses: 52 },
    { chapter: 3, verses: 38 },
    { chapter: 4, verses: 44 },
    { chapter: 5, verses: 39 },
    { chapter: 6, verses: 49 },
    { chapter: 7, verses: 50 },
    { chapter: 8, verses: 56 },
    { chapter: 9, verses: 62 },
    { chapter: 10, verses: 42 },
    { chapter: 11, verses: 54 },
    { chapter: 12, verses: 59 },
    { chapter: 13, verses: 35 },
    { chapter: 14, verses: 35 },
    { chapter: 15, verses: 32 },
    { chapter: 16, verses: 31 },
    { chapter: 17, verses: 37 },
    { chapter: 18, verses: 43 },
    { chapter: 19, verses: 48 },
    { chapter: 20, verses: 47 },
    { chapter: 21, verses: 38 },
    { chapter: 22, verses: 71 },
    { chapter: 23, verses: 56 },
    { chapter: 24, verses: 53 },
  ],

  John: [
    { chapter: 1, verses: 51 },
    { chapter: 2, verses: 25 },
    { chapter: 3, verses: 36 },
    { chapter: 4, verses: 54 },
    { chapter: 5, verses: 47 },
    { chapter: 6, verses: 71 },
    { chapter: 7, verses: 53 },
    { chapter: 8, verses: 59 },
    { chapter: 9, verses: 41 },
    { chapter: 10, verses: 42 },
    { chapter: 11, verses: 57 },
    { chapter: 12, verses: 50 },
    { chapter: 13, verses: 38 },
    { chapter: 14, verses: 31 },
    { chapter: 15, verses: 27 },
    { chapter: 16, verses: 33 },
    { chapter: 17, verses: 26 },
    { chapter: 18, verses: 40 },
    { chapter: 19, verses: 42 },
    { chapter: 20, verses: 31 },
    { chapter: 21, verses: 25 },
  ],

  Acts: [
    { chapter: 1, verses: 26 },
    { chapter: 2, verses: 47 },
    { chapter: 3, verses: 26 },
    { chapter: 4, verses: 37 },
    { chapter: 5, verses: 42 },
    { chapter: 6, verses: 15 },
    { chapter: 7, verses: 60 },
    { chapter: 8, verses: 40 },
    { chapter: 9, verses: 43 },
    { chapter: 10, verses: 48 },
    { chapter: 11, verses: 30 },
    { chapter: 12, verses: 25 },
    { chapter: 13, verses: 52 },
    { chapter: 14, verses: 28 },
    { chapter: 15, verses: 41 },
    { chapter: 16, verses: 40 },
    { chapter: 17, verses: 34 },
    { chapter: 18, verses: 28 },
    { chapter: 19, verses: 41 },
    { chapter: 20, verses: 38 },
    { chapter: 21, verses: 40 },
    { chapter: 22, verses: 30 },
    { chapter: 23, verses: 35 },
    { chapter: 24, verses: 27 },
    { chapter: 25, verses: 27 },
    { chapter: 26, verses: 32 },
    { chapter: 27, verses: 44 },
    { chapter: 28, verses: 31 },
  ],

  Romans: [
    { chapter: 1, verses: 32 },
    { chapter: 2, verses: 29 },
    { chapter: 3, verses: 31 },
    { chapter: 4, verses: 25 },
    { chapter: 5, verses: 21 },
    { chapter: 6, verses: 23 },
    { chapter: 7, verses: 25 },
    { chapter: 8, verses: 39 },
    { chapter: 9, verses: 33 },
    { chapter: 10, verses: 21 },
    { chapter: 11, verses: 36 },
    { chapter: 12, verses: 21 },
    { chapter: 13, verses: 14 },
    { chapter: 14, verses: 23 },
    { chapter: 15, verses: 33 },
    { chapter: 16, verses: 27 },
  ],

  "1 Corinthians": [
    { chapter: 1, verses: 31 },
    { chapter: 2, verses: 16 },
    { chapter: 3, verses: 23 },
    { chapter: 4, verses: 21 },
    { chapter: 5, verses: 13 },
    { chapter: 6, verses: 20 },
    { chapter: 7, verses: 40 },
    { chapter: 8, verses: 13 },
    { chapter: 9, verses: 27 },
    { chapter: 10, verses: 33 },
    { chapter: 11, verses: 34 },
    { chapter: 12, verses: 31 },
    { chapter: 13, verses: 13 },
    { chapter: 14, verses: 40 },
    { chapter: 15, verses: 58 },
    { chapter: 16, verses: 24 },
  ],

  "2 Corinthians": [
    { chapter: 1, verses: 24 },
    { chapter: 2, verses: 17 },
    { chapter: 3, verses: 18 },
    { chapter: 4, verses: 18 },
    { chapter: 5, verses: 21 },
    { chapter: 6, verses: 18 },
    { chapter: 7, verses: 16 },
    { chapter: 8, verses: 24 },
    { chapter: 9, verses: 15 },
    { chapter: 10, verses: 18 },
    { chapter: 11, verses: 33 },
    { chapter: 12, verses: 21 },
    { chapter: 13, verses: 14 },
  ],

  Galatians: [
    { chapter: 1, verses: 24 },
    { chapter: 2, verses: 21 },
    { chapter: 3, verses: 29 },
    { chapter: 4, verses: 31 },
    { chapter: 5, verses: 26 },
    { chapter: 6, verses: 18 },
  ],

  Ephesians: [
    { chapter: 1, verses: 23 },
    { chapter: 2, verses: 22 },
    { chapter: 3, verses: 21 },
    { chapter: 4, verses: 32 },
    { chapter: 5, verses: 33 },
    { chapter: 6, verses: 24 },
  ],

  Philippians: [
    { chapter: 1, verses: 30 },
    { chapter: 2, verses: 30 },
    { chapter: 3, verses: 21 },
    { chapter: 4, verses: 23 },
  ],

  Colossians: [
    { chapter: 1, verses: 29 },
    { chapter: 2, verses: 23 },
    { chapter: 3, verses: 25 },
    { chapter: 4, verses: 18 },
  ],

  "1 Thessalonians": [
    { chapter: 1, verses: 10 },
    { chapter: 2, verses: 20 },
    { chapter: 3, verses: 13 },
    { chapter: 4, verses: 18 },
    { chapter: 5, verses: 28 },
  ],

  "2 Thessalonians": [
    { chapter: 1, verses: 12 },
    { chapter: 2, verses: 17 },
    { chapter: 3, verses: 18 },
  ],

  "1 Timothy": [
    { chapter: 1, verses: 20 },
    { chapter: 2, verses: 15 },
    { chapter: 3, verses: 16 },
    { chapter: 4, verses: 16 },
    { chapter: 5, verses: 25 },
    { chapter: 6, verses: 21 },
  ],

  "2 Timothy": [
    { chapter: 1, verses: 18 },
    { chapter: 2, verses: 26 },
    { chapter: 3, verses: 17 },
    { chapter: 4, verses: 22 },
  ],

  Titus: [
    { chapter: 1, verses: 16 },
    { chapter: 2, verses: 15 },
    { chapter: 3, verses: 15 },
  ],

  Philemon: [{ chapter: 1, verses: 25 }],

  Hebrews: [
    { chapter: 1, verses: 14 },
    { chapter: 2, verses: 18 },
    { chapter: 3, verses: 19 },
    { chapter: 4, verses: 16 },
    { chapter: 5, verses: 14 },
    { chapter: 6, verses: 20 },
    { chapter: 7, verses: 28 },
    { chapter: 8, verses: 13 },
    { chapter: 9, verses: 28 },
    { chapter: 10, verses: 39 },
    { chapter: 11, verses: 40 },
    { chapter: 12, verses: 29 },
    { chapter: 13, verses: 25 },
  ],

  "1 Peter": [
    { chapter: 1, verses: 25 },
    { chapter: 2, verses: 25 },
    { chapter: 3, verses: 22 },
    { chapter: 4, verses: 19 },
    { chapter: 5, verses: 14 },
  ],

  "2 Peter": [
    { chapter: 1, verses: 21 },
    { chapter: 2, verses: 22 },
    { chapter: 3, verses: 18 },
  ],

  "1 John": [
    { chapter: 1, verses: 10 },
    { chapter: 2, verses: 29 },
    { chapter: 3, verses: 24 },
    { chapter: 4, verses: 21 },
    { chapter: 5, verses: 21 },
  ],

  "2 John": [{ chapter: 1, verses: 13 }],

  "3 John": [{ chapter: 1, verses: 14 }],

  Jude: [{ chapter: 1, verses: 25 }],

  Revelation: [
    { chapter: 1, verses: 20 },
    { chapter: 2, verses: 29 },
    { chapter: 3, verses: 22 },
    { chapter: 4, verses: 11 },
    { chapter: 5, verses: 14 },
    { chapter: 6, verses: 17 },
    { chapter: 7, verses: 17 },
    { chapter: 8, verses: 13 },
    { chapter: 9, verses: 21 },
    { chapter: 10, verses: 11 },
    { chapter: 11, verses: 19 },
    { chapter: 12, verses: 17 },
    { chapter: 13, verses: 18 },
    { chapter: 14, verses: 20 },
    { chapter: 15, verses: 8 },
    { chapter: 16, verses: 21 },
    { chapter: 17, verses: 18 },
    { chapter: 18, verses: 24 },
    { chapter: 19, verses: 21 },
    { chapter: 20, verses: 15 },
    { chapter: 21, verses: 27 },
    { chapter: 22, verses: 21 },
  ],
};
