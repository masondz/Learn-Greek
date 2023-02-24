import React from "react";
import "./Word.css";
import { useSelector } from "react-redux";
import { selectWordSlice } from "./features/wordSlice";

export const ArticleGrid = ({ articleGrid, setArticleGrid }) => {

  const { parse } = useSelector(selectWordSlice);

  let masculineOrFirst = articleGrid.masculine;
  let feminineOrSecond = articleGrid.feminine;
  let neutereOrThird = articleGrid.neuter;
  let hasPersonAttribute = false;

  if(parse.includes("first") || parse.includes("second") || parse.includes("third")) {
    console.log("has first second or thrid")
    masculineOrFirst = articleGrid.first;
    feminineOrSecond = articleGrid.second;
    neutereOrThird = articleGrid.third;
    hasPersonAttribute = true;
  }


  const checkCase = (e) => {
    e.preventDefault();
    const wordCase = parse;

    let target = e.target.innerHTML;
    
    if (wordCase.includes(target)) {
      console.log("there's a match")
      setArticleGrid({ ...articleGrid, [target]: "-correct" });
    } else {
      console.log("there's NOT a match")
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
