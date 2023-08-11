import { createElement } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Greeting() {
  const alphabetArray = "ςερτυθιοπασδφγηξκλζχψωβνμ";
  const randomTime = Math.random() * 10000 + 2000;
  console.log(randomTime);

  let randomNumber = Math.floor(Math.random() * alphabetArray.length);
  let randomLetter = alphabetArray[randomNumber];

  const handleClick = (e) => {
    return e.target.remove();
  };

  return createElement(
    "h1",
    {
      className: "letter",
      style: {
        animation: `move ${randomTime}ms linear 0s 2`,
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
          <Greeting />
        </div>
        <div className="letter-lane">
          <Greeting />
        </div>
        <div className="letter-lane">
          <Greeting />
        </div>
        <div className="letter-lane">
          <Greeting />
        </div>
        <div className="letter-lane">
          <Greeting />
        </div>
        <div className="letter-lane">
          <Greeting />
        </div>
      </div>
      <br></br>
      {/* <div>{randomLetter}</div> */}
      <Link to={"/"}>home</Link>
    </>
  );
};

export default Alphabet;
