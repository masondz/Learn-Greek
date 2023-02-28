import React from 'react';
import { Link } from "react-router-dom";
import { motion, useCycle, AnimatePresence } from "framer-motion";
import "./Menu.css"

const Menu = () => {
    const [open, cycleOpen] = useCycle(false, true);

    const sideVariants = {
        closed: {
            transition: {
                staggerChildren: 0.1,
                staggerDiretion: -1
            }
        },
        open: {
            transition: {
                staggerChildren: 0.1,
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


    return (
        <div className="menu-container">
            <div className="menu-button-container">
                <button onClick={cycleOpen}>{open ? "X" : "Menu"}</button>
            </div>
         <AnimatePresence>

          {open &&
            <motion.div
            initial={{ width: 0, height: 50, position: "absolute"}}
            animate={{ width: 300, minHeight: "110vh", position: "relative"}}
            exit={{
                width: 0, 
                height: 50,
                transition: { delay: 0.7, duration: 0.2}
            }}>
                <div>
                </div>
                <motion.div className="menu-options"
                initial="closed"
                animate="open"
                exit="closed"
                variants={sideVariants}>
                    <motion.h3 variants={itemVariants}>Menu</motion.h3>
                    <motion.button variants={itemVariants}>option 1</motion.button>
                    <motion.button variants={itemVariants}>option 2</motion.button>
                    <motion.button variants={itemVariants}>option 3</motion.button>
                </motion.div>
                <motion.div className="menu-links"
                initial="closed"
                animate="open"
                exit="closed"
               
                variants={itemVariants}>
                    <Link to={"vocabulary"}>Vocabulary</Link>
                    <Link to={"/"}>Home</Link>
                </motion.div>
            </motion.div>}
          </AnimatePresence>
        </div>
    )
}

export default Menu