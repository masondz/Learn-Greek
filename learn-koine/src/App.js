import "./App.css";
import React, { useEffect } from "react";
import Verse from "./Verse";
import { randomVerse, selectVerseSlice } from "./features/verseSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(randomVerse());
  }, [dispatch]);

  const verse = useSelector(selectVerseSlice);

  return (
    <div className="App">
      <header className="App-header">
        <Verse verse={verse} />
      </header>
    </div>
  );
}

export default App;
