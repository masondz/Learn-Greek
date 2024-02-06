import "./Word.css";
import "./Verb.css";
import { selectWordSlice } from "./features/wordSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  increaseCorrect,
  increaseWrong,
  selectScoreSlice,
  setCorrectWorth,
  setCurrentScore,
  setWrongWorth,
} from "./features/scoreSlice";
import { scoringFunction } from "./utils";

const PronounGrid = ({ reset, verseReference }) => {
  const word = useSelector(selectWordSlice);
  const dispatch = useDispatch();
  const scoreObject = useSelector(selectScoreSlice);

  const checkCase = (e) => {
    let choice = e.target.innerHTML;
    let isReflexiveOrPossessive =
      word.parse.includes("Reflexive") || word.parse.includes("Possessive");
    if (
      (isReflexiveOrPossessive && scoreObject.correctFound >= 4) ||
      (!isReflexiveOrPossessive && scoreObject.correctFound >= 3)
    ) {
      console.log("found enough correct");
      return;
    }
    if (word.parse.includes(choice)) {
      console.log("correct!");
      dispatch(
        setCurrentScore(scoringFunction(scoreObject, "correct", verseReference))
      );
      dispatch(increaseCorrect());
      e.target.className = e.target.className + " correct";
    } else {
      console.log("wrong");
      dispatch(setCurrentScore(scoringFunction(scoreObject, "wrong")));
      dispatch(increaseWrong());
      e.target.className = e.target.className + " wrong";
    }
  };

  const reflexivePronounGrid = (
    <div className="pronouns-grid">
      <div className="pronoun-cases">
        <div className={"pronoun-options"} onClick={(e) => checkCase(e)}>
          first
        </div>
        <div className={"pronoun-options"} onClick={(e) => checkCase(e)}>
          second
        </div>
        <div className={"pronoun-options"} onClick={(e) => checkCase(e)}>
          third
        </div>
      </div>
      <div className="pronoun-cases">
        <div className={"pronoun-options"} onClick={(e) => checkCase(e)}>
          nominative
        </div>
        <div className={"pronoun-options"} onClick={(e) => checkCase(e)}>
          genitive
        </div>
        <div className={"pronoun-options"} onClick={(e) => checkCase(e)}>
          dative
        </div>
        <div className={"pronoun-options"} onClick={(e) => checkCase(e)}>
          accusative
        </div>
      </div>
      <div className="pronoun-cases">
        <div className={"pronoun-options"} onClick={(e) => checkCase(e)}>
          singular
        </div>
        <div className={"pronoun-options"} onClick={(e) => checkCase(e)}>
          plural
        </div>
      </div>
      <div className="pronoun-cases">
        <div className={"pronoun-options"} onClick={(e) => checkCase(e)}>
          masculine
        </div>
        <div className={"pronoun-options"} onClick={(e) => checkCase(e)}>
          feminine
        </div>
        <div className={"pronoun-options"} onClick={(e) => checkCase(e)}>
          neuter
        </div>
      </div>
    </div>
  );

  const possesiveGrid = (
    <div className="pronouns-grid">
      <div className="pronoun-cases">
        <div className={"pronoun-options"} onClick={(e) => checkCase(e)}>
          first
        </div>
        <div className={"pronoun-options"} onClick={(e) => checkCase(e)}>
          second
        </div>
        <div className={"pronoun-options"} onClick={(e) => checkCase(e)}>
          third
        </div>
      </div>
      <div className="pronoun-cases">
        <div className={"pronoun-options"} onClick={(e) => checkCase(e)}>
          nominative
        </div>
        <div className={"pronoun-options"} onClick={(e) => checkCase(e)}>
          genitive
        </div>
        <div className={"pronoun-options"} onClick={(e) => checkCase(e)}>
          dative
        </div>
        <div className={"pronoun-options"} onClick={(e) => checkCase(e)}>
          accusative
        </div>
      </div>
      <div className="pronoun-cases">
        <div className={"pronoun-options"} onClick={(e) => checkCase(e)}>
          singular
        </div>
        <div className={"pronoun-options"} onClick={(e) => checkCase(e)}>
          plural
        </div>
      </div>
      <div className="pronoun-cases">
        <div className={"pronoun-options"} onClick={(e) => checkCase(e)}>
          masculine
        </div>
        <div className={"pronoun-options"} onClick={(e) => checkCase(e)}>
          feminine
        </div>
        <div className={"pronoun-options"} onClick={(e) => checkCase(e)}>
          neuter
        </div>
      </div>
    </div>
  );

  const personalPronounWithPersonGrid = (
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
    </div>
  );

  const normalPronounGrid = (
    <div className="categories">
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
    dispatch(setCorrectWorth(30));
    dispatch(setWrongWorth(10));
  }, [word, reset, dispatch]);

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
      <p>{word.parse.includes("pronoun") ? gridOption : "Pick a Pronoun"}</p>
    </div>
  );
};

//Different Grids for different pronouns vv

export default PronounGrid;
