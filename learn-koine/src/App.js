import "./App.css";
import { greekText } from "./greek_text/greekText";
import React from "react";

const organizeText = (text) => {
  let verses = {};
  let key = "";
  let value = "";

  const textArray = text.split("\n");

  for (let i = 0; i < textArray.length; i++) {
    key = textArray[i].slice(0, 8);
    value = textArray[i].slice(9);
    verses[key] = value;
  }

  return verses;
};

const theText = organizeText(greekText);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>{theText[40001006]}</p>
      </header>
    </div>
  );
}

export default App;
