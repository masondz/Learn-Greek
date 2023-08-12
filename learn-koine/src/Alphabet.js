import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Letter() {
  const [randomLetter, setRandomLetter] = useState("");
  const [randomTime, setRandomTime] = useState("");

  const alphabetArray = "ςερτυθιοπασδφγηξκλζχψωβνμ";
  function generateRandomTime() {
    let newTime = Math.random() * 10000 + 2000;
    return newTime;
  }
  console.log(randomTime);

  function makeRandomLetter() {
    let randomNumber = Math.floor(Math.random() * alphabetArray.length);
    let randomLetter = alphabetArray[randomNumber];
    return randomLetter;
  }

  useEffect(() => {
    let firstLetter = makeRandomLetter();
    let firstTime = generateRandomTime();

    setRandomLetter(firstLetter);
    setRandomTime(firstTime);
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.innerHTML === "α" || e.target.innerHTML === "β") {
      e.target.style.animationPlayState = "paused";
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
    setRandomLetter(newLetter);
    setRandomTime(newTime);
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
  };

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
  const getLetter = document.querySelector(".letter");
  console.log(getLetter);

  return (
    <>
      <h1>Alphabet Practice</h1>
      <div className="letter-container">
        <div className="letter-lane">
          <Letter />
        </div>
        <div className="letter-lane">
          <Letter />
        </div>
        <div className="letter-lane">
          <Letter />
        </div>
        <div className="letter-lane">
          <Letter />
        </div>
        <div className="letter-lane">
          <Letter />
        </div>
        <div className="letter-lane">
          <Letter />
        </div>
      </div>
      <br></br>
      {/* <div>{randomLetter}</div> */}
      <Link to={"/"}>home</Link>
    </>
  );
};

export default Alphabet;
