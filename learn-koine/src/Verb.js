import { useEffect, useState } from "react";
// import { randomWord } from "./greek_text/parseLexicon";
import { randomVerb } from "./greek_text/parseLexicon";
import { wordUsages } from "./greek_text/greekLexiconObject";
import VerbGrid from "./VerbGrid";
import "./Verb.css";
import { setWord, selectWordSlice } from "./features/wordSlice";
import { setMode } from "./features/verseSlice";
import { clearWord } from "./features/wordSlice";
import { Link } from "react-router-dom";
// import { useCycle } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import "./Menu.css";
import VerbMenuOptions from "./VerbMenuOptions";
import { setVerbType, selectVerbSlice } from "./features/verbSlice";
import HelpTool from "./HelpTool";

const Verb = () => {
  const verb = useSelector(selectWordSlice);
  const dispatch = useDispatch();
  const [verbMode, setVerbMode] = useState(
    "Use the menu to select verb forms to practice."
  );
  const [verbCharacteristics, setVerbCharacteristics] = useState({
    partOfSpeech: "Verb",
  });

  const [correctCount, setCorrectCount] = useState(0);

  const verbType = useSelector(selectVerbSlice);

  useEffect(() => {
    dispatch(setMode("Parse Verbs"));
  }, [dispatch]);

  const handleClick = (option = verbMode, exclusions = []) => {
    if (
      option === "Use the menu to select verb forms to practice." ||
      option === "Any"
    ) {
      option = "Verb";
      setVerbMode("Any");
    }
    if (verbCharacteristics["Type"] === "Verb") {
      exclusions = ["Participle", "Infinitive"];
    }

    if (verbCharacteristics.Tense === "perfect") {
      exclusions = ["imperfect", "pluperfect"];
    }

    console.log(option);

    if (
      verbCharacteristics.Type === "Participle" &&
      !(
        verbCharacteristics.Mood === undefined ||
        verbCharacteristics.Mood === ""
      )
    ) {
      return alert('check "All" in mood category to practice Participles.');
    }

    if (
      verbCharacteristics.Type === "Infinitive" &&
      !(
        verbCharacteristics.Mood === undefined ||
        verbCharacteristics.Mood === ""
      ) &&
      !(
        verbCharacteristics.Person === undefined ||
        verbCharacteristics.Person === ""
      ) &&
      !(
        verbCharacteristics.Number === undefined ||
        verbCharacteristics.Number === ""
      )
    ) {
      return alert(
        'Mood, Person, and Number must be set to "All" to practice Infinitives.'
      );
    }

    if (
      verbCharacteristics.Type === "Infinitive" &&
      (verbCharacteristics.Tense === "future" ||
        verbCharacteristics.Tense === "imperfect")
    ) {
      return alert("Infinitives cannot be in the future or imperfect tense.");
    }

    dispatch(clearWord());
    let splitOption = option.split(" ");
    console.log("handleClick: " + splitOption);
    let nextVerb = randomVerb(wordUsages, "parse", splitOption, exclusions);

    if (!verbType.Type) {
      console.log("if verb type not declared, don't render any grid.");
    }

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
        verbType={verbType}
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
          verbCharacteristics={verbCharacteristics}
          correctCount={correctCount}
          setCorrectCount={setCorrectCount}
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
  verbType,
}) => {
  const [openOrClosed, setIsOpenOrClosed] = useState("open");
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

    console.log(verbChars);
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
    console.log("handleSelect() options: " + options);
    dispatch(setVerbType(newVerbType));
    setVerbMode(options);
    setTimeout(() => {
      handleClick(options);
      setIsOpenOrClosed("closed");
    }, 10);
  };

  const menuLinks = ["vocabulary", "parsing-verse"];

  return (
    <div className={`menu-container-${openOrClosed}`} key="verb-menu-container">
      <div
        className={`menu-button-container-${openOrClosed}`}
        key="verb-menu-button"
      >
        <button
          className="menu-toggle-button"
          onClick={() =>
            openOrClosed === "open"
              ? setIsOpenOrClosed("closed")
              : setIsOpenOrClosed("open")
          }
        >
          {openOrClosed === "open" ? "X" : "="}
        </button>
      </div>

      <div className={`verb-menu-options-${openOrClosed}`}>
        <p style={{ whiteSpace: "nowrap" }}>Select verb options</p>
        <h3 key="type-title">Type</h3>
        <VerbMenuOptions
          menuOptions={["Verb", "Participle", "Infinitive"]}
          verbCharacteristics={verbCharacteristics}
          setVerbCharacteristics={setVerbCharacteristics}
          characteristic={"Type"}
          key="Type"
        />
        <h3 key="tense-title">Tense</h3>
        <VerbMenuOptions
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
        />

        <h3 key="voice-title">Voice</h3>
        <VerbMenuOptions
          menuOptions={["Active", "Middle", "Passive", "Deponent"]}
          verbCharacteristics={verbCharacteristics}
          setVerbCharacteristics={setVerbCharacteristics}
          characteristic={"Voice"}
          key="Voice"
        />

        <h3 key="mood-title">Mood</h3>
        <VerbMenuOptions
          menuOptions={["Indicative", "Subjunctive", "Imperative"]}
          verbCharacteristics={verbCharacteristics}
          setVerbCharacteristics={setVerbCharacteristics}
          characteristic={"Mood"}
          key="Mood"
        />

        <h3 key="person-title">Person</h3>
        <VerbMenuOptions
          menuOptions={["First", "Second", "Third"]}
          verbCharacteristics={verbCharacteristics}
          setVerbCharacteristics={setVerbCharacteristics}
          characteristic={"Person"}
          key="Person"
        />

        <h3 key="number-title">Number</h3>
        <VerbMenuOptions
          menuOptions={["Singular", "Plural"]}
          verbCharacteristics={verbCharacteristics}
          setVerbCharacteristics={setVerbCharacteristics}
          characteristic={"Number"}
          key="Number"
        />
        <button
          className="submit-button"
          onClick={() => {
            handleSelect(verbCharacteristics);
          }}
          key="Submit-Button"
        >
          Submit
        </button>
        <div className="menu-links" key="menu-lins">
          <h3 key="links-title">Links</h3>
          {menuLinks.map((link) => {
            return (
              <div key={link + "-div"}>
                <Link
                  to={"/" + link}
                  className="menu-link"
                  onClick={() => dispatch(clearWord())}
                  key={link}
                >
                  {link === "parsing-verse" ? "parsing practice" : link}
                </Link>
                <br></br>
              </div>
            );
          })}
          <Link to={"/"} className="menu-link" key="home-link">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Verb;
