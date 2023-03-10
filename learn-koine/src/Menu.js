import React from 'react';
import { Link } from "react-router-dom";
import { motion, useCycle, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { selectVerseMode, setMode } from './features/verseSlice';
import { clearWord } from './features/wordSlice';
import "./Menu.css"

const Menu = ({setArticleGrid, blankGrid, menuOptions, menuLinks}) => {
    const verseMode = useSelector(selectVerseMode);
    const [open, cycleOpen] = useCycle(false, true);
    const dispatch = useDispatch();

    console.log(menuOptions)

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

    const handleClick =({option})=> {
        console.log(option, "definite article")
        dispatch(clearWord())
        if (option === "definite article") {
            dispatch(setMode("definite article"));
        } else if (option === "Noun and Adjective") {
            dispatch(setMode("Noun and Adjective"));
        } else if (option === "Conjunction") {
            dispatch(setMode("Conjunction"));
        } else if (option === "Preposition") {
            dispatch(setMode("Preposition"));
        } else {
           return console.log("missed styling");
        }
        setArticleGrid(blankGrid)
          setTimeout(() => {
            cycleOpen();
          }, 10)
    }

    return (
        <div className="menu-container">
            <div className="menu-button-container">
                <button className="menu-toggle-button" onClick={cycleOpen}>{open ? "X Choose an Option" : "="}</button>
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
                    <motion.h3 variants={itemVariants}>{verseMode === "definite article" ? "Definite Article" : verseMode}</motion.h3>
                    {menuOptions.map((option) => {
                        return (<>
                                    <motion.button className="menu-button" variants={itemVariants} onClick={()=> handleClick({option})}>{option}</motion.button>
                                    <br></br>
                                </>)
                        
                    })}
                </motion.div>
                <br></br>
                <motion.div className="menu-links"
                initial="closed"
                animate="open"
                exit="closed"
               
                variants={itemVariants}>
                    <motion.h3>Links</motion.h3>
                    {menuLinks.map((link) => {
                        return(
                                <>
                                    <Link to={"/" + link} className="menu-link" onClick={() => dispatch(clearWord())}>{link === "parsing-verse" ? "parsing practice" : link}</Link>
                                    <br></br>
                                </>
                            )
                    })}
                    <br></br>
                        <Link to={"/"} className="menu-link">Home</Link>
                </motion.div>
            </motion.div>}
          </AnimatePresence>
        </div>
    )
}

export default Menu