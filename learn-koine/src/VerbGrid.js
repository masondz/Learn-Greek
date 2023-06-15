import { useState, useEffect } from "react";
import { wordUsages } from "./greek_text/greekLexiconObject";
import { selectWordSlice } from "./features/wordSlice";
import "./Verb.css";
import { useSelector } from "react-redux";

const VerbGrid = ({ dispatch, setWord, randomWord, verbMode, reset }) => {
  const [checkParse, setCheckParse] = useState(
    "Pick correct person and number"
  );

  const [isRegularVerb, setIsRegularVerb] = useState(false);
  const [isParticiple, setIsParticiple] = useState(false);
  const [isInfinitive, setIsInfinitive] = useState(false);

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
      <VerbStepOne
        setIsRegularVerb={setIsRegularVerb}
        setIsParticiple={setIsParticiple}
        setIsInfinitive={setIsInfinitive}
        word={word}
        onClick={onClick}
      />
      {isRegularVerb && <RegularVerbGrid onClick={onClick} />}
      {isParticiple && <ParticipleGrid onClick={onClick} />}
      {isInfinitive && <InfinitiveGrid onClick={onClick} />}
      <p>{checkParse}</p>
    </div>
  );
};

const VerbStepOne = ({
  onClick,
  word,
  setIsRegularVerb,
  setIsInfinitive,
  setIsParticiple,
}) => {
  const handleCheckVerb = (e) => {
    e.preventDefault();
    if (
      !word.parse.includes("Participle") &&
      !word.parse.includes("Infinitive")
    ) {
      e.target.className = e.target.className + " correct";
      return setIsRegularVerb(true);
    } else {
      e.target.className = e.target.className + " wrong";
    }
  };

  const handleCheckParticiple = (e) => {
    e.preventDefault();
    if (word.parse.includes("Participle")) {
      e.target.className = e.target.className + " correct";
      return setIsParticiple(true);
    } else {
      e.target.className = e.target.className + " wrong";
    }
  };

  const handleCheckInfinitive = (e) => {
    e.preventDefault();
    if (word.parse.includes("Infinitive")) {
      e.target.className = e.target.className + " correct";
      return setIsInfinitive(true);
    } else {
      e.target.className = e.target.className + " wrong";
    }
  };

  return (
    <div className="verb-step-one">
      <div className={"verb-options"} onClick={(e) => handleCheckVerb(e)}>
        Verb
      </div>
      <div className={"verb-options"} onClick={(e) => handleCheckParticiple(e)}>
        Participle
      </div>
      <div className={"verb-options"} onClick={(e) => handleCheckInfinitive(e)}>
        Infinitive
      </div>
    </div>
  );
};

const Tense = ({ onClick }) => {
  return (
    <div className="verb-cases">
      <div className="case-option" onClick={(e) => onClick(e)}>
        present
      </div>
      <div className="case-option" onClick={(e) => onClick(e)}>
        aorist
      </div>
      <div className="case-option" onClick={(e) => onClick(e)}>
        future
      </div>
      <div className="case-option" onClick={(e) => onClick(e)}>
        perfect
      </div>
      <div className="case-option" onClick={(e) => onClick(e)}>
        imperfect
      </div>
    </div>
  );
};

const Voice = ({ onClick }) => {
  return (
    <div className="verb-cases">
      <div className="case-option" onClick={(e) => onClick(e)}>
        active
      </div>
      <div className="case-option" onClick={(e) => onClick(e)}>
        middle
      </div>
      <div className="case-option" onClick={(e) => onClick(e)}>
        passive
      </div>
      <div className="case-option" onClick={(e) => onClick(e)}>
        deponent
      </div>
    </div>
  );
};

const Mood = ({ onClick }) => {
  return (
    <div className="verb-cases">
      <div className="case-option" onClick={(e) => onClick(e)}>
        indicative
      </div>
      <div className="case-option" onClick={(e) => onClick(e)}>
        subjunctive
      </div>
      <div className="case-option" onClick={(e) => onClick(e)}>
        imperative
      </div>
    </div>
  );
};

const Person = ({ onClick }) => {
  return (
    <div className="verb-cases">
      <div className="case-option" onClick={(e) => onClick(e)}>
        first
      </div>
      <div className="case-option" onClick={(e) => onClick(e)}>
        second
      </div>
      <div className="case-option" onClick={(e) => onClick(e)}>
        third
      </div>
    </div>
  );
};

const NumberComponent = ({ onClick }) => {
  return (
    <div className="verb-cases">
      <div className="case-option" onClick={(e) => onClick(e)}>
        singular
      </div>
      <div className="case-option" onClick={(e) => onClick(e)}>
        plural
      </div>
    </div>
  );
};

const CaseComponent = ({ onClick }) => {
  return (
    <div className="verb-cases">
      <div className="case-option" onClick={(e) => onClick(e)}>
        nominative
      </div>
      <div className="case-option" onClick={(e) => onClick(e)}>
        genitive
      </div>
      <div className="case-option" onClick={(e) => onClick(e)}>
        dative
      </div>
      <div className="case-option" onClick={(e) => onClick(e)}>
        accusative
      </div>
    </div>
  );
};

const Gender = ({ onClick }) => {
  return (
    <div className="verb-cases">
      <div className="case-option" onClick={(e) => onClick(e)}>
        masculine
      </div>
      <div className="case-option" onClick={(e) => onClick(e)}>
        feminine
      </div>
      <div className="case-option" onClick={(e) => onClick(e)}>
        neuter
      </div>
    </div>
  );
};

const RegularVerbGrid = ({ onClick }) => {
  return (
    <>
      <Tense onClick={onClick} />
      <Voice onClick={onClick} />
      <Mood onClick={onClick} />
      <Person onClick={onClick} />
      <NumberComponent onClick={onClick} />
    </>
  );
};

const ParticipleGrid = ({ onClick }) => {
  return (
    <>
      <Tense onClick={onClick} />
      <Voice onClick={onClick} />
      <CaseComponent onClick={onClick} />
      <NumberComponent onClick={onClick} />
      <Gender onClick={onClick} />
    </>
  );
};

const InfinitiveGrid = ({ onClick }) => {
  return (
    <>
      <Tense onClick={onClick} />
      <Voice onClick={onClick} />
    </>
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
