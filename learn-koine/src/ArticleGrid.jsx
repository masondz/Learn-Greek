import React, { useEffect } from "react";
import "./Word.css";
import { useSelector, useDispatch } from "react-redux";
import { selectWordSlice } from "./features/wordSlice";
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
}) => {
  const { parse } = useSelector(selectWordSlice);
  const scoreObject = useSelector(selectScoreSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCorrectWorth(30)); //correct choices in this grid are worth 30 points.
    dispatch(setWrongWorth(10));
  }, [dispatch]);

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

  const checkCase = (e) => {
    e.preventDefault();
    const wordCase = parse;

    let target = e.target.innerHTML;
    if (scoreObject.correctFound >= 3) {
      return;
    }
    if (wordCase.includes(target)) {
      dispatch(increaseCorrect());
      dispatch(
        setCurrentScore(scoringFunction(scoreObject, "correct", verseReference))
      );
      setArticleGrid({ ...articleGrid, [target]: "-correct" });
    } else {
      dispatch(increaseWrong());
      dispatch(setCurrentScore(scoringFunction(scoreObject, "wrong")));
      setArticleGrid({ ...articleGrid, [target]: "-wrong" });
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
