import { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import "./App.css";

//Parent component. It passes its width to the child
const Alphabet = () => {
  const fieldRef = useRef();
  console.log(fieldRef);
  const [fieldWidth, setFieldWidth] = useState("");

  useEffect(() => {
    setFieldWidth(fieldRef.current.getBoundingClientRect().width);
  }, [fieldWidth]);

  const checkWidth = () => {
    console.log(fieldRef.current.getBoundingClientRect().width);
  };

  return (
    <>
      <h1>Alphabet Practice</h1>
      <div className="letter-container" ref={fieldRef}>
        <div className="letter-lane" onClick={checkWidth}>
          <Letter fieldWidth={fieldWidth} key="fist" />
        </div>
        <div className="letter-lane" onClick={checkWidth}>
          <Letter fieldWidth={fieldWidth} key="fist" />
        </div>
        <div className="letter-lane" onClick={checkWidth}>
          <Letter fieldWidth={fieldWidth} key="fist" />
        </div>
        <div className="letter-lane" onClick={checkWidth}>
          <Letter fieldWidth={fieldWidth} key="fist" />
        </div>
        <div className="letter-lane" onClick={checkWidth}>
          <Letter fieldWidth={fieldWidth} key="fist" />
        </div>
      </div>

      <Link to={"/"}>home</Link>
    </>
  );
};

function Letter({ fieldWidth }) {
  const alphabetArray = "αβ123xz89";
  const letterRef = useRef();

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
    if (e.target.innerHTML === "α" || e.target.innerHTML === "β") {
      movingAnimation?.pause();
      coloringAnimation.pause();
      e.target.animate(
        [{ color: "greenyellow" }, { color: "greenyellow" }],
        coloringTiming
      );
    } else {
      console.log("wrong!");
    }
  };

  return (
    <h1 className="letter" onClick={(e) => handleClick(e)} ref={letterRef}>
      {randomLetter}
    </h1>
  );
}

export default Alphabet;
