// import { useState } from "react";
import { selectScoreSlice } from "./features/scoreSlice";
import { useSelector } from "react-redux";
import { getOrSetHighScore } from "./utils";
import { selectVerseReference } from "./features/verseSlice";
import "./scoreboard.css";

const ScoreBoard = () => {
  const scoreObject = useSelector(selectScoreSlice);
  const { currentScore } = scoreObject;
  const highScore = getOrSetHighScore(useSelector(selectVerseReference));

  return (
    <div className="score-board">
      <h2> Score: {currentScore}</h2> <h2>|</h2>
      <h2>Best: {highScore}</h2>
    </div>
  );
};

export default ScoreBoard;
