import React from "react";
import "./Word.css";
import { useSelector } from "react-redux";
import { selectWordSlice } from "./features/wordSlice";

export const ArticleGrid = ({ articleGrid, setArticleGrid }) => {
  const { parse } = useSelector(selectWordSlice);

  console.log(articleGrid);

  const checkCase = (e) => {
    e.preventDefault();
    console.log(e);
    const wordCase = parse.case;
    const wordNumber = parse.number;
    const wordGender = parse.gender;

    let target = e.target.innerHTML;

    if (
      wordCase.includes(target) ||
      wordNumber === target ||
      wordGender.includes(target)
    ) {
      setArticleGrid({ ...articleGrid, [target]: "-correct" });
    } else {
      setArticleGrid({ ...articleGrid, [target]: "-wrong" });
    }
  };

  return (
    <div className="categories">
      <div className="cases">
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
          className={"case-option" + articleGrid.masculine}
          onClick={(e) => checkCase(e)}
        >
          masculine
        </div>
        <div
          className={"case-option" + articleGrid.feminine}
          onClick={(e) => checkCase(e)}
        >
          feminine
        </div>
        <div
          className={"case-option" + articleGrid.neuter}
          onClick={(e) => checkCase(e)}
        >
          neuter
        </div>
      </div>
    </div>
  );
};
