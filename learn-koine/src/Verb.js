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

const VerbMenu = ({ setVerbMode, handleClick, verbMode }) => {
  const [verbCharacteristics, setVerbCharacteristics] = useState({
    partOfSpeech: "Verb",
  });
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
    <div className="menu-container">
      <div className="menu-button-container">
        <button className="menu-toggle-button" onClick={cycleOpen}>
          {open ? "X Choose an Option" : "="}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
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
            <motion.p>{verbMode}</motion.p>
            <motion.div
              className="verb-menu-options"
              initial="closed"
              animate="open"
              exit="closed"
              variants={itemVariants}
            >
              <motion.h3>Tense</motion.h3>
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
              />

              <motion.h3>Voice</motion.h3>
              <VerbMenuOptions
                menuOptions={["Active", "Middle", "Passive", "Deponent"]}
                verbCharacteristics={verbCharacteristics}
                setVerbCharacteristics={setVerbCharacteristics}
                characteristic={"Voice"}
              />

              <motion.h3>Mood</motion.h3>
              <VerbMenuOptions
                menuOptions={["Indicative", "Subjunctive", "Imperative"]}
                verbCharacteristics={verbCharacteristics}
                setVerbCharacteristics={setVerbCharacteristics}
                characteristic={"Mood"}
              />

              <motion.h3>Person</motion.h3>
              <VerbMenuOptions
                menuOptions={["First", "Second", "Third"]}
                verbCharacteristics={verbCharacteristics}
                setVerbCharacteristics={setVerbCharacteristics}
                characteristic={"Person"}
              />

              <motion.h3>Number</motion.h3>
              <VerbMenuOptions
                menuOptions={["Singular", "Plural"]}
                verbCharacteristics={verbCharacteristics}
                setVerbCharacteristics={setVerbCharacteristics}
                characteristic={"Number"}
              />
              <motion.button
                className="button"
                onClick={() => {
                  handleSelect(verbCharacteristics);
                }}
              >
                Submit
              </motion.button>
              <motion.div
                className="menu-links"
                initial="closed"
                animate="open"
                exit="closed"
                variants={itemVariants}
              >
                <motion.h3>Links</motion.h3>
                {menuLinks.map((link) => {
                  return (
                    <>
                      <Link
                        to={"/" + link}
                        className="menu-link"
                        onClick={() => dispatch(clearWord())}
                      >
                        {link === "parsing-verse" ? "parsing practice" : link}
                      </Link>
                      <br></br>
                    </>
                  );
                })}
                <br></br>
                <Link to={"/"} className="menu-link">
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

const Verb = () => {
  const verb = useSelector(selectWordSlice);
  const dispatch = useDispatch();
  const [verbMode, setVerbMode] = useState("Select Verb Form to Practice");

  useEffect(() => {
    dispatch(setMode("Parse Verbs"));
  }, [dispatch]);

  const handleClick = (option = verbMode) => {
    console.log(option);
    dispatch(clearWord());
    // let lowerCaseOption = option.toLowerCase();
    let splitOption = option.split(" ");
    let nextVerb = randomWord(wordUsages, "parse", splitOption);
    dispatch(setWord(nextVerb));
  };

  return (
    <div>
      <VerbMenu setVerbMode={setVerbMode} handleClick={handleClick} />
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
        />
        <br></br>
        <button className="button" onClick={() => handleClick()}>
          Random Verb
        </button>
      </div>
    </div>
  );
};

export default Verb;
