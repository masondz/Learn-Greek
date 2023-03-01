import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { motion, useCycle, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { vocabListObj } from "./greek_text/vocabularyWords";

import "./Menu.css"

/*
    word: null,
    partOfSpeech: null,
    parse: "",
    gNum: "",
*/

const MenuVocabulary = ({setDeck, setDeckIndex, setVocabList, setIsFlipped}) => {
    const [open, cycleOpen] = useCycle(false, true);
    const [category, setCategory] = useState("Pick a Category")
    const dispatch = useDispatch();

    const sideVariants = {
        closed: {
            transition: {
                // staggerChildren: 0.01,
                staggerDiretion: -1
            }
        },
        open: {
            transition: {
                // staggerChildren: 0.1,
                staggerDirection: 1,
            }
        },
    };

    const itemVariants = {
        closed: {
            opacity: 0
        },
        open: { opacity: 1}
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
                    setCategory("Most Common")
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
            setCategory("More Common")
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
                    setCategory("Common")
                    break;
                    default:
                        setDeck(["Pick Vocabulary List"]);
                        setVocabList({});
                        break;
                    }
                    setTimeout(() => {
                        cycleOpen()
                    }, 10)
                }, 150)
      };

    return (
        <div className="menu-container">
            <div className="menu-button-container">
                <button className="menu-toggle-button" onClick={cycleOpen}>{open ? "X" : "="}</button>
            </div>
         <AnimatePresence>

          {open &&
            <motion.div
            initial={{ width: 0, position: "absolute", backgound: "none"}}
            animate={{ width: 300, minHeight: "110vh", position: "relative", backgoundColor: "white"}}
            exit={{
                height: 10,
                width: 0, 
                transition: { delay: 0.29, duration: 0.1}
            }}>
                <div>
                </div>
                <motion.div className="menu-options"
                initial="closed"
                animate="open"
                exit="closed"
                variants={sideVariants}>
                    <motion.h3 variants={itemVariants}>{category}</motion.h3>
                    <motion.button className="menu-button" variants={itemVariants} onClick={()=> handleSetList("Most Common")}>Most Common</motion.button>
                    <br></br>
                    <motion.button className="menu-button" variants={itemVariants} onClick={()=> handleSetList("More Common")}>More Common</motion.button>
                    <br></br>
                    <motion.button className="menu-button" variants={itemVariants} onClick={()=> handleSetList("Common")}>Common</motion.button>
                    <br></br>
                </motion.div>
                <br></br>
                <motion.div className="menu-links"
                initial="closed"
                animate="open"
                exit="closed"
               
                variants={itemVariants}>
                    <Link className="menu-link" to={"/articles"}>Parse Practice</Link>
                    <br></br>
                    <Link className="menu-link" to={"/"}>Home</Link>
                </motion.div>
            </motion.div>}
          </AnimatePresence>
        </div>
    )
}

export default MenuVocabulary