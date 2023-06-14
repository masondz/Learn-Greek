import { useState, useEffect } from "react";
import { wordUsages } from "./greek_text/greekLexiconObject";
import { selectWordSlice } from "./features/wordSlice";
import "./Word.css";
import { useSelector } from "react-redux";

const VerbGrid = ({ dispatch, setWord, randomWord, verbMode, reset }) => {
  const [checkParse, setCheckParse] = useState(
    "Pick correct person and number"
  );

  const word = useSelector(selectWordSlice);

  useEffect(() => {
    let caseOptions = document.getElementsByClassName("case-option");
    if (caseOptions) {
      for (let i = 0; i < caseOptions.length; i++) {
        caseOptions[i].className = "case-option";
      }
    }
  }, [word, reset]);

  const handleNext = () => {
    let caseOptions = document.getElementsByClassName("case-option");
    console.log(caseOptions);
    for (let i = 0; i < caseOptions.length; i++) {
      caseOptions[i].className = "case-option";
    }
    let nextVerb = randomWord(wordUsages, "parse", verbMode.split(" "));
    dispatch(setWord(nextVerb));
  };

  let numCorrect = 0;

  const isParsed = () => {
    console.log(verbMode);
    console.log("check parsed thing");
    numCorrect++;
    if (numCorrect === 2) {
      setCheckParse("Good Job!");
      setTimeout(() => {
        handleNext();
        setCheckParse("Pick correct person and number");
      }, 850);
    } else {
      return;
    }
  };

  const onClick = (e) => {
    console.log(word);
    if (word.parse.includes(e.target.innerHTML)) {
      console.log("correct!");
      e.target.className = e.target.className + " correct";
      if (verbMode !== "parsing") {
        isParsed();
      }
    } else {
      console.log("wrong!");
      e.target.className = e.target.className + " wrong";
    }
  };

  return (
    <div>
      <VerbStepOne onClick={onClick} />
      <div className="cases">
        <div className={"case-option"} onClick={(e) => onClick(e)}>
          first
        </div>
        <div className={"case-option"} onClick={(e) => onClick(e)}>
          second
        </div>
        <div className={"case-option"} onClick={(e) => onClick(e)}>
          third
        </div>
      </div>
      <div className="cases">
        <div className={"case-option"} onClick={(e) => onClick(e)}>
          singular
        </div>
        <div className={"case-option"} onClick={(e) => onClick(e)}>
          plural
        </div>
      </div>
      <br></br>
      <p>{checkParse}</p>
    </div>
  );
};

const VerbStepOne = ({ onClick }) => {
  return (
    <div className="verb-step-one">
      <div className={"verb-options"} onClick={(e) => onClick(e)}>
        Verb
      </div>
      <div className={"verb-options"} onClick={(e) => onClick(e)}>
        Participle
      </div>
      <div className={"verb-options"} onClick={(e) => onClick(e)}>
        Infinitive
      </div>
    </div>
  );
};

//Verbs: Tense Voice Mood Person Number
// ἀγαπῶ: {
//   parse: "V-PAI-1S｜Verb, Present, Active, Indicative, first, singular",
//   GN: "G25",
//   gloss: "to love",
// }

// Tenses       Voices      Moods         Number      Person    Gender
// Present      Active      Indicative    Singular    First     Masculine
// Aorist       Middle      Subjunctive   Plural      Second    Feminine
// Perfect      Passive     Imperative                Third     Neuter
// Imperfect    Deponent
// Future

//Participle: Tense, Voice, Particple, Case, Number, Gender
// ἀγαπῶν: {
//   parse:
//     "V-PAP-NSM｜Verb, Present, Active, Participle, nominative, singular, masculine",
//   GN: "G25",
//   gloss: "to love",
// }

//Infinitive: Tense, Voice, Infinitive
// ἀγαπᾶν: {
//   parse: "V-PAN｜Verb, Present, Active, Infinitive",
//   GN: "G25",
//   gloss: "to love",
// }
export default VerbGrid;
