import React from "react";
import "./Word.css";
import { useSelector } from "react-redux";
import { selectWordSlice } from "./features/wordSlice";

export const ArticleGrid = ({ articleGrid, setArticleGrid }) => {

  const { parse } = useSelector(selectWordSlice);

  let masculineOrFirst = articleGrid.masculine;
  let feminineOrSecond = articleGrid.femine;
  let neutereOrThird = articleGrid.neuter;

  if(parse.person !== "") {
    masculineOrFirst = articleGrid.first;
    feminineOrSecond = articleGrid.second;
    neutereOrThird = articleGrid.third;
  }


  const checkCase = (e) => {
    e.preventDefault();
    const wordCase = parse.case;
    const wordNumber = parse.number.toLowerCase();
    const wordGender = parse.gender;
    const wordPerson = parse.person;

    let target = e.target.innerHTML;
    console.log(`${wordPerson} - ${target}: ${wordPerson === target}`)
    if (
      wordCase.includes(target) ||
      wordNumber === target ||
      wordGender.includes(target) ||
      wordPerson === target
    ) {
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
          {parse.person ? "first" : "masculine"}
        </div>
        <div
          id="feminine"
          className={"case-option" + feminineOrSecond}
          onClick={(e) => checkCase(e)}
        >
          {parse.person ? "second" : "feminine"}
        </div>
        <div
          id="neuter"
          className={"case-option" + neutereOrThird}
          onClick={(e) => checkCase(e)}
        >
          {parse.person ? "third" : "neuter"}
        </div>
      </div>
    </div>
  );
};
