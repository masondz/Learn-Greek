import React, { useEffect } from "react";
import "./Word.css";
import { useSelector, useDispatch } from "react-redux";
import { selectWordSlice, selectCurrentWordIndex } from "./features/wordSlice";
import {
  selectScoreSlice,
  setCorrectWorth,
  increaseCorrect,
  setWrongWorth,
  increaseWrong,
  setCurrentScore,
} from "./features/scoreSlice";
import { scoringFunction } from "./utils";

export const ArticleGrid = ({
  articleGrid,
  setArticleGrid,
  verseReference,
  wordParsingState,
  setWordParsingState,
}) => {
  const { parse } = useSelector(selectWordSlice);
  const currentWordIndex = useSelector(selectCurrentWordIndex);
  const scoreObject = useSelector(selectScoreSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCorrectWorth(30)); //correct choices in this grid are worth 30 points.
    dispatch(setWrongWorth(10));
    
    // Restore grid state from wordParsingState
    if (currentWordIndex !== null && wordParsingState[currentWordIndex]?.gridSelections) {
      setArticleGrid(wordParsingState[currentWordIndex].gridSelections);
    }
  }, [dispatch, currentWordIndex, wordParsingState, setArticleGrid]);

  let isVocative;

  if (parse.includes("Vocative") && !parse.includes("nominative")) {
    isVocative = true;
  }

  let masculineOrFirst = articleGrid.masculine;
  let feminineOrSecond = articleGrid.feminine;
  let neutereOrThird = articleGrid.neuter;
  let hasPersonAttribute = false;

  if (
    parse.includes("first") ||
    parse.includes("second") ||
    parse.includes("third")
  ) {
    masculineOrFirst = articleGrid.first;
    feminineOrSecond = articleGrid.second;
    neutereOrThird = articleGrid.third;
    hasPersonAttribute = true;
  }

  const checkCase = async (e) => {
    e.preventDefault();
    const wordCase = parse;

    let target = e.target.innerHTML;
    if (scoreObject.correctFound >= 3) {
      return;
    }
    
    if (articleGrid[target] === "-correct" || articleGrid[target] === "-wrong") {
      return;
    }
    
    let newArticleGrid;
    
    if (wordCase.includes(target)) {
      dispatch(increaseCorrect());
      const newScore = await scoringFunction(scoreObject, "correct", verseReference);
      dispatch(setCurrentScore(newScore));
      newArticleGrid = { ...articleGrid, [target]: "-correct" };
      setArticleGrid(newArticleGrid);
    } else {
      dispatch(increaseWrong());
      const newScore = await scoringFunction(scoreObject, "wrong");
      dispatch(setCurrentScore(newScore));
      newArticleGrid = { ...articleGrid, [target]: "-wrong" };
      setArticleGrid(newArticleGrid);
    }
    
    // Save grid state to wordParsingState
    if (currentWordIndex !== null) {
      setWordParsingState(prev => ({
        ...prev,
        [currentWordIndex]: {
          ...prev[currentWordIndex],
          gridSelections: newArticleGrid
        }
      }));
    }
  };

  return (
    <div className="categories">
      <div className="cases">
        {isVocative && (
          <div className="vocative-container">
            <div className={"case-option vocative"}>vocative</div>
          </div>
        )}
        <div
          className={"case-option" + articleGrid.nominative}
          onClick={(e) => checkCase(e)}
        >
          nominative
        </div>
        <div
          className={"case-option" + articleGrid.genitive}
          onClick={(e) => checkCase(e)}
        >
          genitive
        </div>
        <div
          className={"case-option" + articleGrid.dative}
          onClick={(e) => checkCase(e)}
        >
          dative
        </div>
        <div
          className={"case-option" + articleGrid.accusative}
          onClick={(e) => checkCase(e)}
        >
          accusative
        </div>
      </div>
      <div className="cases">
        <div
          className={"case-option" + articleGrid.singular}
          onClick={(e) => checkCase(e)}
        >
          singular
        </div>
        <div
          className={"case-option" + articleGrid.plural}
          onClick={(e) => checkCase(e)}
        >
          plural
        </div>
      </div>
      <div className="cases">
        <div
          id="masculine"
          className={"case-option" + masculineOrFirst}
          onClick={(e) => checkCase(e)}
        >
          {hasPersonAttribute ? "first" : "masculine"}
        </div>
        <div
          id="feminine"
          className={"case-option" + feminineOrSecond}
          onClick={(e) => checkCase(e)}
        >
          {hasPersonAttribute ? "second" : "feminine"}
        </div>
        <div
          id="neuter"
          className={"case-option" + neutereOrThird}
          onClick={(e) => checkCase(e)}
        >
          {hasPersonAttribute ? "third" : "neuter"}
        </div>
      </div>
    </div>
  );
};
