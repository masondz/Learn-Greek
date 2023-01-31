import "./App.css";
import { greekText } from "./greek_text/greekText";
import React, { useEffect } from "react";

const testText = "40001001 Βίβλος γενέσεως";

const organizeText = (text) => {
  let verses = {};
  let key = "";
  let value = "";

  for (let i = 0; i < testText.length; i++) {
    if (isNaN(text[i]) === false) {
      for (let j = 0; j < 8; j++) {
        key += text[i + j];
      }
      console.log(key);
      i += 8;
    }
  }
};

function App() {
  useEffect(() => {
    organizeText(greekText);
  }, []);

  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
}

export default App;
