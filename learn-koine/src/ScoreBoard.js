// import { useEffect, useState } from "react";
import { selectScoreSlice } from "./features/scoreSlice";
import { useSelector } from "react-redux";

const ScoreBoard = () => {
  const scoreObject = useSelector(selectScoreSlice);
  const { currentScore } = scoreObject;

  return <p>{currentScore}</p>;
};

export default ScoreBoard;
