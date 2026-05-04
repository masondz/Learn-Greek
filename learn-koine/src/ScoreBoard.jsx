import { useState, useEffect } from "react";
import { selectScoreSlice } from "./features/scoreSlice";
import { useSelector } from "react-redux";
import { getOrSetHighScore } from "./utils";
import { selectVerseReference } from "./features/verseSlice";
import "./scoreboard.css";

const ScoreBoard = () => {
  const scoreObject = useSelector(selectScoreSlice);
  const { currentScore } = scoreObject;
  const verseReference = useSelector(selectVerseReference);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const fetchHighScore = async () => {
      const score = await getOrSetHighScore(verseReference);
      setHighScore(score);
    };
    
    if (verseReference) {
      fetchHighScore();
    }
  }, [verseReference, currentScore]);

  return (
    <div className="score-board">
      <h2> Score: {currentScore}</h2> <h2>|</h2>
      <h2>Best: {highScore}</h2>
    </div>
  );
};

export default ScoreBoard;
