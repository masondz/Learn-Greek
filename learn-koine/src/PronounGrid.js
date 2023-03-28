import "./Word.css";
import { selectWordSlice } from "./features/wordSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { greekPronouns } from "./greek_text/greekPronouns";

const PronounGrid = ({ reset }) => {
  const word = useSelector(selectWordSlice);

  const checkCase = (e) => {
    let choice = e.target.innerHTML;
    if (choice === greekPronouns[word.word]) {
      console.log("correct!");
      e.target.className = e.target.className + " correct";
    } else {
      console.log("wrong");
      e.target.className = e.target.className + " wrong";
    }
  };

  const reflexivePronounGrid = (
    <div className="categories">
      <div className="cases">
        <div className={"case-option"} onClick={(e) => checkCase(e)}>
          first
        </div>
        <div className={"case-option"} onClick={(e) => checkCase(e)}>
          second
        </div>
        <div className={"case-option"} onClick={(e) => checkCase(e)}>
          third
        </div>
      </div>
      <div className="cases">
        <div className={"case-option"} onClick={(e) => checkCase(e)}>
          nominative
        </div>
        <div className={"case-option"} onClick={(e) => checkCase(e)}>
          genitive
        </div>
        <div className={"case-option"} onClick={(e) => checkCase(e)}>
          dative
        </div>
        <div className={"case-option"} onClick={(e) => checkCase(e)}>
          accusative
        </div>
      </div>
      <div className="cases">
        <div className={"case-option"} onClick={(e) => checkCase(e)}>
          singular
        </div>
        <div className={"case-option"} onClick={(e) => checkCase(e)}>
          plural
        </div>
      </div>
      <div className="cases">
        <div className={"case-option"} onClick={(e) => checkCase(e)}>
          masculine
        </div>
        <div className={"case-option"} onClick={(e) => checkCase(e)}>
          feminine
        </div>
        <div className={"case-option"} onClick={(e) => checkCase(e)}>
          neuter
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    let caseOptions = document.getElementsByClassName("case-option");
    if (caseOptions) {
      for (let i = 0; i < caseOptions.length; i++) {
        caseOptions[i].className = "case-option";
      }
    }
  }, [word, reset]);

  let gridOption;
  if (word.parse.includes("Reflexive")) {
    gridOption = reflexivePronounGrid;
  }

  return (
    <div>
      <p>{gridOption ? gridOption : "Practice Pronoun Grid component"}</p>
    </div>
  );
};

//Different Grids for different pronouns vv

export default PronounGrid;
