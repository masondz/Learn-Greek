import { useState } from "react";

const vocabularyHelp = (
  <div>
    <h2>Learning Vocabulary</h2>
    <p>
      First pick a category from the sidebar menu. <b>Most Common</b> are words
      that occur 500 times or more, <b>More Common</b> is between 500 and 250
      times, and <b>Common</b> are words that occur between 250 and 50 times.
    </p>
    <p>
      Tap the word to flip the card over. Once you believe you have memorized
      the word, hit the “learnt” button to remove it from the deck. Hit the
      arrow keys to move forward and backward through the deck.
    </p>
  </div>
);

const parseHelp = (
  <div>
    <h2>Verse Parsing Practice</h2>
    <p>
      This page allows the user to practice parsing an entire verse. First, a
      random verse is displayed. Users can use the search menu to pick a
      particular verse, as well as click through the New Testamen one verse at a
      time.
    </p>
    <p>
      At the bottom is a toolbar that has different parts of speech. Click on
      the part of speech you wish to practice or identify. Then select a word in
      the verse that matches the part of speech you chose. If you are wrong, the
      word will turn red, but you can still try to guess the correct part of
      speech.
    </p>
    <p>
      Once you identify the word’s correct part of speech, the word will be
      highlighted the corresponding color from the toolbar. You can then
      practice parsing the word. For examle: if the word is a definite article,
      you would choose the case, number and gender. If it is a verb, you will
      first choose what kind of verb it is (regular, participle, or infinitive),
      then select the correct options that describe the verb.
    </p>
    <p>
      Verbs, participles, and infinitives are associated with the "Verb" tab.
    </p>
    <p>
      Particles and Adverbs do not have parsing characteristics, so only a brief
      translation will be provided.
    </p>
    <p>
      NOTE: the text and definitions come from{" "}
      <a style={{ color: "rgb(236, 84, 13)" }} href="/about">
        open source material
      </a>
      . They may not represent the most current scholarship. This section is
      only meant for practicing identifying the parts of speech. For true
      translation work, scholarly lexicons, dictionaries and other resources
      should be consulted.
    </p>
  </div>
);

const verbHelp = (
  <div>
    <h2>Learning Verbs</h2>
    <p>
      This section randomly picks verbs that match the criteria you choose. If
      you wish to practice present tense verbs, click “present” in the Tense
      section of the sidebar menu and then click “submit”. Dida Key will then
      randomly select a verb that is in the present tense. Then use the grid to
      pick the correct parsing definition of the verb. Once all of the correct
      options have been selected, a new verb will automatically be displayed.
    </p>
    <p>
      If you hit “Random Verb” after submitting options, Dida Key will pick a
      new verb that matches your criteria. If you click the “Random Verb” button
      without choosing any options, then a completely random verb will be
      selected.
    </p>
  </div>
);

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
    <div className="help-container">
      <div style={{ position: "fixed" }}></div>
      {helpShown && <div className="help-paragraph">{chosenPage}</div>}
      <button className="help-tool-button" onClick={handleOnClick}>
        ?
      </button>
    </div>
  );
};

export default HelpTool;
