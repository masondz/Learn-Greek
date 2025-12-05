import { motion, useAnimationControls } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

// import {
//   selectScoreSlice,
//   setScore,
//   setRandomLetter,
// } from "./features/alphabetSlice";
// import { useSelector, useDispatch } from "react-redux";

const Alphabet = () => {
  const alphabetArray = "αβγδεζηθικλμνξοπρσςτυφχψω";

  const fieldRef = useRef();
  const [fieldWidth, setFieldWidth] = useState(0);
  const [targetLetter, setTargetLetter] = useState("");
  const [letterIndex, setLetterIndex] = useState(0);
  const [shorterArray, setShorterArray] = useState([]);

  useEffect(() => {
    let initialArray = [];

    for (let i = 0; i < 3; i++) {
      let randomIndex = Math.floor(Math.random() * alphabetArray.length);
      while (initialArray.includes[alphabetArray[randomIndex]]) {
        randomIndex = Math.floor(Math.random() * alphabetArray.length);
      }

      initialArray.push(alphabetArray[randomIndex]);
    }

    setTargetLetter(alphabetArray[letterIndex]);
    initialArray.push(alphabetArray[letterIndex]);
    setShorterArray(initialArray);
    setFieldWidth(fieldRef.current.getBoundingClientRect().width);

    //this changes the referenced width of the game field as the window is resized
    const handleResize = () => {
      setFieldWidth(fieldRef.current.getBoundingClientRect().width);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [fieldRef, letterIndex, targetLetter]);

  let numberOfLetters = 10;

  const theLetters = Array.from({ length: numberOfLetters }, (_, index) => {
    return (
      <div className="letter-lane" key={index}>
        <Letter
          fieldWidth={fieldWidth}
          shorterArray={shorterArray}
          key={"letter" + index}
        />
      </div>
    );
  });

  return (
    <>
      <h1>Alphabet Practice: {shorterArray}</h1>
      <div className="letter-container" ref={fieldRef}>
        {theLetters}
      </div>
      <Link to={"/"}>home</Link>
    </>
  );
};

const Letter = ({ fieldWidth, shorterArray }) => {
  function generateRandomTime() {
    let newTime = Math.floor(Math.random() * 3 + 2);
    return newTime;
  }

  const makeRandomLetter = useCallback(() => {
    return shorterArray[Math.floor(Math.random() * shorterArray.length)];
  }, [shorterArray]);

  function makeRandomStartPoint() {
    let randomXPoint = Math.floor(Math.random() * 75);
    let randomYPoint = Math.random() + 700;
    console.log(randomYPoint);
    return { randX: randomXPoint, randY: randomYPoint };
  }

  function makeRandomEndPoint(width) {
    let randomPoint = width - Math.floor(Math.random() * width);
    let randomYpoint = Math.random() - 150;
    console.log(randomYpoint);
    let coinToss = Math.random() < 0.5;
    if (coinToss) {
      return { randX: randomPoint, randY: randomYpoint };
    } else {
      return { randX: Number("-" + randomPoint), randY: randomYpoint };
    }
  }

  const [randomLetter, setRandomLetter] = useState("");
  const [randomTime, setRandomTime] = useState(0);
  const [randomStart, setRandomStart] = useState(0);
  const [randomEnd, setRandomEnd] = useState(0);
  const [yStart, setYStart] = useState(0);
  const [yEnd, setYEnd] = useState(0);

  const controls = useAnimationControls();

  const handleClick = () => {
    controls.stop();
  };

  const generateRandomValues = () => {
    const nextRandomStart = makeRandomStartPoint();
    setRandomStart(nextRandomStart.randX);
    setYStart(nextRandomStart.randY);
    const nextRandomEnd = makeRandomEndPoint(fieldWidth);
    setRandomEnd(nextRandomEnd.randX);
    setYEnd(nextRandomEnd.randY);
    const nextRandomLetter = makeRandomLetter();
    setRandomLetter(nextRandomLetter);
    const newRandomTime = generateRandomTime();
    setRandomTime(newRandomTime);
    return newRandomTime;
  };

  useEffect(() => {
    // Initial animation
    generateRandomValues();

    let animationTimeout;

    const handleRepeat = () => {
      const newRandomTime = generateRandomValues();

      // Clear any previous timeouts
      if (animationTimeout) {
        clearTimeout(animationTimeout);
      }

      animationTimeout = setTimeout(() => {
        handleRepeat();
      }, newRandomTime * 1000);
    };

    animationTimeout = setTimeout(() => {
      handleRepeat();
    }, randomTime * 1000);

    return () => {
      if (animationTimeout) {
        clearTimeout(animationTimeout);
      }
    };
  }, [makeRandomLetter, fieldWidth]);

  return (
    <motion.h2
      animate={{
        x: [randomStart, randomEnd],
        y: [yStart, yEnd],
        controls,
      }}
      transition={{ duration: randomTime }}
      onClick={handleClick()}
    >
      {randomLetter}
    </motion.h2>
  );
};

export default Alphabet;
