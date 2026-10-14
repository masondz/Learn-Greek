import { useEffect, useState } from "react";
// import { randomWord } from "../greek_text/parseLexicon";
import { randomVerb } from "../greek_text/parseLexicon";
import { wordUsages } from "../greek_text/greekLexiconObject";
import VerbGrid from "./VerbGrid.jsx";
import "./Verb.css";
import { setWord, selectWordSlice } from "../features/wordSlice";
import { setMode } from "../features/verseSlice";
import { clearWord } from "../features/wordSlice";
import { Link } from "react-router-dom";
// import { useCycle } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import "../Menu.css";
import VerbMenuOptions from "./VerbMenuOptions.jsx";
import { setVerbType, selectVerbSlice } from "../features/verbSlice";
import HelpTool from "../ParsingPractice/HelpTool.jsx";

const Verb = () => {
  const verb = useSelector(selectWordSlice);
  const dispatch = useDispatch();
  const [verbMode, setVerbMode] = useState(
    "Use the menu to select verb forms to practice."
  );
  const [verbCharacteristics, setVerbCharacteristics] = useState({
    partOfSpeech: "Verb",
  });
  const [activeVerbCharacteristics, setActiveVerbCharacteristics] = useState({
    partOfSpeech: "Verb",
  });

  const [correctCount, setCorrectCount] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);

  const verbType = useSelector(selectVerbSlice);

  useEffect(() => {
    dispatch(setMode("Parse Verbs"));
  }, [dispatch]);

  const handleClick = (
    option = verbMode,
    exclusions = [],
    characteristics = activeVerbCharacteristics
  ) => {
    if (
      option === "Use the menu to select verb forms to practice." ||
      option === "Any"
    ) {
      option = "Verb";
      setVerbMode("Any");
    }
    if (characteristics.Type === "Verb") {
      exclusions = ["Participle", "Infinitive"];
    }

    if (characteristics.Tense === "perfect") {
      exclusions = ["imperfect", "pluperfect"];
    }


    if (
      characteristics.Type === "Participle" &&
      !(
        characteristics.Mood === undefined ||
        characteristics.Mood === ""
      )
    ) {
      return alert('check "All" in mood category to practice Participles.');
    }

    if (
      characteristics.Type === "Infinitive" &&
      !(
        characteristics.Mood === undefined ||
        characteristics.Mood === ""
      ) &&
      !(
        characteristics.Person === undefined ||
        characteristics.Person === ""
      ) &&
      !(
        characteristics.Number === undefined ||
        characteristics.Number === ""
      )
    ) {
      return alert(
        'Mood, Person, and Number must be set to "All" to practice Infinitives.'
      );
    }

    if (
      characteristics.Type === "Infinitive" &&
      (characteristics.Tense === "future" ||
        characteristics.Tense === "imperfect")
    ) {
      return alert("Infinitives cannot be in the future or imperfect tense.");
    }

    dispatch(clearWord());
    let splitOption = option.split(" ");

    let nextVerb = randomVerb(wordUsages, "parse", splitOption, exclusions);


    dispatch(setWord(nextVerb));
    setCorrectCount(0);
  };

  return (
    <div>
      <VerbMenu
        setVerbMode={setVerbMode}
        handleClick={handleClick}
        verbCharacteristics={verbCharacteristics}
          setVerbCharacteristics={setVerbCharacteristics}
          setActiveVerbCharacteristics={setActiveVerbCharacteristics}
          verbType={verbType}
        autoAdvance={autoAdvance}
        setAutoAdvance={setAutoAdvance}
      />
      <br></br>
      <div className="verb-component">
        <section className="verb-header">
          <div style={{ marginTop: "45px" }}>{verbMode}</div>
          <h1>{verb.word}</h1>
          <h3>{verb.word ? wordUsages[verb.word].gloss : ""}</h3>
        </section>
        <VerbGrid
          verb={verb}
          dispatch={dispatch}
          setWord={setWord}
          randomVerb={randomVerb}
          verbMode={verbMode}
          verbCharacteristics={activeVerbCharacteristics}
          correctCount={correctCount}
          setCorrectCount={setCorrectCount}
          autoAdvance={autoAdvance}
          setAutoAdvance={setAutoAdvance}
        />
        <br></br>
        <button className="button-random" onClick={() => handleClick()}>
          Random Verb
        </button>
      </div>
      <HelpTool pageName={"verb-help"} />
    </div>
  );
};

//VerbMenu component
const VerbMenu = ({
  setVerbMode,
  handleClick,
  verbCharacteristics,
  setVerbCharacteristics,
  setActiveVerbCharacteristics,
  verbType,
  autoAdvance,
  setAutoAdvance,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(true);
  const dispatch = useDispatch();

  const checkSelectionExists = (options) => {
    if (
      options.includes("future") &&
      (options.includes("imperative") || options.includes("subjunctive"))
    ) {
      return false;
    } else if (options.includes("perfect") && options.includes("subjunctive")) {
      if (options.includes("middle") || options.includes("passive")) {
        return false;
      }
    } else if (
      options.includes("imperfect") &&
      (options.includes("subjunctive") || options.includes("imperative"))
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleSelect = (verbChars) => {
    const newVerbType = verbChars.Type;
    const optionsArr = Object.keys(verbChars);


    let options = "";

    if (optionsArr.length === 1 && verbChars.Type === undefined) {
      options = "Any";
    }

    for (let i = 1; i < optionsArr.length; i++) {
      options += ` ${verbChars[optionsArr[i]]}`;
    }
    if (!options) {
      return alert("You must pick verb options from the menu!!");
    }

    if (!checkSelectionExists(options)) {
      alert("Verb with given characteristics does not exist.");
      return;
    }

    dispatch(setVerbType(newVerbType));
    setActiveVerbCharacteristics(verbChars);
    setVerbMode(options);
    setTimeout(() => {
      handleClick(options, [], verbChars);
      setOptionsOpen(false);
    }, 10);
  };

  const menuLinks = ["vocabulary", "parsing-verse/"];

  return (
    <>
      <div className={`verb-sidebar-${sidebarOpen ? "open" : "closed"}`} key="verb-menu-container">
        <button type="button" className="verb-sidebar-toggle" aria-label={sidebarOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={sidebarOpen} onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? "×" : "☰"}
        </button>
        {sidebarOpen && <div className="verb-sidebar-content">
          <label className="auto-toggle">
            <input type="checkbox" checked={autoAdvance} onChange={(event) => setAutoAdvance(event.target.checked)} />
            {" "}Automatically advance to next verb
          </label>
          <hr />
          <div className="menu-links">
            <h3>Links</h3>
            {menuLinks.map((link) => <div key={link + "-div"}>
              <Link to={"/" + link} className="menu-link" onClick={() => dispatch(clearWord())}>
                {link === "parsing-verse/" ? "Parsing Practice" : link}
              </Link>
            </div>)}
            <Link to="/" className="menu-link">Home</Link>
          </div>
        </div>}
      </div>
      <button
        type="button"
        className="verb-options-toggle"
        aria-label={optionsOpen ? "Close verb options" : "Open verb options"}
        aria-expanded={optionsOpen}
        onClick={() => setOptionsOpen(!optionsOpen)}
      >
        ⚙
      </button>

      <div className={`verb-menu-options-${optionsOpen ? "open" : "closed"}`}>
        <p style={{ whiteSpace: "nowrap" }}>Select verb options</p>
        <div className="verb-options-grid">
          <section className="verb-menu-group"><h3 key="type-title">Type</h3><VerbMenuOptions
            menuOptions={["Verb", "Participle", "Infinitive"]}
            verbCharacteristics={verbCharacteristics}
            setVerbCharacteristics={setVerbCharacteristics}
            characteristic={"Type"}
            key="Type"
          /></section>
          <section className="verb-menu-group"><h3 key="tense-title">Tense</h3><VerbMenuOptions
            menuOptions={[
              "Present",
              "Aorist",
              "Future",
              "Perfect",
              "Imperfect",
              "Pluperfect",
            ]}
            verbCharacteristics={verbCharacteristics}
            setVerbCharacteristics={setVerbCharacteristics}
            characteristic={"Tense"}
            key="Tense"
          /></section>

          <section className="verb-menu-group"><h3 key="voice-title">Voice</h3><VerbMenuOptions
            menuOptions={["Active", "Middle", "Passive", "Deponent"]}
            verbCharacteristics={verbCharacteristics}
            setVerbCharacteristics={setVerbCharacteristics}
            characteristic={"Voice"}
            key="Voice"
          /></section>

          <section className="verb-menu-group"><h3 key="mood-title">Mood</h3><VerbMenuOptions
            menuOptions={["Indicative", "Subjunctive", "Imperative"]}
            verbCharacteristics={verbCharacteristics}
            setVerbCharacteristics={setVerbCharacteristics}
            characteristic={"Mood"}
            key="Mood"
          /></section>

          <section className="verb-menu-group"><h3 key="person-title">Person</h3><VerbMenuOptions
            menuOptions={["First", "Second", "Third"]}
            verbCharacteristics={verbCharacteristics}
            setVerbCharacteristics={setVerbCharacteristics}
            characteristic={"Person"}
            key="Person"
          /></section>

          <section className="verb-menu-group"><h3 key="number-title">Number</h3><VerbMenuOptions
            menuOptions={["Singular", "Plural"]}
            verbCharacteristics={verbCharacteristics}
            setVerbCharacteristics={setVerbCharacteristics}
            characteristic={"Number"}
            key="Number"
          /></section>
        </div>
        <section className="verb-menu-group verb-menu-submit-card">
          <button
            className="submit-button"
            onClick={() => handleSelect(verbCharacteristics)}
            key="Submit-Button"
          >
            Submit
          </button>
        </section>
      </div>
    </>
  );
};

export default Verb;
