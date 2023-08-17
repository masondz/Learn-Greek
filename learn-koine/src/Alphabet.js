import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Letter({ fieldWidth, animationStyles }) {
  const [randomLetter, setRandomLetter] = useState("");
  const [randomTime, setRandomTime] = useState("");
  const [randomStartPoint, setRandomStartPoint] = useState("");
  const [randomEndPoint, setRandomEndPoint] = useState("");

  const letterRef = useRef();

  const alphabetArray = "αβ";
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

  const handleAnimationIteration = (e) => {
    let newLetter = makeRandomLetter();
    let newTime = generateRandomTime();
    let newStartPoint = makeRandomStartPoint();
    setRandomLetter(newLetter);
    setRandomTime(newTime);
    setRandomStartPoint(newStartPoint);
  };

  let movingElement;
  let coloringElement;

  useEffect(() => {
    let firstLetter = makeRandomLetter();
    let firstTime = generateRandomTime();
    let firstStartPoint = makeRandomStartPoint();
    setRandomLetter(firstLetter);
    setRandomTime(firstTime);
    setRandomStartPoint(firstStartPoint);
    let firstEndPoint = makeRandomEndPoint(fieldWidth);

    setRandomEndPoint(firstEndPoint);
  }, [fieldWidth]);

  if (fieldWidth && letterRef) {
    console.log("field width from Letter: " + randomStartPoint);
    moving[0].left = randomStartPoint + "px";
    moving[1].left = randomEndPoint + "px";

    movingElement = letterRef.current.animate(moving, movingTiming);
    coloringElement = letterRef.current.animate(coloring, coloringTiming);
    console.log("start: " + randomStartPoint, "stop: " + randomEndPoint);
  }

  const handleClick = (e) => {
    console.log(movingElement.playState);
    if (e.target.innerHTML === "α" || e.target.innerHTML === "β") {
      movingElement.pause();
      coloringElement.pause();
      return;
    } else {
      console.log("wrong!");
    }
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
        {/*<div className="letter-lane" onClick={checkWidth}>
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
        </div> */}
      </div>
      <br></br>
      {/* <div>{randomLetter}</div> */}
      <Link to={"/"}>home</Link>
    </>
  );
};

export default Alphabet;

// let exampleRef = useRef(null);

// let Child = ({ example }) => {
//   const [variable, setVariable] = useState("");

//   function changeVariable(e) {
//     return e;
//   }

//   useEffect(() => {
//     let newTest = changeVariable(example);
//     setVariable(newTest);
//     console.log();
//   });
// };
