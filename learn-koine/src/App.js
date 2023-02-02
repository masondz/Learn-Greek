import "./App.css";
import { greekText } from "./greek_text/greekText";
import React from "react";
import Verse from "./Verse";

const organizeText = (text) => {
  let verses = [];
  let key = "";
  let value = "";

  const textArray = text.split("\n");

  for (let i = 0; i < textArray.length; i++) {
    key = textArray[i].slice(0, 8);
    value = textArray[i].slice(9);
    verses.push({ index: i, reference: key, verse: value });
  }
  return verses;
};

const theText = organizeText(greekText);

const getRandomVerse = () => {
  let randomIndex = Math.floor(Math.random() * theText.length + 1);
  return theText[randomIndex].verse;
};

let verse = getRandomVerse();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Verse verse={verse} />
        <button>New Verse</button>
      </header>
    </div>
  );
}

export default App;
