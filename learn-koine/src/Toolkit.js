import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectVerseMode, setMode } from "./features/verseSlice";

import "./Toolkit.css";

const tools = [
  "Definite Article",
  "Conjunction",
  "Preposition",
  "Noun and Adjective",
  "Pronoun",
  "Verb",
  "Particle",
  "Adverb",
];

const toolsAbbreviationMap = {
  "Definite Article": "Def Art.",
  Conjunction: "Conj.",
  Preposition: "Prep.",
  "Noun and Adjective": "Noun/\nAdj.",
  Pronoun: "Pron.",
  Verb: "Vrb.",
  Particle: "Part.",
  Adverb: "Adv.",
};

const Toolkit = () => {
  const verseMode = useSelector(selectVerseMode);
  return (
    <div>
      <p className="category-tip">Mode: {verseMode}</p>
      <div className="toolkit-container">
        <br></br>
        {tools.map((tool) => {
          return <Tool title={tool} id={tool} key={tool} />;
        })}
      </div>
      <div className="toolkit-container-abv">
        {tools.map((tool) => {
          return (
            <>
              <Tool title={toolsAbbreviationMap[tool]} id={tool} key={tool} />
            </>
          );
        })}
      </div>
    </div>
  );
};

//individual tools
const Tool = ({ title, id }) => {
  let idCheck = id;
  if (idCheck === "Definite Article") {
    idCheck = "definite-article";
  } else if (idCheck === "Noun and Adjective") {
    idCheck = "Noun-and-Adjective";
  }

  const dispatch = useDispatch();

  const handleClick = () => {
    let nextMode = id;
    if (id === "Definite Article") {
      nextMode = "definite article";
    }
    dispatch(setMode(nextMode));
  };

  return (
    <div className="tool" id={idCheck} onClick={handleClick}>
      <p>{title}</p>
    </div>
  );
};

export default Toolkit;
