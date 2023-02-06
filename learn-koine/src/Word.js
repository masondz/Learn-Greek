import { useDispatch, useSelector } from "react-redux";
import { randomVerse } from "./features/verseSlice";
import { selectWordSlice } from "./features/wordSlice";





const Word = () => {
  const { word, partOfSpeech, parse } = useSelector(selectWordSlice);
  console.log(word);
  console.log(partOfSpeech);
  console.log(parse);

  const dispatch = useDispatch();

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
  } else if (partOfSpeech === "article") {
    describeWord = `${parse.case} - ${parse.number} - ${parse.gender}`
  }

  return (
    <div>
      <p>{selectedWord}</p>
      <p>
        {describeWord}
      </p>
      <div className="categories">
        <ul className="cases">
          <li>Nominative</li>
          <li>Genative</li>
          <li>Dative</li>
          <li>Accusative</li>
        </ul>
        <ul className="number">
          <li>Singular</li>
          <li>Plural</li>
        </ul>
        <ul className="Gender">
          <li>Masculine</li>
          <li>Feminine</li>
          <li>Neuter</li>
        </ul>
      </div>
      <button
        onClick={() => {
          dispatch(randomVerse());
        }}
      >
        New Verse
      </button>
    </div>
  );
};

export default Word;
