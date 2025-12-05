import "./Word.css";
import { selectWordSlice } from "./features/wordSlice";
import { useSelector } from "react-redux";

const ParticleGrid = () => {
  const word = useSelector(selectWordSlice);

  return (
    <div>
      {word.parse.includes("Particle") ? "Correct!" : "Pick a Particle"}
    </div>
  );
};

export default ParticleGrid;
