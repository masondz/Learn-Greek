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

const tableContainer = {
  width: "100%",
  border: "2px solid darkgray",
  display: "flex",
  flexDirection: "column",
  marginBottom: 10,
};

const hFour = {
  margin: 0,
  background: "darkblue",
  color: "white",
  paddingLeft: "1em",
};

const tableStyle = {
  borderCollapse: "collapse",
  border: "solid black 1px",
  textAlign: "center",
};

const rowStyle = {
  background: "darkgray",
  color: "white",
  border: "1px black solid",
  padding: "5px",
  textShadow: "1px 1px 2px black",
};

const tdStyle = {
  border: "1px black solid",
  padding: "3px",
  background: "white",
};

const augmentStyle = {
  color: "blue",
};

const reduplicationStyle = {
  color: "rgb(20, 195, 10, 1)",
};

const endingStyle = {
  color: "rgb(255, 20, 50)",
};

const aoristTense = {
  name: <p>Aorist Active Indicative</p>,
  firstSingular: (
    <p>
      <i style={augmentStyle}>ἔ</i>λυ<b style={endingStyle}>σα</b>
    </p>
  ),
  secondSingular: (
    <p>
      <i style={augmentStyle}>ἔ</i>λυ<b style={endingStyle}>σας</b>
    </p>
  ),
  thirdSingular: (
    <p>
      <i style={augmentStyle}>ἔ</i>λυ<b style={endingStyle}>σε(ν)</b>
    </p>
  ),
  firstPlural: (
    <p>
      <i style={augmentStyle}>ἔ</i>λυ<b style={endingStyle}>σαμεν</b>
    </p>
  ),
  secondPlural: (
    <p>
      <i style={augmentStyle}>ἔ</i>λυ<b style={endingStyle}>σατε</b>
    </p>
  ),
  thirdPlural: (
    <p>
      <i style={augmentStyle}>ἔ</i>λυ<b style={endingStyle}>σαν</b>
    </p>
  ),
};

const imperfectTense = {
  name: "Imperfect Active Indicative",
  firstSingular: (
    <p>
      <i style={augmentStyle}>ἔ</i>λυ<b style={endingStyle}>ον</b>
    </p>
  ),
  secondSingular: (
    <p>
      <i style={augmentStyle}>ἔ</i>λυ<b style={endingStyle}>ες</b>
    </p>
  ),
  thirdSingular: (
    <p>
      <i style={augmentStyle}>ἔ</i>λυ<b style={endingStyle}>ε(ν)</b>
    </p>
  ),
  firstPlural: (
    <p>
      <i style={augmentStyle}>ἔ</i>λυ<b style={endingStyle}>ομεν</b>
    </p>
  ),
  secondPlural: (
    <p>
      <i style={augmentStyle}>ἔ</i>λυ<b style={endingStyle}>ετε</b>
    </p>
  ),
  thirdPlural: (
    <p>
      <i style={augmentStyle}>ἔ</i>λυ<b style={endingStyle}>ον</b>
    </p>
  ),
};

const presentTense = {
  name: "Present Active Indicative",
  firstSingular: (
    <p>
      λυ<b style={endingStyle}>ω</b>
    </p>
  ),
  secondSingular: (
    <p>
      λυ<b style={endingStyle}>εις</b>
    </p>
  ),
  thirdSingular: (
    <p>
      λυ<b style={endingStyle}>ει</b>
    </p>
  ),
  firstPlural: (
    <p>
      λυ<b style={endingStyle}>ομεν</b>
    </p>
  ),
  secondPlural: (
    <p>
      λυ<b style={endingStyle}>ετε</b>
    </p>
  ),
  thirdPlural: (
    <p>
      λυ<b style={endingStyle}>ουσι(ν)</b>
    </p>
  ),
};

const futureTense = {
  name: "Future Active Indicative",
  firstSingular: (
    <p>
      λυ<b style={endingStyle}>σω</b>
    </p>
  ),
  secondSingular: (
    <p>
      λυ<b style={endingStyle}>σεις</b>
    </p>
  ),
  thirdSingular: (
    <p>
      λυ<b style={endingStyle}>σει</b>
    </p>
  ),
  firstPlural: (
    <p>
      λυ<b style={endingStyle}>σομεν</b>
    </p>
  ),
  secondPlural: (
    <p>
      λυ<b style={endingStyle}>σετε</b>
    </p>
  ),
  thirdPlural: (
    <p>
      λυ<b style={endingStyle}>σουσι(ν)</b>
    </p>
  ),
};
//ύ
const perfectTense = {
  name: "Perfect Active Indicative",
  firstSingular: (
    <p>
      <i style={reduplicationStyle}>λέ</i>λυ<b style={endingStyle}>κα</b>
    </p>
  ),
  secondSingular: (
    <p>
      <i style={reduplicationStyle}>λέ</i>λυ<b style={endingStyle}>κας</b>
    </p>
  ),
  thirdSingular: (
    <p>
      <i style={reduplicationStyle}>λέ</i>λυ<b style={endingStyle}>κε(ν)</b>
    </p>
  ),
  firstPlural: (
    <p>
      <i style={reduplicationStyle}>λε</i>λύ<b style={endingStyle}>καμεν</b>
    </p>
  ),
  secondPlural: (
    <p>
      <i style={reduplicationStyle}>λε</i>λύ<b style={endingStyle}>κατε</b>
    </p>
  ),
  thirdPlural: (
    <p>
      <i style={reduplicationStyle}>λε</i>λύ<b style={endingStyle}>κασι(ν)</b>
    </p>
  ),
};
const pluperfectTense = {
  name: "Pluperfect Active Indicative",
  firstSingular: (
    <p>
      <i style={augmentStyle}>ἐ</i>
      <i style={reduplicationStyle}>λέ</i>λυ<b style={endingStyle}>κειν</b>
    </p>
  ),
  secondSingular: (
    <p>
      <i style={augmentStyle}>ἐ</i>
      <i style={reduplicationStyle}>λέ</i>λυ<b style={endingStyle}>κεις</b>
    </p>
  ),
  thirdSingular: (
    <p>
      <i style={augmentStyle}>ἐ</i>
      <i style={reduplicationStyle}>λέ</i>λυ<b style={endingStyle}>κει</b>
    </p>
  ),
  firstPlural: (
    <p>
      <i style={augmentStyle}>ἐ</i>
      <i style={reduplicationStyle}>λε</i>λύ<b style={endingStyle}>κειμεν</b>
    </p>
  ),
  secondPlural: (
    <p>
      <i style={augmentStyle}>ἐ</i>
      <i style={reduplicationStyle}>λε</i>λύ<b style={endingStyle}>κειτε</b>
    </p>
  ),
  thirdPlural: (
    <p>
      <i style={augmentStyle}>ἐ</i>
      <i style={reduplicationStyle}>λε</i>λύ<b style={endingStyle}>κεισαν</b>
    </p>
  ),
};

const Paradigms = ({ tense }) => {
  return (
    <div style={tableContainer}>
      <h4 style={hFour}>{tense.name}</h4>
      <table style={tableStyle}>
        <tbody>
          <tr>
            <th style={rowStyle}>Person</th>
            <th style={rowStyle}>Singular</th>
            <th style={rowStyle}>Plural</th>
          </tr>
          <tr>
            <td style={tdStyle}>First</td>
            <td style={tdStyle}>{tense.firstSingular}</td>
            <td style={tdStyle}>{tense.firstPlural}</td> {/*firstPlural*/}
          </tr>
          <tr>
            <td style={tdStyle}>Second</td>
            <td style={tdStyle}>{tense.secondSingular}</td> {/*secondSingular*/}
            <td style={tdStyle}>{tense.secondPlural}</td> {/*secondPlural*/}
          </tr>
          <tr>
            <td style={tdStyle}>Third</td>
            <td style={tdStyle}>{tense.thirdSingular}</td> {/*thirdSingular*/}
            <td style={tdStyle}>{tense.thirdPlural}</td> {/*thirdPlural*/}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const HelpTool = ({ pageName }) => {
  const [helpShown, setHelpShown] = useState(false);
  const [tipShown, setTipShown] = useState(false);

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
      {helpShown && (
        <div className="help-paragraph">
          {chosenPage}
          <HelpTabs tipShown={tipShown} setTipShown={setTipShown} />
        </div>
      )}
      <button className="help-tool-button" onClick={handleOnClick}>
        ?
      </button>
    </div>
  );
};

const HelpTabs = ({ tipShown, setTipShown }) => {
  function handleClick() {
    setTipShown(!tipShown);
  }

  return (
    <div>
      <p onClick={handleClick}>Tips</p>
      {tipShown && (
        <div style={{ marginBottom: 11 }}>
          <Paradigms tense={presentTense} />
          <Paradigms tense={futureTense} />
          <Paradigms tense={aoristTense} />
          <Paradigms tense={imperfectTense} />
          <Paradigms tense={perfectTense} />
          <Paradigms tense={pluperfectTense} />
        </div>
      )}
    </div>
  );
};

export default HelpTool;
