import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setMode } from "./features/verseSlice";

import "./Toolkit.css";

const tools = [
  "definite article",
  "Conjunction",
  "Preposition",
  "Noun and Adjective",
  "Pronoun",
  "Verb",
  "Particle",
  "Adverb",
];

const toolsAbbreviationMap = {
  "definite article": "D. A.",
  Conjunction: "Conj.",
  Preposition: "Prep.",
  "Noun and Adjective": "N. A.",
  Pronoun: "Pron",
  Verb: "Vrb",
  Particle: "Part.",
  Adverb: "Adv.",
};

const Toolkit = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 836);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="toolkit-container">
      {tools.map((tool) => {
        return isMobile ? (
          <Tool title={toolsAbbreviationMap[tool]} id={tool} />
        ) : (
          <Tool title={tool} id={tool} />
        );
      })}
    </div>
  );
};

//individual tools
const Tool = ({ title, id }) => {
  let idCheck = id;
  if (idCheck === "definite article") {
    idCheck = "definite-article";
  } else if (idCheck === "Noun and Adjective") {
    idCheck = "Noun-and-Adjective";
  }

  const dispatch = useDispatch();

  const handleClick = () => {
    let nextMode = id;
    dispatch(setMode(nextMode));
  };

  return (
    <div className="tool" id={idCheck} key={title} onClick={handleClick}>
      <p>{title}</p>
    </div>
  );
};

export default Toolkit;
