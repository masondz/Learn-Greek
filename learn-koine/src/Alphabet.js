import { createElement, useEffect, useState } from "react";
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
    console.log(e.target.style);
    e.target.animationName = "blank";
    let newLetter = makeRandomLetter();
    let newTime = generateRandomTime();
    setTimeout(() => {
      setRandomLetter(newLetter);
      setRandomTime(newTime);
      e.target.className = "letter";
    }, 10);
    // const currentAnimationName = e.target.style.animationName;
    // e.target.style.animationName = "";
    // requestAnimationFrame(() => {
    //   e.target.style.animationName = currentAnimationName;
    // });
    // e.target.style.animationName = currentAnimationName;
    // console.log(e.target.style);
    return;
  };

  return createElement(
    "h1",
    {
      className: "letter",
      style: {
        animationName: "move",
        animationDuration: randomTime + "ms",
        animationTimingFunction: "linear",
        animationDelay: "0s",
        animationIterationCount: "infinite",
        animationFillMode: "forwards",
      },
      onClick: (e) => handleClick(e),
    },
    createElement("i", null, randomLetter)
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
