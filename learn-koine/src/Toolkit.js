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

  function unselectAllTools() {
    let toolArray = document.getElementsByClassName("selected-tool");
    if (toolArray.length !== 0) {
      console.log(toolArray);
      for (let i = 0; i < toolArray.length; i++) {
        toolArray[i].className = "tool";
      }
    }
    return;
  }

  const handleClick = (e) => {
    let nextMode = id;
    if (id === "Definite Article") {
      nextMode = "definite article";
    }
    unselectAllTools();
    if (e.target.className === "tool") {
      e.target.className = "selected-tool " + idCheck + "-picked";
    }
    dispatch(setMode(nextMode));
  };

  return (
    <div className={"tool"} id={idCheck} onClick={(e) => handleClick(e)}>
      {title}
    </div>
  );
};

export default Toolkit;
