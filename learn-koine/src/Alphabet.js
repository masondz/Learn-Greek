import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Letter({ fieldWidth, animationStyles }) {
  const [randomLetter, setRandomLetter] = useState("");
  const [randomTime, setRandomTime] = useState("");
  const [randomStartPoint, setRandomStartPoint] = useState("");

  const letterRef = useRef();

  const alphabetArray = "ασβμ";
  function generateRandomTime() {
    let newTime = Math.random() * 3000 + 2000;
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
  // const [randomEndPoint, setRandomEndPoint] = useState("");

  /*
  @keyframes move {
  0% {
    bottom: -55px;
  }
  100% {
    left: var(--random-end);
    bottom: 700px;
  }
  */

  const moving = [
    { bottom: "-55px", left: randomStartPoint + "px" },
    { bottom: "700px", left: "0px" },
  ];

  const movingTiming = {
    duration: randomTime,
    iterations: Infinity,
  };

  const coloring = [
    { color: "lightblue" },
    { color: "cyan" },
    { color: "lightblue" },
    { color: "cyan" },
  ];

  const coloringTiming = {
    duration: 3000,
    iterations: Infinity,
  };

  if (fieldWidth && letterRef) {
    let newEndPoint = makeRandomEndPoint(fieldWidth);
    let newStartPoint = makeRandomStartPoint();
    console.log("field width from Letter: " + newEndPoint);
    moving[0].left = newStartPoint + "px";
    moving[1].left = newEndPoint + "px";
    letterRef.current.animate(moving, movingTiming);
    letterRef.current.animate(coloring, coloringTiming);
    console.log("start: " + newStartPoint, "stop: " + newEndPoint);
  }

  // const [coloring, coloringTiming] = animationStyles;

  useEffect(() => {
    let firstLetter = makeRandomLetter();
    let firstTime = generateRandomTime();
    // let startPoint = makeRandomStartPoint();
    // let endPoint = makeRandomEndPoint(fieldWidth);
    setRandomLetter(firstLetter);
    setRandomTime(firstTime);
    // setRandomStartPoint(startPoint);
    // setRandomEndPoint(endPoint);
  }, [fieldWidth]);

  const handleClick = (e) => {
    console.log(e.target.getAnimations());
    e.preventDefault();
    if (e.target.innerHTML === "α" || e.target.innerHTML === "β") {
      // e.target.style.animationPlayState = "paused";
      e.target.animate(moving, movingTiming).pause();
      e.target.style.color = "greenyellow";
      return;
    } else {
      console.log("wrong!");
    }
  };

  const handleAnimationIteration = (e) => {
    e.target.style.animationName = "none";
    let newLetter = makeRandomLetter();
    let newTime = generateRandomTime();
    let newStartPoint = makeRandomStartPoint();
    setRandomLetter(newLetter);
    setRandomTime(newTime);
    setRandomStartPoint(newStartPoint);
    setTimeout(() => {
      e.target.style.animationName = "move";
    }, 500);
  };

  // const animationStyle = {
  //   animationName: "move",
  //   animationDuration: randomTime + "ms",
  //   animationTimingFunction: "linear",
  //   animationDelay: "0s",
  //   animationIterationCount: "infinite",
  //   animationFillMode: "forwards",
  //   left: randomStartPoint + "%",
  // };

  // const flyingLetter = [{ bottom: "-55px" }, { bottom: "700px" }];

  // const flyingLetterTiming = {
  //   duration: randomTime,
  //   iterations: Infinity,
  // };

  return (
    <h1
      className="letter"
      // style={animationStyle}
      onClick={(e) => handleClick(e)}
      onAnimationIteration={(e) => handleAnimationIteration(e)}
      ref={letterRef}
    >
      {randomLetter}
    </h1>
  );
}

const Alphabet = () => {
  const fieldRef = useRef();
  const [fieldWidth, setFieldWidth] = useState("");

  // let
  useEffect(() => {
    console.log(fieldRef);
    setFieldWidth(fieldRef.current.getBoundingClientRect().width);
    console.log(fieldWidth);
  }, [fieldWidth]);

  const checkWidth = () => {
    console.log(fieldRef.current.getBoundingClientRect().width);
  };

  return (
    <>
      <h1>Alphabet Practice</h1>
      <div className="letter-container" ref={fieldRef}>
        <div className="letter-lane" onClick={checkWidth}>
          <Letter
            // animationStyles={[coloring, coloringTiming]}
            fieldWidth={fieldWidth}
            key="fist"
          />
        </div>
        <div className="letter-lane" onClick={checkWidth}>
          <Letter
            // animationStyles={[coloring, coloringTiming]}
            fieldWidth={fieldWidth}
            key="second"
          />
        </div>
        <div className="letter-lane" onClick={checkWidth}>
          <Letter
            // animationStyles={[coloring, coloringTiming]}
            fieldWidth={fieldWidth}
            key="third"
          />
        </div>
      </div>
      <br></br>
      {/* <div>{randomLetter}</div> */}
      <Link to={"/"}>home</Link>
    </>
  );
};

export default Alphabet;
