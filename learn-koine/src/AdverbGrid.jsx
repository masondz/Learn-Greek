import "./Word.css";
import { selectWordSlice } from "./features/wordSlice";
import { useSelector } from "react-redux";

const AdverbGrid = () => {
  const word = useSelector(selectWordSlice);

  return (
    <div>{word.parse.includes("Adverb") ? "Correct!" : "Pick an Adverb"}</div>
  );
};

export default AdverbGrid;
