import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { randomVerse } from "./features/verseSlice";
import { selectWordSlice } from "./features/wordSlice";
import './Word.css';

//PROBABLY need to make a state for each element
//in the three lists :(


const Word = () => {
  const { word, partOfSpeech, parse } = useSelector(selectWordSlice);
  console.log(word);
  console.log(partOfSpeech);
  console.log(parse);

  const dispatch = useDispatch();

  const checkCase = (e) => {
    e.preventDefault();
    const wordCase = parse.case;
    const wordNumber = parse.number;
    const wordGender = parse.gender;
    
    let target = e.target.innerHTML;
    
    if (wordCase.includes(target) || wordNumber === target || wordGender.includes(target)) {
      e.target.className = "case-option-correct"
    } else {
      e.target.className = "case-option-wrong"
    }
  }

  const [, updateState] = React.useState(); //trying to force re-render
  const forceUpdate = React.useCallback(() => updateState({}), []);

  let selectedWord = "";
  let describeWord = "";

  if (word) {
    selectedWord = word;
  } else {
    selectedWord = " ";
  }

  if (partOfSpeech !== "article" && word) {
    describeWord = "Not an artcle :("
  } else if (partOfSpeech !== "article" && !word) {
    describeWord = "Select an article"
  }

  return (
    <div>
      <p>{selectedWord}</p>
      <p>{describeWord}</p>
      <div className="categories">
        <ul className="cases">
          <li onClick={(e) => checkCase(e)}>nominative</li>
          <li onClick={(e) => checkCase(e)}>genitive</li>
          <li onClick={(e) => checkCase(e)}>dative</li>
          <li onClick={(e) => checkCase(e)}>accusative</li>
        </ul>
        <ul className="number">
          <li onClick={(e) => checkCase(e)}>singular</li>
          <li onClick={(e) => checkCase(e)}>plural</li>
        </ul>
        <ul className="Gender">
          <li onClick={(e) => checkCase(e)}>masculine</li>
          <li onClick={(e) => checkCase(e)}>feminine</li>
          <li onClick={(e) => checkCase(e)}>neuter</li>
        </ul>
      </div>
      <button
        onClick={() => {
          dispatch(randomVerse());
          forceUpdate();
        }}
      >
        New Verse
      </button>
    </div>
  );
};

export default Word;
