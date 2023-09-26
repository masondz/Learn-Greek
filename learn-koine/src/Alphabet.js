import { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { selectScoreSlice, setScore } from "./features/alphabetSlice";
import { useSelector, useDispatch } from "react-redux";

const alphabetArray = "αβγδεζηθικλμνξοπρσςτυφχψω";

// const alphabetNameArray = [
//   "Alpha",
//   "Beta",
//   "Gamma",
//   "Delta",
//   "Epsilon",
//   "Zeta",
//   "Eta",
//   "Theta",
//   "Iota",
//   "Kappa",
//   "Lambda",
//   "Mu",
//   "Nu",
//   "Xi",
//   "Omicron",
//   "Pi",
//   "Rho",
//   "Sigma",
//   "Tau",
//   "Upsilon",
//   "Phi",
//   "Chi",
//   "Psi",
//   "Omega",
// ];
////////
//////
/////
///
//
//Parent component. It passes its width to the child
const Alphabet = () => {
  const fieldRef = useRef();

  const [letterIndex, setLetterIndex] = useState(0);
  const [fieldWidth, setFieldWidth] = useState("");
  const [targetLetter, setTargetLetter] = useState(alphabetArray[letterIndex]);
  const [masterRandomLetters, setMasterRandomLetters] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setFieldWidth(fieldRef.current.getBoundingClientRect().width);

    console.log("alphabet parent rendered.");
    let firstRandomArray = [targetLetter];

    for (let i = 0; i < 1; i++) {
      let randomIndex = Math.floor(Math.random() * alphabetArray.length);
      while (firstRandomArray.includes[alphabetArray[randomIndex]]) {
        randomIndex = Math.floor(Math.random() * alphabetArray.length);
      }

      firstRandomArray.push(alphabetArray[randomIndex]);
    }
    setMasterRandomLetters(firstRandomArray);
  }, [fieldWidth, targetLetter, dispatch]);

  const numberOfLetters = 3;

  const theLetters = Array.from({ length: numberOfLetters }, (_, index) => {
    return (
      <div className="letter-lane" key={index}>
        <Letter
          fieldWidth={fieldWidth}
          key={"letter" + index}
          targetLetter={targetLetter}
          setTargetLetter={setTargetLetter}
          letterIndex={letterIndex}
          setLetterIndex={setLetterIndex}
          masterRandomLetters={masterRandomLetters}
          setMasterRandomLetters={setMasterRandomLetters}
        />
      </div>
    );
  });

  const numberOfParticles = 550;

  const particles = useMemo(() => {
    return Array.from({ length: numberOfParticles }, (_, index) => {
      return (
        <RandomParticle fieldWidth={fieldWidth} key={"particle" + index} />
      );
    });
  }, [fieldWidth]);

  return (
    <>
      <h1>Alphabet Practice</h1>
      <div className="letter-container" ref={fieldRef}>
        {theLetters}
        {particles}
        <canvas id="canvas"></canvas>
      </div>
      <Link to={"/"}>home</Link>
      <ScoreBoard masterRandomLetters={masterRandomLetters} />{" "}
    </>
  );
};

/////////////
//////////
/////
/////
////
//

function Letter({
  fieldWidth,
  targetLetter,
  setTargetLetter,
  letterIndex,
  setLetterIndex,
  masterRandomLetters,
  setMasterRandomLetters,
}) {
  const letterRef = useRef();

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

  const [movingAnimation, setMovingAnimation] = useState(null);
  const [coloringAnimation, setColoringAnimation] = useState(null);

  function generateRandomTime() {
    let newTime = Math.floor(Math.random() * 3000 + 2000);
    return newTime;
  }

  const [shownLetter, setShownLetter] = useState("j");

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

  function makeRandomArray(theTarget = targetLetter) {
    console.log(targetLetter);
    let nextRandomArray = [theTarget];

    for (let i = 0; i < 1; i++) {
      let randomIndex = Math.floor(Math.random() * alphabetArray.length);
      while (nextRandomArray.includes[alphabetArray[randomIndex]]) {
        randomIndex = Math.floor(Math.random() * alphabetArray.length);
      }

      nextRandomArray.push(alphabetArray[randomIndex]);
    }

    return nextRandomArray;
  }

  function makeRandomLetter(sourceArray) {
    let randomNumber = Math.floor(Math.random() * sourceArray.length);
    let randomLetter = sourceArray[randomNumber];
    return randomLetter;
  }

  const handleNextIteration = (width, passedLetter) => {
    const nextIterationArray = makeRandomArray(passedLetter);
    const nextStart = makeRandomStartPoint();
    const nextEnd = makeRandomEndPoint(width);
    const nextLetter = makeRandomLetter(nextIterationArray);

    setShownLetter(nextLetter);

    const moving = [
      { bottom: "-55px", left: nextStart + "px" },
      { bottom: "700px", left: nextEnd + "px" },
    ];

    const movingTiming = {
      duration: generateRandomTime(),
      iterations: 1,
    };

    const newMovingAnimation = letterRef.current.animate(moving, movingTiming);
    newMovingAnimation.onfinish = () => {
      handleNextIteration(fieldWidth);
    };
    setMovingAnimation(newMovingAnimation);
  };

  useEffect(() => {
    const newColoringAnimation = letterRef.current.animate(
      coloring,
      coloringTiming
    );
    setColoringAnimation(newColoringAnimation);

    if (fieldWidth && letterRef.current) {
      handleNextIteration(fieldWidth, targetLetter);

      return () => {
        movingAnimation?.cancel();
        coloringAnimation?.cancel();
      };
    }
    //eslint-disable-next-line
  }, [fieldWidth, coloring]);

  let score = useSelector(selectScoreSlice);

  const handleClick = (e) => {
    if (e.target.innerHTML === targetLetter || e.target.innerHTML === "α") {
      movingAnimation?.pause();
      coloringAnimation.pause();
      e.target.animate(
        [{ color: "greenyellow" }, { color: "greenyellow" }],
        coloringTiming
      );

      let currentScore = score.currentScore + 1;
      if (currentScore === 5) {
        dispatch(setScore(0));
        setTimeout(() => {
          let nextIndex = letterIndex + 1;
          if (nextIndex === 25) {
            nextIndex = 0;
          }
          let nextLetter = alphabetArray[nextIndex];
          movingAnimation.play();
          e.target.animate(coloring, coloringTiming);
          setLetterIndex(nextIndex);
          setTargetLetter(nextLetter);
          setMasterRandomLetters(makeRandomArray(nextLetter));
          // dispatch(setRandomLetters(makeRandomArray()));
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
      {shownLetter}
    </h1>
  );
}

///////////
//////////
/////////
////////
//////

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

//////
/////
///
///
//

const ScoreBoard = ({ masterRandomLetters }) => {
  const stateScore = useSelector(selectScoreSlice);
  return (
    <div>
      {stateScore.currentScore}
      {alphabetArray[0]}
      {masterRandomLetters[0]}
    </div>
  );
};

export default Alphabet;
