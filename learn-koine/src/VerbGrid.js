import { useState, useEffect } from "react";
import { wordUsages } from "./greek_text/greekLexiconObject";
import { selectWordSlice } from "./features/wordSlice";
import { selectVerbSlice } from "./features/verbSlice";
import { selectVerseMode } from "./features/verseSlice";
import "./Verb.css";
import { useSelector } from "react-redux";

const VerbGrid = ({
  dispatch,
  setWord,
  randomWord,
  verbMode,
  reset,
  verbCharacteristics,
}) => {
  const [checkParse, setCheckParse] = useState(
    "Pick correct person and number"
  );

  const [isRegularVerb, setIsRegularVerb] = useState(false);
  const [isParticiple, setIsParticiple] = useState(false);
  const [isInfinitive, setIsInfinitive] = useState(false);

  const verbType = useSelector(selectVerbSlice);
  const word = useSelector(selectWordSlice);

  useEffect(() => {
    let caseOptions = document.getElementsByClassName("case-option");
    if (caseOptions) {
      for (let i = 0; i < caseOptions.length; i++) {
        caseOptions[i].className = "case-option";
      }
    }

    let verbOptions = document.getElementsByClassName("verb-options");
    if (verbOptions) {
      for (let i = 0; i < verbOptions.length; i++) {
        if (verbOptions[i].innerHTML === verbType.Type) {
          verbOptions[i].className = "verb-options correct";
        } else {
          verbOptions[i].className = "verb-options";
        }
      }
    }

    if (!verbType.Type) {
      setIsInfinitive(false);
      setIsParticiple(false);
      setIsRegularVerb(false);
    } else if (verbType.Type === "Infinitive") {
      setIsInfinitive(true);
      setIsParticiple(false);
      setIsRegularVerb(false);
    } else if (verbType.Type === "Participle") {
      setIsInfinitive(false);
      setIsParticiple(true);
      setIsRegularVerb(false);
    } else {
      setIsInfinitive(false);
      setIsParticiple(false);
      setIsRegularVerb(true);
    }
  }, [word, reset, verbType.Type]);

  const handleNext = () => {
    let caseOptions = document.getElementsByClassName("case-option");

    for (let i = 0; i < caseOptions.length; i++) {
      caseOptions[i].className = "case-option";
    }

    if (!verbType.Type) {
      setIsInfinitive(false);
      setIsParticiple(false);
      setIsRegularVerb(false);
    }

    let nextVerb = randomWord(wordUsages, "parse", verbMode.split(" "));
    dispatch(setWord(nextVerb));
  };

  let numCorrect = 0;

  const isParsed = () => {
    numCorrect++;
    if (
      numCorrect === 5 ||
      (word.parse.includes("Infinitive") && numCorrect === 2)
    ) {
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
    if (word.parse.includes(e.target.innerHTML)) {
      e.target.className = e.target.className + " correct";
      if (verbMode !== "parsing") {
        isParsed();
      }
    } else {
      e.target.className = e.target.className + " wrong";
    }
  };

  return (
    <div>
      <VerbStepOne
        setIsRegularVerb={setIsRegularVerb}
        setIsParticiple={setIsParticiple}
        setIsInfinitive={setIsInfinitive}
        verbCharacteristics={verbCharacteristics}
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
  word,
  setIsRegularVerb,
  setIsInfinitive,
  setIsParticiple,
}) => {
  const handleCheckVerb = (e) => {
    e.preventDefault();
    if (
      !word.parse.includes("Participle") &&
      !word.parse.includes("Infinitive") &&
      word.parse.includes("Verb")
    ) {
      e.target.className = e.target.className + " correct";
      setIsRegularVerb(true);
      setIsInfinitive(false);
      setIsParticiple(false);
      return;
    } else {
      e.target.className = e.target.className + " wrong";
    }
  };

  const handleCheckParticiple = (e) => {
    e.preventDefault();
    if (word.parse.includes("Participle")) {
      e.target.className = e.target.className + " correct";
      setIsParticiple(true);
      setIsInfinitive(false);
      setIsRegularVerb(false);
      return;
    } else {
      e.target.className = e.target.className + " wrong";
    }
  };

  const handleCheckInfinitive = (e) => {
    e.preventDefault();
    if (word.parse.includes("Infinitive")) {
      e.target.className = e.target.className + " correct";
      setIsInfinitive(true);
      setIsParticiple(false);
      setIsRegularVerb(false);
      return;
    } else {
      e.target.className = e.target.className + " wrong";
    }
  };

  return (
    <div className="verb-step-one">
      <div
        className={"verb-options"}
        id="Verb-Step-One"
        onClick={(e) => handleCheckVerb(e)}
      >
        Verb
      </div>
      <div
        className={"verb-options"}
        id="Participle-Step-One"
        onClick={(e) => handleCheckParticiple(e)}
      >
        Participle
      </div>
      <div
        className={"verb-options"}
        id="Infinitive-Step-One"
        onClick={(e) => handleCheckInfinitive(e)}
      >
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

export default VerbGrid;
