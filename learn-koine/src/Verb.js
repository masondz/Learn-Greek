import { useEffect, useState } from "react";
import { randomWord } from "./greek_text/parseLexicon";
import { wordUsages } from "./greek_text/greekLexiconObject";
import VerbGrid from "./VerbGrid";
import "./Verb.css";
import { setWord, selectWordSlice } from "./features/wordSlice";
import { setMode } from "./features/verseSlice";
import { clearWord } from "./features/wordSlice";
import { Link } from "react-router-dom";
import { motion, useCycle, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import "./Menu.css";
import VerbMenuOptions from "./VerbMenuOptions";
import { setVerbType } from "./features/verbSlice";

const Verb = () => {
  const verb = useSelector(selectWordSlice);
  const dispatch = useDispatch();
  const [verbMode, setVerbMode] = useState("Select Verb Form to Practice");
  const [verbCharacteristics, setVerbCharacteristics] = useState({
    partOfSpeech: "Verb",
  });

  const [isRegularVerb, setIsRegularVerb] = useState(false);
  const [isParticiple, setIsParticiple] = useState(false);
  const [isInfinitive, setIsInfinitive] = useState(false);

  useEffect(() => {
    dispatch(setMode("Parse Verbs"));
  }, [dispatch]);

  const handleClick = (option = verbMode, exclusions = []) => {
    if (verbCharacteristics["Type"] === "Verb") {
      exclusions = ["Participle", "Infinitive"];
    }

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

    console.log(option);
    console.log(exclusions);

    dispatch(clearWord());
    let splitOption = option.split(" ");
    let nextVerb = randomWord(wordUsages, "parse", splitOption, exclusions);
    dispatch(setWord(nextVerb));
  };

  return (
    <div>
      <VerbMenu
        setVerbMode={setVerbMode}
        handleClick={handleClick}
        verbCharacteristics={verbCharacteristics}
        setVerbCharacteristics={setVerbCharacteristics}
        isInfinitive={isInfinitive}
        isParticiple={isParticiple}
        isRegularVerb={isRegularVerb}
        setIsInfinitive={setIsInfinitive}
        setIsParticiple={setIsParticiple}
        setIsRegularVerb={setIsRegularVerb}
      />
      <br></br>
      <div className="verb-component">
        <div style={{ marginTop: "70px" }}>{verbMode}</div>
        <h1>{verb.word}</h1>
        <h3>{verb.word ? wordUsages[verb.word].gloss : ""}</h3>
        <VerbGrid
          verb={verb}
          dispatch={dispatch}
          setWord={setWord}
          randomWord={randomWord}
          verbMode={verbMode}
          verbCharacteristics={verbCharacteristics}
          isInfinitive={isInfinitive}
          isParticiple={isParticiple}
          isRegularVerb={isRegularVerb}
          setIsInfinitive={setIsInfinitive}
          setIsParticiple={setIsParticiple}
          setIsRegularVerb={setIsRegularVerb}
        />
        <br></br>
        <button className="button" onClick={() => handleClick()}>
          Random Verb
        </button>
      </div>
    </div>
  );
};

//VerbMenu component
const VerbMenu = ({
  setVerbMode,
  handleClick,
  verbMode,
  verbCharacteristics,
  setVerbCharacteristics,
  setIsInfinitive,
  setIsParticiple,
  setIsRegularVerb,
}) => {
  const [open, cycleOpen] = useCycle(true, false);
  const dispatch = useDispatch();

  const checkSelectionExists = (options) => {
    if (
      options.includes("future") &&
      (options.includes("imperative") || options.includes("subjunctive"))
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleSelect = (verbCharacteristics) => {
    console.log(verbCharacteristics);
    const newVerbType = verbCharacteristics.Type;
    const optionsArr = Object.keys(verbCharacteristics);
    console.log(optionsArr);
    let options = "";

    for (let i = 0; i < optionsArr.length; i++) {
      options += ` ${verbCharacteristics[optionsArr[i]]}`;
    }
    if (!options) {
      return alert("You must pick verb options from the menu!!");
    }
    if (!checkSelectionExists(options)) {
      alert("Verb with given characteristics does not exist.");
      return;
    }
    if (verbCharacteristics.Type === "Participle") {
      setIsParticiple(true);
      setIsInfinitive(false);
      setIsRegularVerb(false);
    } else if (verbCharacteristics.Type === "Infinitive") {
      setIsInfinitive(true);
      setIsRegularVerb(false);
      setIsParticiple(false);
    } else if (verbCharacteristics.Type === "Verb") {
      setIsRegularVerb(true);
      setIsParticiple(false);
      setIsInfinitive(false);
    } else {
      setIsRegularVerb(false);
      setIsParticiple(false);
      setIsInfinitive(false);
    }
    dispatch(setVerbType(newVerbType));
    setVerbMode(options);
    setTimeout(() => {
      handleClick(options);
      cycleOpen();
    }, 10);
  };

  const itemVariants = {
    closed: {
      opacity: 0,
    },
    open: { opacity: 1 },
  };

  const menuLinks = ["vocabulary", "parsing-verse"];

  return (
    <div className="menu-container" key="verb-menu-container">
      <div className="menu-button-container" key="verb-menu-button">
        <button className="menu-toggle-button" onClick={cycleOpen}>
          {open ? "X Choose an Option" : "="}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            key="verb-menu"
            initial={{ width: 0, position: "absolute", backgound: "none" }}
            animate={{
              width: 300,
              minHeight: "110vh",
              position: "relative",
              backgoundColor: "white",
            }}
            exit={{
              height: 0,
              width: 0,
              transition: { delay: 0.5, duration: 0.3 },
            }}
          >
            <motion.div
              key="verb-sub-menu"
              className="verb-menu-options"
              initial="closed"
              animate="open"
              exit="closed"
              variants={itemVariants}
            >
              <motion.h3 key="type-title">Type</motion.h3>
              <VerbMenuOptions
                menuOptions={["Verb", "Participle", "Infinitive"]}
                verbCharacteristics={verbCharacteristics}
                setVerbCharacteristics={setVerbCharacteristics}
                characteristic={"Type"}
                key="Type"
              />
              <motion.h3 key="tense-title">Tense</motion.h3>
              <VerbMenuOptions
                menuOptions={[
                  "Present",
                  "Aorist",
                  "Future",
                  "Perfect",
                  "Imperfect",
                ]}
                verbCharacteristics={verbCharacteristics}
                setVerbCharacteristics={setVerbCharacteristics}
                characteristic={"Tense"}
                key="Tense"
              />

              <motion.h3 key="voice-title">Voice</motion.h3>
              <VerbMenuOptions
                menuOptions={["Active", "Middle", "Passive", "Deponent"]}
                verbCharacteristics={verbCharacteristics}
                setVerbCharacteristics={setVerbCharacteristics}
                characteristic={"Voice"}
                key="Voice"
              />

              <motion.h3 key="mood-title">Mood</motion.h3>
              <VerbMenuOptions
                menuOptions={["Indicative", "Subjunctive", "Imperative"]}
                verbCharacteristics={verbCharacteristics}
                setVerbCharacteristics={setVerbCharacteristics}
                characteristic={"Mood"}
                key="Mood"
              />

              <motion.h3 key="person-title">Person</motion.h3>
              <VerbMenuOptions
                menuOptions={["First", "Second", "Third"]}
                verbCharacteristics={verbCharacteristics}
                setVerbCharacteristics={setVerbCharacteristics}
                characteristic={"Person"}
                key="Person"
              />

              <motion.h3 key="number-title">Number</motion.h3>
              <VerbMenuOptions
                menuOptions={["Singular", "Plural"]}
                verbCharacteristics={verbCharacteristics}
                setVerbCharacteristics={setVerbCharacteristics}
                characteristic={"Number"}
                key="Number"
              />
              <motion.button
                className="button"
                onClick={() => {
                  handleSelect(verbCharacteristics);
                }}
                key="Submit-Button"
              >
                Submit
              </motion.button>
              <motion.div
                className="menu-links"
                initial="closed"
                animate="open"
                exit="closed"
                variants={itemVariants}
                key="menu-lins"
              >
                <motion.h3 key="links-title">Links</motion.h3>
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
                <br></br>
                <Link to={"/"} className="menu-link" key="home-link">
                  Home
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Verb;
