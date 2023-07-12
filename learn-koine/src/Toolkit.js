import React from "react";
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
  "definite article": "Def Art.",
  Conjunction: "Conj.",
  Preposition: "Prep.",
  "Noun and Adjective": "Noun/\nAdj.",
  Pronoun: "Pron.",
  Verb: "Vrb.",
  Particle: "Part.",
  Adverb: "Adv.",
};

const Toolkit = () => {
  return (
    <div>
      <div className="toolkit-container">
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
    <div className="tool" id={idCheck} onClick={handleClick}>
      <p>{title}</p>
    </div>
  );
};

export default Toolkit;
