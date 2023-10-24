import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

// import { selectScoreSlice, setScore } from "./features/alphabetSlice";
// import { useSelector, useDispatch } from "react-redux";

const alphabetArray = "αβγδεζηθικλμνξοπρσςτυφχψω";

let shorterArray = [];

for (let i = 0; i < 3; i++) {
  let randomIndex = Math.floor(Math.random() * alphabetArray.length);
  while (shorterArray.includes[alphabetArray[randomIndex]]) {
    randomIndex = Math.floor(Math.random() * alphabetArray.length);
  }

  shorterArray.push(alphabetArray[randomIndex]);
}

const Alphabet = () => {
  const fieldRef = useRef();
  const [fieldWidth, setFieldWidth] = useState(0);

  useEffect(() => {
    setFieldWidth(fieldRef.current.getBoundingClientRect().width);

    //this changes the referenced width of the game field as the window is resized
    const handleResize = () => {
      setFieldWidth(fieldRef.current.getBoundingClientRect().width);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [fieldRef]);

  return (
    <>
      <h1>Alphabet Practice: {shorterArray}</h1>
      <div className="letter-container" ref={fieldRef}>
        <Letter fieldWidth={fieldWidth} />
      </div>
      <Link to={"/"}>home</Link>
    </>
  );
};

const Letter = ({ fieldWidth }) => {
  return (
    <motion.h2
      initial={{ x: 10, y: 100 }}
      animate={{ x: fieldWidth, y: 0 }}
      transition={{ duration: 5 }}
    >
      field width: {fieldWidth}
    </motion.h2>
  );
};

export default Alphabet;
