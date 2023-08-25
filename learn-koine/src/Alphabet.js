import { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { selectScoreSlice, setScore } from "./features/scoreSlice";
import { useSelector, useDispatch } from "react-redux";
// import { greekText } from "./greek_text/greekText";
// import { wordUsages } from "./greek_text/greekLexiconObject";
//Parent component. It passes its width to the child

let theTargetLetter = "α";
let letterIndex = 0;

// let wordsNotInLexicon = [];

// function removePunctuation(str) {
//   const punctuationRegex =
//     /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~˚“‘”’·\d\r\r|\n|\r]/g;
//   const punctuationRemoved = str.replace(punctuationRegex, "");
//   return punctuationRemoved;
// }

// let greekTextArray = greekText.split(" ");
// for (let i = 0; i < greekTextArray.length; i++) {
//   let word = removePunctuation(greekTextArray[i]);
//   let wordLowerCase = word.toLowerCase();
//   if (!(word in wordUsages || wordLowerCase in wordUsages)) {
//     if (!wordsNotInLexicon.includes(word)) wordsNotInLexicon.push(word);
//   }
// }

// let testWord = wordsNotInLexicon[3];
// console.log("Ἀράμ" === testWord);
// console.log(testWord);
// console.log(wordsNotInLexicon[1]);
// console.log(wordsNotInLexicon.length);
// console.log(wordsNotInLexicon.slice(0, 100));

const Alphabet = () => {
  const fieldRef = useRef();
  console.log(fieldRef);
  const [fieldWidth, setFieldWidth] = useState("");
  const [targetLetter, setTargetLetter] = useState("α");

  useEffect(() => {
    setFieldWidth(fieldRef.current.getBoundingClientRect().width);
  }, [fieldWidth]);

  const numberOfLetters = 15;

  const theLetters = Array.from({ length: numberOfLetters }, (_, index) => {
    return (
      <div className="letter-lane" key={index}>
        <Letter
          fieldWidth={fieldWidth}
          key={"letter" + index}
          targetLetter={targetLetter}
          setTargetLetter={setTargetLetter}
        />
      </div>
    );
  });

  const numberOfParticles = 550;

  const particles = Array.from({ length: numberOfParticles }, (_, index) => {
    return <RandomParticle fieldWidth={fieldWidth} key={"particle" + index} />;
  });

  // ////working on canvas
  // const canvas = document.getElementById("canvas");
  // const ctx = canvas.getContext("2d");

  // ctx.beginPath();

  // ctx.moveTo(0, 0);

  // ctx.lineTo(100, 100);

  // ctx.stroke();

  return (
    <>
      <h1>Alphabet Practice</h1>
      <div className="letter-container" ref={fieldRef}>
        {particles}
        {theLetters}
        <canvas id="canvas"></canvas>
      </div>

      <Link to={"/"}>home</Link>
      <ScoreBoard />
    </>
  );
};

function Letter({ fieldWidth }) {
  const alphabetArray = "αβγδεζηθικλμνξοπρσςτυφχψω";
  const letterRef = useRef();

  const stateScore = useSelector(selectScoreSlice);

  const dispatch = useDispatch();

  let coloring = useMemo(() => {
    return [
      { color: "lightblue" },
      { color: "cyan" },
      { color: "lightblue" },
      { color: "cyan" },
    ];
  }, []);

  const coloringTiming = {
    duration: 3000,
    iterations: Infinity,
  };

  const wrongPicking = [{ color: "red" }, { color: "lightred" }];

  const wrongPickingTiming = {
    duration: 2000,
    direction: "normal",
    iterations: 1,
  };

  const [randomLetter, setRandomLetter] = useState(makeRandomLetter());
  const [movingAnimation, setMovingAnimation] = useState(null);
  const [coloringAnimation, setColoringAnimation] = useState(null);

  function generateRandomTime() {
    let newTime = Math.floor(Math.random() * 3000 + 2000);
    return newTime;
  }

  function makeRandomLetter() {
    let randomNumber = Math.floor(Math.random() * alphabetArray.length);
    let randomLetter = alphabetArray[randomNumber];
    return randomLetter;
  }

  function makeRandomStartPoint() {
    let randomPoint = Math.floor(Math.random() * 75);
    return randomPoint;
  }

  function makeRandomEndPoint(width) {
    let randomPoint = width - Math.floor(Math.random() * width);
    let coinToss = Math.random() < 0.5;
    if (coinToss) {
      return randomPoint;
    } else {
      return "-" + randomPoint;
    }
  }

  useEffect(() => {
    const handleNextIteration = (width) => {
      const nextStart = makeRandomStartPoint();
      const nextEnd = makeRandomEndPoint(width);
      const nextLetter = makeRandomLetter();

      setRandomLetter(nextLetter);

      const moving = [
        { bottom: "-55px", left: nextStart + "px" },
        { bottom: "700px", left: nextEnd + "px" },
      ];

      const movingTiming = {
        duration: generateRandomTime(),
        iterations: 1,
      };

      const newMovingAnimation = letterRef.current.animate(
        moving,
        movingTiming
      );
      newMovingAnimation.onfinish = () => {
        handleNextIteration(fieldWidth);
      };
      setMovingAnimation(newMovingAnimation);
    };

    const newColoringAnimation = letterRef.current.animate(
      coloring,
      coloringTiming
    );
    setColoringAnimation(newColoringAnimation);

    if (fieldWidth && letterRef.current) {
      handleNextIteration(fieldWidth);

      return () => {
        movingAnimation?.cancel();
        coloringAnimation.cancel();
      };
    }
    //eslint-disable-next-line
  }, [fieldWidth, coloring]);

  const handleClick = (e) => {
    if (e.target.innerHTML === theTargetLetter) {
      movingAnimation?.pause();
      coloringAnimation.pause();
      e.target.animate(
        [{ color: "greenyellow" }, { color: "greenyellow" }],
        coloringTiming
      );

      let currentScore = stateScore.currentScore + 1;

      if (currentScore === 5) {
        dispatch(setScore(0));
        setTimeout(() => {
          letterIndex += 1;
          if (letterIndex === 25) {
            letterIndex = 0;
          }
          theTargetLetter = alphabetArray[letterIndex];
          movingAnimation.play();
          e.target.animate(coloring, coloringTiming);
        }, 500);
      } else {
        dispatch(setScore(currentScore));
      }
    } else {
      e.target.animate(wrongPicking, wrongPickingTiming);
    }
  };

  return (
    <h1 className="letter" onClick={(e) => handleClick(e)} ref={letterRef}>
      {randomLetter}
    </h1>
  );
}

const RandomParticle = ({ fieldWidth }) => {
  const starRef = useRef();

  let randomX = Math.floor(Math.random() * fieldWidth - 2);
  let randomY = Math.floor(Math.random() * 720);
  let randomTransparency = Math.random();
  let randomDuration = Math.floor(Math.random() * 2000 + 2000);

  let randomWidthHeight = Math.floor(Math.random() * 4);

  let style = {
    position: "absolute",
    left: randomX + "px",
    top: randomY + "px",
    opacity: randomTransparency,
    width: randomWidthHeight,
    height: randomWidthHeight,
  };

  const starShining = [{ opacity: randomTransparency }, { opacity: 0.2 }];

  const starShiningTiming = {
    duration: randomDuration,
    iterations: Infinity,
    direction: "alternate",
  };

  if (starRef.current) {
    starRef.current.animate(starShining, starShiningTiming);
  }

  return <div className="particle" style={style} ref={starRef}></div>;
};

const ScoreBoard = () => {
  const stateScore = useSelector(selectScoreSlice);
  return <div>{stateScore.currentScore}</div>;
};

export default Alphabet;
