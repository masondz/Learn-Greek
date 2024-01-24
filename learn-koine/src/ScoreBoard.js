import { useState } from "react";
import { selectScoreSlice } from "./features/scoreSlice";
import { useSelector } from "react-redux";
import { getOrSetHighScore } from "./utils";
import { selectVerseReference } from "./features/verseSlice";

const ScoreBoard = () => {
  const scoreObject = useSelector(selectScoreSlice);
  const { currentScore } = scoreObject;
  const [highScore] = useState(
    getOrSetHighScore(useSelector(selectVerseReference))
  );

  return (
    <p>
      High Score: {highScore} - Current Score: {currentScore}
    </p>
  );
};

export default ScoreBoard;
