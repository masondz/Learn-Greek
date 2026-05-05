import "./Word.css";
import "./Verb.css";
import { selectWordSlice, selectCurrentWordIndex } from "./features/wordSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  increaseCorrect,
  increaseWrong,
  selectScoreSlice,
  setCorrectWorth,
  setCurrentScore,
  setWrongWorth,
} from "./features/scoreSlice";
import { scoringFunction } from "./utils";

const PronounGrid = ({ reset, verseReference, wordParsingState, setWordParsingState }) => {
  const word = useSelector(selectWordSlice);
  const currentWordIndex = useSelector(selectCurrentWordIndex);
  const dispatch = useDispatch();
  const scoreObject = useSelector(selectScoreSlice);
  const [gridState, setGridState] = useState({});

  const checkCase = async (e) => {
    let choice = e.target.innerHTML;
    let isReflexiveOrPossessive =
      word.parse.includes("Reflexive") || word.parse.includes("Possessive");
    if (
      (isReflexiveOrPossessive && scoreObject.correctFound >= 4) ||
      (!isReflexiveOrPossessive && scoreObject.correctFound >= 3)
    ) {
      
      return;
    }
    
    if (e.target.className.includes("correct") || e.target.className.includes("wrong")) {
      return;
    }
    
    let newClass = "";
    
    if (word.parse.includes(choice)) {
      
      const newScore = await scoringFunction(scoreObject, "correct", verseReference);
      dispatch(setCurrentScore(newScore));
      dispatch(increaseCorrect());
      newClass = " correct";
      e.target.className = e.target.className + newClass;
    } else {
      
      const newScore = await scoringFunction(scoreObject, "wrong");
      dispatch(setCurrentScore(newScore));
      dispatch(increaseWrong());
      newClass = " wrong";
      e.target.className = e.target.className + newClass;
    }
    
    // Save grid state
    const newGridState = { ...gridState, [choice]: newClass };
    setGridState(newGridState);
    
    if (currentWordIndex !== null) {
      setWordParsingState(prev => ({
        ...prev,
        [currentWordIndex]: {
          ...prev[currentWordIndex],
          gridSelections: newGridState
        }
      }));
    }
  };

  const reflexivePronounGrid = (
    <div className="pronouns-grid">
      <div className="pronoun-cases">
        <div className={"pronoun-options" + (gridState["first"] || "")} onClick={(e) => checkCase(e)}>
          first
        </div>
        <div className={"pronoun-options" + (gridState["second"] || "")} onClick={(e) => checkCase(e)}>
          second
        </div>
        <div className={"pronoun-options" + (gridState["third"] || "")} onClick={(e) => checkCase(e)}>
          third
        </div>
      </div>
      <div className="pronoun-cases">
        <div className={"pronoun-options" + (gridState["nominative"] || "")} onClick={(e) => checkCase(e)}>
          nominative
        </div>
        <div className={"pronoun-options" + (gridState["genitive"] || "")} onClick={(e) => checkCase(e)}>
          genitive
        </div>
        <div className={"pronoun-options" + (gridState["dative"] || "")} onClick={(e) => checkCase(e)}>
          dative
        </div>
        <div className={"pronoun-options" + (gridState["accusative"] || "")} onClick={(e) => checkCase(e)}>
          accusative
        </div>
      </div>
      <div className="pronoun-cases">
        <div className={"pronoun-options" + (gridState["singular"] || "")} onClick={(e) => checkCase(e)}>
          singular
        </div>
        <div className={"pronoun-options" + (gridState["plural"] || "")} onClick={(e) => checkCase(e)}>
          plural
        </div>
      </div>
      <div className="pronoun-cases">
        <div className={"pronoun-options" + (gridState["masculine"] || "")} onClick={(e) => checkCase(e)}>
          masculine
        </div>
        <div className={"pronoun-options" + (gridState["feminine"] || "")} onClick={(e) => checkCase(e)}>
          feminine
        </div>
        <div className={"pronoun-options" + (gridState["neuter"] || "")} onClick={(e) => checkCase(e)}>
          neuter
        </div>
      </div>
    </div>
  );

  const possesiveGrid = (
    <div className="pronouns-grid">
      <div className="pronoun-cases">
        <div className={"pronoun-options" + (gridState["first"] || "")} onClick={(e) => checkCase(e)}>
          first
        </div>
        <div className={"pronoun-options" + (gridState["second"] || "")} onClick={(e) => checkCase(e)}>
          second
        </div>
        <div className={"pronoun-options" + (gridState["third"] || "")} onClick={(e) => checkCase(e)}>
          third
        </div>
      </div>
      <div className="pronoun-cases">
        <div className={"pronoun-options" + (gridState["nominative"] || "")} onClick={(e) => checkCase(e)}>
          nominative
        </div>
        <div className={"pronoun-options" + (gridState["genitive"] || "")} onClick={(e) => checkCase(e)}>
          genitive
        </div>
        <div className={"pronoun-options" + (gridState["dative"] || "")} onClick={(e) => checkCase(e)}>
          dative
        </div>
        <div className={"pronoun-options" + (gridState["accusative"] || "")} onClick={(e) => checkCase(e)}>
          accusative
        </div>
      </div>
      <div className="pronoun-cases">
        <div className={"pronoun-options" + (gridState["singular"] || "")} onClick={(e) => checkCase(e)}>
          singular
        </div>
        <div className={"pronoun-options" + (gridState["plural"] || "")} onClick={(e) => checkCase(e)}>
          plural
        </div>
      </div>
      <div className="pronoun-cases">
        <div className={"pronoun-options" + (gridState["masculine"] || "")} onClick={(e) => checkCase(e)}>
          masculine
        </div>
        <div className={"pronoun-options" + (gridState["feminine"] || "")} onClick={(e) => checkCase(e)}>
          feminine
        </div>
        <div className={"pronoun-options" + (gridState["neuter"] || "")} onClick={(e) => checkCase(e)}>
          neuter
        </div>
      </div>
    </div>
  );

  const personalPronounWithPersonGrid = (
    <div className="categories">
      <div className="cases">
        <div className={"case-option" + (gridState["first"] || "")} onClick={(e) => checkCase(e)}>
          first
        </div>
        <div className={"case-option" + (gridState["second"] || "")} onClick={(e) => checkCase(e)}>
          second
        </div>
        <div className={"case-option" + (gridState["third"] || "")} onClick={(e) => checkCase(e)}>
          third
        </div>
      </div>
      <div className="cases">
        <div className={"case-option" + (gridState["nominative"] || "")} onClick={(e) => checkCase(e)}>
          nominative
        </div>
        <div className={"case-option" + (gridState["genitive"] || "")} onClick={(e) => checkCase(e)}>
          genitive
        </div>
        <div className={"case-option" + (gridState["dative"] || "")} onClick={(e) => checkCase(e)}>
          dative
        </div>
        <div className={"case-option" + (gridState["accusative"] || "")} onClick={(e) => checkCase(e)}>
          accusative
        </div>
      </div>
      <div className="cases">
        <div className={"case-option" + (gridState["singular"] || "")} onClick={(e) => checkCase(e)}>
          singular
        </div>
        <div className={"case-option" + (gridState["plural"] || "")} onClick={(e) => checkCase(e)}>
          plural
        </div>
      </div>
    </div>
  );

  const normalPronounGrid = (
    <div className="categories">
      <div className="cases">
        <div className={"case-option" + (gridState["nominative"] || "")} onClick={(e) => checkCase(e)}>
          nominative
        </div>
        <div className={"case-option" + (gridState["genitive"] || "")} onClick={(e) => checkCase(e)}>
          genitive
        </div>
        <div className={"case-option" + (gridState["dative"] || "")} onClick={(e) => checkCase(e)}>
          dative
        </div>
        <div className={"case-option" + (gridState["accusative"] || "")} onClick={(e) => checkCase(e)}>
          accusative
        </div>
      </div>
      <div className="cases">
        <div className={"case-option" + (gridState["singular"] || "")} onClick={(e) => checkCase(e)}>
          singular
        </div>
        <div className={"case-option" + (gridState["plural"] || "")} onClick={(e) => checkCase(e)}>
          plural
        </div>
      </div>
      <div className="cases">
        <div className={"case-option" + (gridState["masculine"] || "")} onClick={(e) => checkCase(e)}>
          masculine
        </div>
        <div className={"case-option" + (gridState["feminine"] || "")} onClick={(e) => checkCase(e)}>
          feminine
        </div>
        <div className={"case-option" + (gridState["neuter"] || "")} onClick={(e) => checkCase(e)}>
          neuter
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    dispatch(setCorrectWorth(30));
    dispatch(setWrongWorth(10));
    
    // Restore grid state from wordParsingState
    if (currentWordIndex !== null && wordParsingState[currentWordIndex]?.gridSelections) {
      setGridState(wordParsingState[currentWordIndex].gridSelections);
    } else {
      setGridState({});
    }
  }, [word, reset, dispatch, currentWordIndex, wordParsingState]);

  let gridOption;
  if (word.parse.includes("Reflexive")) {
    gridOption = reflexivePronounGrid;
  } else if (word.parse.includes("Possessive")) {
    gridOption = possesiveGrid;
  } else if (word.parse.includes("Personal")) {
    if (["first", "second", "third"].some((e) => word.parse.includes(e))) {
      gridOption = personalPronounWithPersonGrid;
    } else {
      gridOption = normalPronounGrid;
    }
  } else {
    gridOption = normalPronounGrid;
  }

  return (
    <div>
      {word.parse.includes("pronoun") ? gridOption : <p>Pick a Pronoun</p>}
    </div>
  );
};

//Different Grids for different pronouns vv

export default PronounGrid;
