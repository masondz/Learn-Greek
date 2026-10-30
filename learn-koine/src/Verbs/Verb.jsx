import { useEffect, useState } from "react";
// import { randomWord } from "../greek_text/parseLexicon";
import { randomVerb } from "../greek_text/parseLexicon";
import { wordUsages } from "../greek_text/greekLexiconObject";
import VerbGrid from "./VerbGrid.jsx";
import "./Verb.css";
import { setWord, selectWordSlice } from "../features/wordSlice";
import { setMode } from "../features/verseSlice";
import { clearWord } from "../features/wordSlice";
// import { useCycle } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import "../Menu.css";
import VerbMenuOptions from "./VerbMenuOptions.jsx";
import { setVerbType, selectVerbSlice } from "../features/verbSlice";
import HelpTool from "../HelpTool.jsx";
import StudySidebar from "../StudySidebar";
import {
  getGuestVerbOptions,
  getGuestVerbAutoAdvance,
  saveGuestResumeLocation,
  saveGuestVerbAutoAdvance,
  saveGuestVerbOptions,
} from "../guestProgress";

const savedGuestVerbOptions = getGuestVerbOptions();
const initialPracticeCharacteristics = savedGuestVerbOptions || {
  partOfSpeech: "Verb",
};

const getPracticeOptions = (characteristics) => {
  const options = Object.entries(characteristics)
    .filter(([key, value]) => key !== "partOfSpeech" && value)
    .map(([key, value]) => (key === "Type" ? value : value.toLowerCase()));
  return options.length ? options : ["Verb"];
};

const Verb = () => {
  const verb = useSelector(selectWordSlice);
  const dispatch = useDispatch();
  const [verbMode, setVerbMode] = useState(
    "Use the menu to select verb forms to practice."
  );
  const [verbCharacteristics, setVerbCharacteristics] = useState(
    () => initialPracticeCharacteristics
  );
  const [activeVerbCharacteristics, setActiveVerbCharacteristics] = useState(
    () => initialPracticeCharacteristics
  );

  const [correctCount, setCorrectCount] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(getGuestVerbAutoAdvance);
  const [optionsOpen, setOptionsOpen] = useState(true);

  const verbType = useSelector(selectVerbSlice);

  useEffect(() => {
    dispatch(setMode("Parse Verbs"));
    saveGuestResumeLocation("/verb");
    const options = getPracticeOptions(initialPracticeCharacteristics);
    const exclusions = initialPracticeCharacteristics.Type === "Verb"
      ? ["Participle", "Infinitive"]
      : [];
    dispatch(setVerbType(initialPracticeCharacteristics.Type || ""));
    dispatch(setWord(randomVerb(wordUsages, "parse", options, exclusions)));
    setVerbMode(options.join(" "));
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
        optionsOpen={optionsOpen}
        setOptionsOpen={setOptionsOpen}
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
        <div className="verb-actions-row">
          <button className="button-random" onClick={() => handleClick()}>
            Random Verb
          </button>
          <div className="verb-bottom-tools">
            <button
              type="button"
              className="verb-options-toggle"
              aria-label={optionsOpen ? "Close verb options" : "Open verb options"}
              aria-expanded={optionsOpen}
              onClick={() => setOptionsOpen(!optionsOpen)}
            >
              <span className="material-symbols-outlined" aria-hidden="true">settings</span>
            </button>
            <HelpTool pageName="verb-help" className="verb-bottom-help" />
          </div>
        </div>
      </div>
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
  optionsOpen,
  setOptionsOpen,
}) => {
  const dispatch = useDispatch();
  const [advancedSettingsOpen, setAdvancedSettingsOpen] = useState(false);

  useEffect(() => {
    if (!optionsOpen) return undefined;

    const previousBodyOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
    };
  }, [optionsOpen]);

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
    const optionList = getPracticeOptions(verbChars);
    const options = optionList.join(" ");

    if (!checkSelectionExists(options)) {
      alert("Verb with given characteristics does not exist.");
      return;
    }

    saveGuestVerbOptions(verbChars);
    dispatch(setVerbType(newVerbType));
    setActiveVerbCharacteristics(verbChars);
    setVerbMode(options);
    setTimeout(() => {
      handleClick(options, [], verbChars);
      setOptionsOpen(false);
    }, 10);
  };

  return (
    <>
      <StudySidebar currentPage="verb">
        <section className="advanced-settings">
          <button
            type="button"
            className="advanced-settings-toggle"
            aria-expanded={advancedSettingsOpen}
            onClick={() => setAdvancedSettingsOpen((open) => !open)}
          >
            Advanced Settings
            <span aria-hidden="true">{advancedSettingsOpen ? "−" : "+"}</span>
          </button>
          {advancedSettingsOpen && (
            <div className="advanced-settings-panel">
              <label className="auto-toggle">
                <input
                  type="checkbox"
                  checked={autoAdvance}
                  onChange={(event) => {
                    const enabled = event.target.checked;
                    setAutoAdvance(enabled);
                    saveGuestVerbAutoAdvance(enabled);
                  }}
                />
                <span>Auto advance to next verb</span>
              </label>
            </div>
          )}
        </section>
      </StudySidebar>
      {optionsOpen && (
        <button
          type="button"
          className="verb-options-backdrop"
          aria-label="Close verb options"
          onClick={() => setOptionsOpen(false)}
        />
      )}
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
          <div className="verb-menu-actions">
            <button
              type="button"
              className="submit-button"
              onClick={() => handleSelect(verbCharacteristics)}
              key="Submit-Button"
            >
              Submit
            </button>
            <button
              type="button"
              className="submit-button verb-menu-cancel"
              onClick={() => setOptionsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Verb;
