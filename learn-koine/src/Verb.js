import { useEffect, useState } from "react";
import { randomWord } from "./greek_text/parseLexicon";
import { wordUsages } from "./greek_text/greekLexiconObject";
import VerbGrid from "./VerbGrid";
import "./Verb.css";
import { setWord, selectWordSlice } from "./features/wordSlice";
import { selectVerseMode, setMode } from "./features/verseSlice";
import { clearWord } from "./features/wordSlice";
import { Link } from "react-router-dom";
import { motion, useCycle, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import "./Menu.css";

const VerbMenu = ({ setVerbMode, handleClick, verbMode }) => {
  const verseMode = useSelector(selectVerseMode);
  const [open, cycleOpen] = useCycle(true, false);
  const dispatch = useDispatch();

  const handleSelect = (option) => {
    handleClick(option);
    setTimeout(() => {
      cycleOpen();
    }, 10);
  };

  const sideVariants = {
    closed: {
      transition: {
        // staggerChildren: 0.01,
        staggerDiretion: 0.01,
      },
    },
    open: {
      transition: {
        // staggerChildren: 0.1,
        staggerDirection: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
    },
    open: { opacity: 1 },
  };

  const menuOptions = [
    "Present Active Indicative",
    "Future Active Indicative",
    "Aorist Active Indicative",
    "Perfect Active Indicative",
    "Imperfect Active Indicative",
  ];

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
            <motion.div
              className="verb-menu-options"
              initial="closed"
              animate="open"
              exit="closed"
              variants={itemVariants}
            >
              <motion.h2>Tense</motion.h2>
              <input type="radio" id="present" name="tense" value="present" />
              <label for="present">Present</label>
              <input type="radio" id="aorist" name="tense" value="aorist" />
              <label for="aorist">Aorist</label>
              <input type="radio" id="future" name="tense" value="future" />
              <label for="future">Future</label>
              <input type="radio" id="perfect" name="tense" value="perfect" />
              <label for="perfect">Perfect</label>
              <input
                type="radio"
                id="Imperfect"
                name="voice"
                value="imperfect"
              />
              <label for="imperfect">Imperfect</label>

              <motion.h2>Voice</motion.h2>
              <input type="radio" id="active" name="voice" value="active" />
              <label for="active">Active</label>
              <input type="radio" id="middle" name="voice" value="middle" />
              <label for="middle">Middle</label>
              <input type="radio" id="passive" name="voice" value="passive" />
              <label for="passive">Passive</label>
              <input type="radio" id="deponent" name="voice" value="deponent" />
              <label for="deponent">Deponent</label>

              <motion.h2>Mood</motion.h2>
              <input
                type="radio"
                id="indicative"
                name="mood"
                value="indicative"
              />
              <label for="indicative">Indicative</label>
              <input
                type="radio"
                id="subjunctive"
                name="mood"
                value="subjunctive"
              />
              <label for="subjunctive">Subjunctive</label>
              <input
                type="radio"
                id="imperative"
                name="mood"
                value="imperative"
              />
              <label for="imperative">Imperative</label>

              <motion.h2>Person</motion.h2>
              <input type="radio" id="first" name="person" value="first" />
              <label for="first">First</label>
              <input type="radio" id="second" name="person" value="second" />
              <label for="second">Second</label>
              <input type="radio" id="third" name="person" value="third" />
              <label for="third">Third</label>

              <motion.h3>Number</motion.h3>
              <input
                type="radio"
                id="singular"
                name="person"
                value="singular"
              />
              <label for="singular">Singular</label>
              <input type="radio" id="plural" name="person" value="plural" />
              <label for="plural">Plural</label>
              <br></br>
              <motion.button
                onClick={() => {
                  alert("coming soon!");
                  cycleOpen();
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
            {/* 
            <div></div>
            <motion.div
              className="menu-options"
              initial="closed"
              animate="open"
              exit="closed"
              variants={sideVariants}
            >
              <motion.h3 variants={itemVariants}>{verseMode}</motion.h3>
              {menuOptions.map((option) => {
                return (
                  <>
                    <motion.button
                      className="menu-button"
                      variants={itemVariants}
                      onClick={() => handleSelect({ option })}
                    >
                      {option}
                    </motion.button>
                    <br></br>
                  </>
                );
              })}
            </motion.div>
            <br></br>
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
             */}
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

  const handleClick = ({ option = verbMode }) => {
    dispatch(clearWord());
    setVerbMode(option);
    let lowerCaseOption = option.toLowerCase();
    let splitOption = lowerCaseOption.split(" ");
    if (option === "Select Verb Form to Practice") {
      return alert("You must select a verb option from menu!");
    }
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
        <button className="button" onClick={handleClick}>
          Random Verb
        </button>
      </div>
    </div>
  );
};

export default Verb;
