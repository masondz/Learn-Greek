import { useState, useEffect } from "react";
import { wordUsages } from "./greek_text/greekLexiconObject";
import { selectWordSlice, selectCurrentWordIndex } from "./features/wordSlice";
import { selectVerbSlice } from "./features/verbSlice";
import { selectVerseMode } from "./features/verseSlice";
import "./Verb.css";
import { useSelector } from "react-redux";
import {
  increaseCorrect,
  increaseWrong,
  selectScoreSlice,
  setCorrectWorth,
  setCurrentScore,
  setWrongWorth,
} from "./features/scoreSlice";
import { scoringFunction } from "./utils";

const VerbGrid = ({
  dispatch,
  setWord,
  randomVerb,
  verbMode,
  reset,
  verbCharacteristics,
  correctCount,
  setCorrectCount,
  verseReference,
  wordParsingState,
  setWordParsingState,
}) => {
  const [checkParse, setCheckParse] = useState(
    "Pick Verb, Participle, or Infintive"
  );

  const [isRegularVerb, setIsRegularVerb] = useState(false);
  const [isParticiple, setIsParticiple] = useState(false);
  const [isInfinitive, setIsInfinitive] = useState(false);
  
  const [verbTypeChosen, setVerbTypeChosen] = useState(false);

  const [imperfectPerson, setImperfectPerson] = useState("");
  const [imperfectNumber, setImperfectNumber] = useState("");
  
  const [gridState, setGridState] = useState({});

  const verbType = useSelector(selectVerbSlice);
  const word = useSelector(selectWordSlice);
  const currentWordIndex = useSelector(selectCurrentWordIndex);

  const scoreObject = useSelector(selectScoreSlice);

  useEffect(() => {
    dispatch(setCorrectWorth(36));
    dispatch(setWrongWorth(12));
    
    // Restore state from wordParsingState
    if (currentWordIndex !== null && wordParsingState[currentWordIndex]) {
      const savedState = wordParsingState[currentWordIndex];
      
      // Restore grid selections
      if (savedState.gridSelections) {
        setGridState(savedState.gridSelections);
      } else {
        setGridState({});
      }
      
      // Restore verb type choice
      if (savedState.verbTypeChoice) {
        const choice = savedState.verbTypeChoice;
        setVerbTypeChosen(true);
        
        if (choice === "Verb") {
          setIsRegularVerb(true);
          setIsInfinitive(false);
          setIsParticiple(false);
          setCheckParse("Parse the verb");
        } else if (choice === "Participle") {
          setIsParticiple(true);
          setIsInfinitive(false);
          setIsRegularVerb(false);
          setCheckParse("Parse the participle");
        } else if (choice === "Infinitive") {
          setIsInfinitive(true);
          setIsParticiple(false);
          setIsRegularVerb(false);
          setCheckParse("Parse the infinitive");
        }
      } else {
        // Reset if no saved choice
        setVerbTypeChosen(false);
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
      }
    } else {
      // No saved state, reset everything
      setGridState({});
      setVerbTypeChosen(false);
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
    }
  }, [word, reset, verbType.Type, dispatch, currentWordIndex, wordParsingState]);
  
  // Don't need separate useEffect for resetting verbTypeChosen anymore

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
      const choice = e.target.innerHTML;
      let newClass = "";
      
      switch (e.target.innerHTML) {
        case "first":
          if (imperfectPerson === "third" || imperfectNumber === "plural") {
            e.target.className = e.target.className + " wrong";
            newClass = " wrong";
            saveGridState(choice, newClass);
            break;
          } else {
            isParsed();
            setImperfectPerson("first");
            newClass = " correct";
            e.target.className = e.target.className + newClass;
            saveGridState(choice, newClass);
          }
          break;
        case "third":
          if (imperfectPerson === "first" || imperfectNumber === "singular") {
            e.target.className = e.target.className + " wrong";
            newClass = " wrong";
            saveGridState(choice, newClass);
            break;
          } else {
            isParsed();
            setImperfectPerson("third");
            newClass = " correct";
            e.target.className = e.target.className + newClass;
            saveGridState(choice, newClass);
          }
          break;
        case "singular":
          if (imperfectNumber === "plural" || imperfectPerson === "third") {
            e.target.className = e.target.className + " wrong";
            newClass = " wrong";
            saveGridState(choice, newClass);
            break;
          } else {
            isParsed();
            setImperfectNumber("singular");
            newClass = " correct";
            e.target.className = e.target.className + newClass;
            saveGridState(choice, newClass);
          }
          break;
        case "plural":
          if (imperfectNumber === "singular" || imperfectPerson === "first") {
            e.target.className = e.target.className + " wrong";
            newClass = " wrong";
            saveGridState(choice, newClass);
            break;
          } else {
            isParsed();
            setImperfectNumber("plural");
            newClass = " correct";
            e.target.className = e.target.className + newClass;
            saveGridState(choice, newClass);
          }
          break;
        default:
          if (word.parse.includes(e.target.innerHTML)) {
            isParsed();
            newClass = " correct";
            e.target.className = e.target.className + newClass;
            saveGridState(choice, newClass);
            return true;
          } else {
            newClass = " wrong";
            e.target.className = e.target.className + newClass;
            saveGridState(choice, newClass);
          }
          break;
      }
      
      return true;
    } else {
      return false;
    }
  };

  const onClick = async (e) => {
    if (e.target.className.includes("correct") || e.target.className.includes("wrong")) {
      return;
    }
    
    const choice = e.target.innerHTML;
    let newClass = "";
    
    if (word.parse.includes("imperfect")) {
      if (e.target.innerHTML === "perfect") {
        e.target.className = e.target.className + " wrong";
        newClass = " wrong";
        saveGridState(choice, newClass);
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

    if (e.target.innerHTML === "middle/passive") {
      if (
        word.parse.includes("middle") ||
        word.parse.includes("passive") ||
        word.parse.includes("Passive") ||
        word.parse.includes("Middle")
      ) {
        e.target.className = e.target.className + " correct";
        newClass = " correct";
        if (verbMode !== "parsing") {
          isParsed();
        } else {
          const newScore = await scoringFunction(scoreObject, "correct", verseReference);
          dispatch(setCurrentScore(newScore));
          dispatch(increaseCorrect());
        }
      } else {
        
        e.target.className = e.target.className + " wrong";
        newClass = " wrong";
        if (verbMode === "parsing") {
          const newScore = await scoringFunction(scoreObject, "wrong");
          dispatch(setCurrentScore(newScore));
          dispatch(increaseWrong());
        }
      }
      saveGridState(choice, newClass);
    } else if (word.parse.includes(e.target.innerHTML)) {
      e.target.className = e.target.className + " correct";
      newClass = " correct";
      if (verbMode !== "parsing") {
        isParsed();
      } else {
        const newScore = await scoringFunction(scoreObject, "correct", verseReference);
        dispatch(setCurrentScore(newScore));
        dispatch(increaseCorrect());
      }
      saveGridState(choice, newClass);
    } else {
      e.target.className = e.target.className + " wrong";
      newClass = " wrong";
      const newScore = await scoringFunction(scoreObject, "wrong");
      dispatch(setCurrentScore(newScore));
      dispatch(increaseWrong());
      saveGridState(choice, newClass);
    }
  };
  
  const saveGridState = (choice, className) => {
    const newGridState = { ...gridState, [choice]: className };
    setGridState(newGridState);
    
    if (currentWordIndex !== null && verbMode === "parsing") {
      setWordParsingState(prev => ({
        ...prev,
        [currentWordIndex]: {
          ...prev[currentWordIndex],
          gridSelections: newGridState
        }
      }));
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
        setVerbTypeChosen={setVerbTypeChosen}
        gridState={gridState}
        setWordParsingState={setWordParsingState}
        wordParsingState={wordParsingState}
        currentWordIndex={currentWordIndex}
      />
      {isRegularVerb && <RegularVerbGrid onClick={onClick} gridState={gridState} />}
      {isParticiple && (
        <ParticipleGrid onClick={onClick} isVocative={isVocative} gridState={gridState} />
      )}
      {isInfinitive && <InfinitiveGrid onClick={onClick} gridState={gridState} />}
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
  setVerbTypeChosen,
  gridState,
  setWordParsingState,
  wordParsingState,
  currentWordIndex,
}) => {
  const saveVerbTypeChoice = (choice) => {
    if (currentWordIndex !== null) {
      setWordParsingState(prev => ({
        ...prev,
        [currentWordIndex]: {
          ...prev[currentWordIndex],
          verbTypeChoice: choice
        }
      }));
    }
  };

  const handleCheckVerb = (e) => {
    e.preventDefault();
    const alreadySelected = wordParsingState[currentWordIndex]?.verbTypeChoice;
    if (alreadySelected) {
      return;
    }
    
    if (
      !word.parse.includes("Participle") &&
      !word.parse.includes("Infinitive") &&
      word.parse.includes("Verb")
    ) {
      setIsRegularVerb(true);
      setIsInfinitive(false);
      setIsParticiple(false);
      setCheckParse("Parse the verb");
      setVerbTypeChosen(true);
      saveVerbTypeChoice("Verb");
      return;
    } else {
      saveVerbTypeChoice("wrong-Verb");
    }
  };

  const handleCheckParticiple = (e) => {
    e.preventDefault();
    const alreadySelected = wordParsingState[currentWordIndex]?.verbTypeChoice;
    if (alreadySelected) {
      return;
    }
    
    if (word.parse.includes("Participle")) {
      setIsParticiple(true);
      setIsInfinitive(false);
      setIsRegularVerb(false);
      setCheckParse("Parse the participle");
      setVerbTypeChosen(true);
      saveVerbTypeChoice("Participle");
      return;
    } else {
      saveVerbTypeChoice("wrong-Participle");
    }
  };

  const handleCheckInfinitive = (e) => {
    e.preventDefault();
    const alreadySelected = wordParsingState[currentWordIndex]?.verbTypeChoice;
    if (alreadySelected) {
      return;
    }
    
    if (word.parse.includes("Infinitive")) {
      setIsInfinitive(true);
      setIsParticiple(false);
      setIsRegularVerb(false);
      setCheckParse("Parse the infinitive");
      setVerbTypeChosen(true);
      saveVerbTypeChoice("Infinitive");
      return;
    } else {
      saveVerbTypeChoice("wrong-Infinitive");
    }
  };
  
  const getVerbClassName = () => {
    const choice = wordParsingState[currentWordIndex]?.verbTypeChoice;
    if (choice === "Verb") return "verb-options correct";
    if (choice === "wrong-Verb") return "verb-options wrong";
    return "verb-options";
  };
  
  const getParticipleClassName = () => {
    const choice = wordParsingState[currentWordIndex]?.verbTypeChoice;
    if (choice === "Participle") return "verb-options correct";
    if (choice === "wrong-Participle") return "verb-options wrong";
    return "verb-options";
  };
  
  const getInfinitiveClassName = () => {
    const choice = wordParsingState[currentWordIndex]?.verbTypeChoice;
    if (choice === "Infinitive") return "verb-options correct";
    if (choice === "wrong-Infinitive") return "verb-options wrong";
    return "verb-options";
  };

  return (
    <div className="verb-step-one">
      <div
        className={getVerbClassName()}
        id="Verb-Step-One"
        onClick={(e) => handleCheckVerb(e)}
      >
        Verb
      </div>
      <div
        className={getParticipleClassName()}
        id="Participle-Step-One"
        onClick={(e) => handleCheckParticiple(e)}
      >
        Participle
      </div>
      <div
        className={getInfinitiveClassName()}
        id="Infinitive-Step-One"
        onClick={(e) => handleCheckInfinitive(e)}
      >
        Infinitive
      </div>
    </div>
  );
};

const Tense = ({ onClick, gridState = {} }) => {
  return (
    <div className="verb-cases">
      <div className={"case-option" + (gridState["present"] || "")} onClick={(e) => onClick(e)}>
        present
      </div>
      <div className={"case-option" + (gridState["aorist"] || "")} onClick={(e) => onClick(e)}>
        aorist
      </div>
      <div className={"case-option" + (gridState["future"] || "")} onClick={(e) => onClick(e)}>
        future
      </div>
      <div className={"case-option" + (gridState["perfect"] || "")} onClick={(e) => onClick(e)}>
        perfect
      </div>
      <div className={"case-option" + (gridState["imperfect"] || "")} onClick={(e) => onClick(e)}>
        imperfect
      </div>
      <div className={"case-option" + (gridState["pluperfect"] || "")} onClick={(e) => onClick(e)}>
        pluperfect
      </div>
    </div>
  );
};

const Voice = ({ onClick, gridState = {} }) => {
  const verseMode = useSelector(selectVerseMode);

  return (
    <div className="verb-cases">
      <div className={"case-option" + (gridState["active"] || "")} onClick={(e) => onClick(e)}>
        active
      </div>
      {verseMode !== "Parse Verbs" ? (
        <>
          <div className={"case-option" + (gridState["middle"] || "")} onClick={(e) => onClick(e)}>
            middle
          </div>
          <div className={"case-option" + (gridState["passive"] || "")} onClick={(e) => onClick(e)}>
            passive
          </div>
          <div className={"case-option" + (gridState["deponent"] || "")} onClick={(e) => onClick(e)}>
            deponent
          </div>
        </>
      ) : (
        <div className={"case-option" + (gridState["middle/passive"] || "")} onClick={(e) => onClick(e)}>
          middle/passive
        </div>
      )}
    </div>
  );
};

const Mood = ({ onClick, gridState = {} }) => {
  return (
    <div className="verb-cases">
      <div className={"case-option" + (gridState["indicative"] || "")} onClick={(e) => onClick(e)}>
        indicative
      </div>
      <div className={"case-option" + (gridState["subjunctive"] || "")} onClick={(e) => onClick(e)}>
        subjunctive
      </div>
      <div className={"case-option" + (gridState["imperative"] || "")} onClick={(e) => onClick(e)}>
        imperative
      </div>
    </div>
  );
};

const Person = ({ onClick, gridState = {} }) => {
  return (
    <div className="verb-cases">
      <div className={"case-option" + (gridState["first"] || "")} onClick={(e) => onClick(e)}>
        first
      </div>
      <div className={"case-option" + (gridState["second"] || "")} onClick={(e) => onClick(e)}>
        second
      </div>
      <div className={"case-option" + (gridState["third"] || "")} onClick={(e) => onClick(e)}>
        third
      </div>
    </div>
  );
};

const NumberComponent = ({ onClick, gridState = {} }) => {
  return (
    <div className="verb-cases">
      <div className={"case-option" + (gridState["singular"] || "")} onClick={(e) => onClick(e)}>
        singular
      </div>
      <div className={"case-option" + (gridState["plural"] || "")} onClick={(e) => onClick(e)}>
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

const CaseComponent = ({ onClick, isVocative, gridState = {} }) => {
  return (
    <div className="verb-cases">
      {isVocative ? (
        <div className={"case-option vocative-participle"}>vocative</div>
      ) : (
        <>
          <div className={"case-option" + (gridState["nominative"] || "")} onClick={(e) => onClick(e)}>
            nominative
          </div>
          <div className={"case-option" + (gridState["genitive"] || "")} onClick={(e) => onClick(e)}>
            genitive
          </div>
          <div className={"case-option" + (gridState["dative"] || "")} onClick={(e) => onClick(e)}>
            dative
          </div>
          <div className={"case-option" + (gridState["accusative"] || "")} onClick={(e) => onClick(e)}>
            accusative
          </div>
        </>
      )}
    </div>
  );
};

const Gender = ({ onClick, gridState = {} }) => {
  return (
    <div className="verb-cases">
      <div className={"case-option" + (gridState["masculine"] || "")} onClick={(e) => onClick(e)}>
        masculine
      </div>
      <div className={"case-option" + (gridState["feminine"] || "")} onClick={(e) => onClick(e)}>
        feminine
      </div>
      <div className={"case-option" + (gridState["neuter"] || "")} onClick={(e) => onClick(e)}>
        neuter
      </div>
    </div>
  );
};

const RegularVerbGrid = ({ onClick, gridState }) => {
  return (
    <>
      <Tense onClick={onClick} gridState={gridState} />
      <Voice onClick={onClick} gridState={gridState} />
      <Mood onClick={onClick} gridState={gridState} />
      <Person onClick={onClick} gridState={gridState} />
      <NumberComponent onClick={onClick} gridState={gridState} />
    </>
  );
};

const ParticipleGrid = ({ onClick, isVocative, gridState }) => {
  return (
    <>
      <Tense onClick={onClick} gridState={gridState} />
      <Voice onClick={onClick} gridState={gridState} />
      <CaseComponent onClick={onClick} isVocative={isVocative} gridState={gridState} />
      <NumberComponent onClick={onClick} gridState={gridState} />
      <Gender onClick={onClick} gridState={gridState} />
    </>
  );
};

const InfinitiveGrid = ({ onClick, gridState }) => {
  return (
    <>
      <Tense onClick={onClick} gridState={gridState} />
      <Voice onClick={onClick} gridState={gridState} />
    </>
  );
};

export default VerbGrid;
