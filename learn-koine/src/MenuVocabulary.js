import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useCycle, AnimatePresence } from "framer-motion";
import { vocabListObj } from "./greek_text/vocabularyWords";

import "./Menu.css";

const MenuVocabulary = ({
  setDeck,
  setDeckIndex,
  setVocabList,
  setIsFlipped,
}) => {
  const [open, cycleOpen] = useCycle(true, false);
  const [category, setCategory] = useState("Pick a Category");

  const sideVariants = {
    closed: {
      transition: {
        // staggerChildren: 0.01,
        staggerDiretion: -1,
      },
    },
    open: {
      transition: {
        // staggerChildren: 0.1,
        staggerDirection: 1,
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
    },
    open: { opacity: 1 },
  };

  const handleSetList = (option) => {
    let list = {};
    setIsFlipped(false);
    setTimeout(() => {
      setDeckIndex(0);
      switch (option) {
        case "Most Common":
          for (let key in vocabListObj) {
            if (Number(vocabListObj[key].frequency) > 500) {
              list[key] = vocabListObj[key];
            }
          }
          setDeck(Object.keys(list));
          setVocabList(Object.keys(list));
          setCategory("Most Common");
          break;
        case "More Common":
          for (let key in vocabListObj) {
            if (
              Number(vocabListObj[key].frequency) < 500 &&
              Number(vocabListObj[key].frequency > 250)
            ) {
              list[key] = vocabListObj[key];
            }
          }
          setDeck(Object.keys(list));
          setVocabList(Object.keys(list));
          setCategory("More Common");
          break;
        case "Common":
          for (let key in vocabListObj) {
            if (
              Number(vocabListObj[key].frequency) < 250 &&
              Number(vocabListObj[key].frequency > 49)
            ) {
              list[key] = vocabListObj[key];
            }
          }
          setDeck(Object.keys(list));
          setVocabList(Object.keys(list));
          setCategory("Common");
          break;
        default:
          setDeck(["Pick Vocabulary List"]);
          setVocabList({});
          break;
      }
      setTimeout(() => {
        cycleOpen();
      }, 10);
    }, 150);
  };

  return (
    <div className="menu-container">
      <div className="menu-button-container">
        <button className="menu-toggle-button" onClick={cycleOpen}>
          {open ? `X   Vocabulary Practice` : "="}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ width: "0px", position: "absolute", backgound: "none" }}
            animate={{
              width: "300px",
              minHeight: "110vh",
              position: "relative",
              backgoundColor: "white",
            }}
            exit={{
              height: "10px",
              width: "0px",
              transition: { delay: 0.29, duration: 0.1 },
            }}
          >
            <div></div>
            <motion.div
              className="menu-options"
              initial="closed"
              animate="open"
              exit="closed"
              variants={sideVariants}
            >
              <motion.h3 variants={itemVariants}>{category}</motion.h3>
              <motion.button
                className="menu-button"
                variants={itemVariants}
                onClick={() => handleSetList("Most Common")}
              >
                Most Common
              </motion.button>
              <br></br>
              <motion.button
                className="menu-button"
                variants={itemVariants}
                onClick={() => handleSetList("More Common")}
              >
                More Common
              </motion.button>
              <br></br>
              <motion.button
                className="menu-button"
                variants={itemVariants}
                onClick={() => handleSetList("Common")}
              >
                Common
              </motion.button>
              <br></br>
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
              <Link className="menu-link" to={"/parsing-verse"}>
                Parse Practice
              </Link>
              <br></br>
              <Link className="menu-link" to={"/verb"}>
                Verbs
              </Link>
              <br></br>
              <br></br>
              <Link className="menu-link" to={"/"}>
                Home
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuVocabulary;
