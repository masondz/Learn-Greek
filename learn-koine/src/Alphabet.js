import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Letter({ fieldWidth, animationStyles }) {
  const [randomLetter, setRandomLetter] = useState("");
  const [randomTime, setRandomTime] = useState("");
  const [randomStartPoint, setRandomStartPoint] = useState("");

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

  // const [coloring, coloringTiming] = animationStyles;

  useEffect(() => {
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
    let firstLetter = makeRandomLetter();
    let firstTime = generateRandomTime();
    let startPoint = makeRandomStartPoint();
    setRandomLetter(firstLetter);
    setRandomTime(firstTime);
    setRandomStartPoint(startPoint);

    const matches = document.querySelectorAll(".letter");
    matches.forEach((element) => {
      element.animate(coloring, coloringTiming);
    });
  }, []);

  const handleClick = (e) => {
    console.log(e.target.getAnimations());
    e.preventDefault();
    if (e.target.innerHTML === "α" || e.target.innerHTML === "β") {
      e.target.style.animationPlayState = "paused";
      // e.target.animate(coloring, coloringTiming).pause();
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

  const animationStyle = {
    animationName: "move",
    animationDuration: randomTime + "ms",
    animationTimingFunction: "linear",
    animationDelay: "0s",
    animationIterationCount: "infinite",
    animationFillMode: "forwards",
    left: randomStartPoint + "%",
  };

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

  // const flyingLetter = [{ bottom: "-55px" }, { bottom: "700px" }];

  // const flyingLetterTiming = {
  //   duration: randomTime,
  //   iterations: Infinity,
  // };

  return (
    <h1
      className="letter"
      style={animationStyle}
      onClick={(e) => handleClick(e)}
      onAnimationIteration={(e) => handleAnimationIteration(e)}
    >
      {randomLetter}
    </h1>
  );
}

const Alphabet = () => {
  const fieldWidth = useRef();

  const checkWidth = () => {
    console.log(fieldWidth.current.getBoundingClientRect().width);
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

  // const coloring = [
  //   { color: "lightblue" },
  //   { color: "cyan" },
  //   { color: "lightblue" },
  //   { color: "cyan" },
  // ];

  // const coloringTiming = {
  //   duration: 3000,
  //   iterations: Infinity,
  // };

  // useEffect(() => {
  //   const matches = document.querySelectorAll(".letter");
  //   matches.forEach((element) => {
  //     element.animate(coloring, coloringTiming);
  //   });
  // });

  return (
    <>
      <h1>Alphabet Practice</h1>
      <div className="letter-container" ref={fieldWidth} onClick={checkWidth}>
        <div className="letter-lane">
          <Letter
            // animationStyles={[coloring, coloringTiming]}
            fieldWidth={fieldWidth}
          />
        </div>
        <div className="letter-lane">
          <Letter
          // animationStyles={[coloring, coloringTiming]}
          />
        </div>
        <div className="letter-lane">
          <Letter
          // animationStyles={[coloring, coloringTiming]}
          />
        </div>
        <div className="letter-lane">
          <Letter
          // animationStyles={[coloring, coloringTiming]}
          />
        </div>
        <div className="letter-lane">
          <Letter
          // animationStyles={[coloring, coloringTiming]}
          />
        </div>
        <div className="letter-lane">
          <Letter
          // animationStyles={[coloring, coloringTiming]}
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
