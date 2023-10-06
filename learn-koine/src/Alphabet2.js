import { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import {
  selectScoreSlice,
  setScore,
  selectRandomLetters,
  setRandomLetters,
} from "./features/alphabetSlice";
import { useSelector, useDispatch } from "react-redux";

const alphabetArray = "αβγδεζηθικλμνξοπρσςτυφχψω";

let shorterArray = [];

for (let i = 0; i < 1; i++) {
  let randomIndex = Math.floor(Math.random() * alphabetArray.length);
  while (shorterArray.includes[alphabetArray[randomIndex]]) {
    randomIndex = Math.floor(Math.random() * alphabetArray.length);
  }

  shorterArray.push(alphabetArray[randomIndex]);
}

const Alphabet = () => {
  return (
    <>
      <h1>Alphabet Practice: {shorterArray}</h1>
      <div className="letter-container" ref={fieldRef}>
        <Letter />
        <canvas id="canvas"></canvas>
      </div>
    </>
  );
};

const Letter = () => {
  return <h1>letter</h1>;
};
