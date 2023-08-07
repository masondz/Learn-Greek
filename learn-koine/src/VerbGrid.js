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
  randomVerb,
  verbMode,
  reset,
  verbCharacteristics,
  correctCount,
  setCorrectCount,
}) => {
  const [checkParse, setCheckParse] = useState(
    "Pick Verb, Participle, or Infintive"
  );

  const [isRegularVerb, setIsRegularVerb] = useState(false);
  const [isParticiple, setIsParticiple] = useState(false);
  const [isInfinitive, setIsInfinitive] = useState(false);

  const [imperfectPerson, setImperfectPerson] = useState("");
  const [imperfectNumber, setImperfectNumber] = useState("");

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
      setCheckParse("Parse the word");
    } else if (verbType.Type === "Participle") {
      setIsInfinitive(false);
      setIsParticiple(true);
      setIsRegularVerb(false);
      setCheckParse("Parse the word");
    } else {
      setIsInfinitive(false);
      setIsParticiple(false);
      setIsRegularVerb(true);
      setCheckParse("Parse the word");
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
      setCheckParse("Pick Verb, Participle, or Infintive");
    }

    let exclusions = [];
    if (verbType.Type === "Verb") {
      exclusions = ["Participle", "Infinitive"];
    }

    let options = "";
    if (
      verbMode === "Use the menu to select verb forms to practice." ||
      verbType === "" ||
      verbMode === "Any"
    ) {
      options = "Verb";
    } else {
      options = verbMode;
    }

    console.log(options);

    let nextVerb = randomVerb(
      wordUsages,
      "parse",
      options.split(" "),
      exclusions
    );
    dispatch(setWord(nextVerb));
    setImperfectNumber("");
    setImperfectPerson("");
    setCorrectCount(0);
  };

  let numCorrect = correctCount;

  const isParsed = () => {
    if (correctCount === false) {
      return;
    }
    numCorrect++;
    console.log(numCorrect);
    if (
      numCorrect === 5 ||
      (word.parse.includes("Infinitive") && numCorrect === 2)
    ) {
      setCheckParse("Good Job!");
      setTimeout(() => {
        handleNext();
        setCheckParse("Parse the word");
      }, 850);
    } else {
      setCorrectCount(numCorrect);
      return;
    }
  };

  const checkSecondaryEndings = (e, tense) => {
    if (
      word.parse.includes(`${tense}, active, indicative, first, singular`) ||
      word.parse.includes(`${tense}, active, indicative, third, plural`)
    ) {
      console.log("either first singular or third plural");
      switch (e.target.innerHTML) {
        case "first":
          if (imperfectPerson === "third" || imperfectNumber === "plural") {
            e.target.className = e.target.className + " wrong";
            break;
          } else {
            isParsed();
            setImperfectPerson("first");
            console.log("made it to first person statement");
            e.target.className = e.target.className + " correct";
          }
          break;
        case "third":
          if (imperfectPerson === "first" || imperfectNumber === "singular") {
            e.target.className = e.target.className + " wrong";
            break;
          } else {
            isParsed();
            setImperfectPerson("third");
            console.log("made it to third person statement");
            e.target.className = e.target.className + " correct";
          }
          break;
        case "singular":
          if (imperfectNumber === "plural" || imperfectPerson === "third") {
            e.target.className = e.target.className + " wrong";
            break;
          } else {
            isParsed();
            setImperfectNumber("singular");
            console.log("made it to singular number statement");
            e.target.className = e.target.className + " correct";
          }
          break;
        case "plural":
          if (imperfectNumber === "singular" || imperfectPerson === "first") {
            e.target.className = e.target.className + " wrong";
            break;
          } else {
            isParsed();
            setImperfectNumber("plural");
            console.log("made it to plural number statement");
            e.target.className = e.target.className + " correct";
          }
          break;
        default:
          if (word.parse.includes(e.target.innerHTML)) {
            isParsed();
            e.target.className = e.target.className + " correct";
            return true;
          } else {
            e.target.className = e.target.className + " wrong";
          }
          break;
      }
      console.log(imperfectNumber, imperfectPerson);
      return true;
    } else {
      return false;
    }
  };

  const onClick = (e) => {
    if (word.parse.includes("imperfect")) {
      if (e.target.innerHTML === "perfect") {
        e.target.className = e.target.className + " wrong";
        return;
      } else {
        if (checkSecondaryEndings(e, "imperfect")) {
          return;
        }
      }
    } else if (word.parse.includes("2nd aorist")) {
      if (checkSecondaryEndings(e, "2nd aorist")) {
        return;
      }
    }

    // if (
    //   word.parse.includes("imperfect, active, indicative, first, singular") ||
    //   word.parse.includes("imperfect, active, indicative, third, plural")
    // ) {
    //   console.log("either first singular or third plural");
    //   switch (e.target.innerHTML) {
    //     case "first":
    //       if (imperfectPerson === "third" || imperfectNumber === "plural") {
    //         e.target.className = e.target.className + " wrong";
    //         break;
    //       } else {
    //         isParsed();
    //         setImperfectPerson("first");
    //         console.log("made it to first person statement");
    //         e.target.className = e.target.className + " correct";
    //       }
    //       break;
    //     case "third":
    //       if (imperfectPerson === "first" || imperfectNumber === "singular") {
    //         e.target.className = e.target.className + " wrong";
    //         break;
    //       } else {
    //         isParsed();
    //         setImperfectPerson("third");
    //         console.log("made it to third person statement");
    //         e.target.className = e.target.className + " correct";
    //       }
    //       break;
    //     case "singular":
    //       if (imperfectNumber === "plural" || imperfectPerson === "third") {
    //         e.target.className = e.target.className + " wrong";
    //         break;
    //       } else {
    //         isParsed();
    //         setImperfectNumber("singular");
    //         console.log("made it to singular number statement");
    //         e.target.className = e.target.className + " correct";
    //       }
    //       break;
    //     case "plural":
    //       if (imperfectNumber === "singular" || imperfectPerson === "first") {
    //         e.target.className = e.target.className + " wrong";
    //         break;
    //       } else {
    //         isParsed();
    //         setImperfectNumber("plural");
    //         console.log("made it to plural number statement");
    //         e.target.className = e.target.className + " correct";
    //       }
    //       break;
    //     default:
    //       if (word.parse.includes(e.target.innerHTML)) {
    //         isParsed();
    //         e.target.className = e.target.className + " correct";
    //         return;
    //       } else {
    //         e.target.className = e.target.className + " wrong";
    //       }
    //       break;
    //   }
    //   console.log(imperfectNumber, imperfectPerson);
    //   return;
    // }
    // }
    if (e.target.innerHTML === "middle/passive") {
      if (
        word.parse.includes("middle") ||
        word.parse.includes("passive") ||
        word.parse.includes("Passive") ||
        word.parse.includes("Middle")
      ) {
        e.target.className = e.target.className + " correct";
        if (verbMode !== "parsing") {
          isParsed();
        }
      } else {
        console.log("not middle/passive");
        e.target.className = e.target.className + " wrong";
      }
    } else if (word.parse.includes(e.target.innerHTML)) {
      e.target.className = e.target.className + " correct";
      if (verbMode !== "parsing") {
        isParsed();
      }
    } else {
      e.target.className = e.target.className + " wrong";
    }
  };

  let isVocative = false;

  if (word.parse.includes("Vocative") && !word.parse.includes("nominative")) {
    isVocative = true;
  }

  return (
    <div>
      <VerbStepOne
        setIsRegularVerb={setIsRegularVerb}
        setIsParticiple={setIsParticiple}
        setIsInfinitive={setIsInfinitive}
        verbCharacteristics={verbCharacteristics}
        word={word}
        onClick={onClick}
        setCheckParse={setCheckParse}
      />
      {isRegularVerb && <RegularVerbGrid onClick={onClick} />}
      {isParticiple && (
        <ParticipleGrid onClick={onClick} isVocative={isVocative} />
      )}
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
  setCheckParse,
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
      setCheckParse("Parse the verb");

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
      setCheckParse("Parse the participle");

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
      setCheckParse("Parse the infinitive");

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
      <div className="case-option" onClick={(e) => onClick(e)}>
        pluperfect
      </div>
    </div>
  );
};

const Voice = ({ onClick }) => {
  const verseMode = useSelector(selectVerseMode);

  return (
    <div className="verb-cases">
      <div className="case-option" onClick={(e) => onClick(e)}>
        active
      </div>
      {verseMode !== "Parse Verbs" ? (
        <>
          <div className="case-option" onClick={(e) => onClick(e)}>
            middle
          </div>
          <div className="case-option" onClick={(e) => onClick(e)}>
            passive
          </div>
          <div className="case-option" onClick={(e) => onClick(e)}>
            deponent
          </div>
        </>
      ) : (
        <div className="case-option" onClick={(e) => onClick(e)}>
          middle/passive
        </div>
      )}
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

/*
  {isVocative && (
        <div className={"case-option vocative-participle"}>vocative</div>
      )}
*/

const CaseComponent = ({ onClick, isVocative }) => {
  return (
    <div className="verb-cases">
      {isVocative ? (
        <div className={"case-option vocative-participle"}>vocative</div>
      ) : (
        <>
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
        </>
      )}
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

const ParticipleGrid = ({ onClick, isVocative }) => {
  return (
    <>
      <Tense onClick={onClick} />
      <Voice onClick={onClick} />
      <CaseComponent onClick={onClick} isVocative={isVocative} />
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
