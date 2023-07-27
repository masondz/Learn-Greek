import { useState } from "react";

const vocabularyHelp = <p>Vocabulary Help</p>;
const parseHelp = <p>Parse Verses Help</p>;
const verbHelp = <p>Verb Help</p>;
const HelpTool = ({ pageName }) => {
  const [helpShown, setHelpShown] = useState(false);

  let chosenPage = "";

  function handleOnClick() {
    setHelpShown(!helpShown);
  }

  if (pageName === "initial") {
    chosenPage = <di>Return to the home page to select an area of study.</di>;
  } else if (pageName === "vocabulary-help") {
    chosenPage = vocabularyHelp;
  } else if (pageName === "parse-help") {
    chosenPage = parseHelp;
  } else if (pageName === "verb-help") {
    chosenPage = verbHelp;
  }

  return (
    <div style={{ minHeight: "100%" }}>
      {helpShown && <div className="help-container">{chosenPage}</div>}

      <button className="help-tool-button" onClick={handleOnClick}>
        ?
      </button>
    </div>
  );
};

export default HelpTool;
