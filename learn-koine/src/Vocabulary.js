import React, {useState} from "react";
import './Vocabulary.css';
import { mostCommonObj } from "./greek_text/vocabularyWords";


let mostCKeys = Object.keys(mostCommonObj);

export default function Vocabulary() {
    const [deck, setDeck] = useState(mostCKeys);
    // const [mode, setMode] = useState("");
    // const [learnedWords, setLearnedWords] = useState([])
    const [deckIndex, setDeckIndex] = useState(0)

    const handleNext = () => {
        if ((deckIndex + 1) > deck.length - 1) {
            setDeckIndex(0);
        } else {
            setDeckIndex(deckIndex + 1)
        }
    }

    const handlePrev = () => {
        if ((deckIndex - 1) < 0) {
            setDeckIndex(deck.length - 1)
        } else {
            setDeckIndex(deckIndex - 1)
        }
    }

    const addToLearnt = () => {
        //the word goes into learnt array
        setDeck(deck.filter((word) => word !== deck[deckIndex]))
        console.log(deck)
    }

    console.log(mostCommonObj)
    console.log(deck)

    return ( 
        <div className="body">
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <p>{deck[deckIndex]}</p>
                    </div>
                    <div className="flip-card-back">
                        <p>{mostCommonObj[deck[deckIndex]]}</p>
                    </div>
                </div>
            </div>
            <div>
                <button onClick={handlePrev}>{'<'}</button>
                <button onClick={handleNext}>{'>'}</button>
                <button onClick={addToLearnt}>Learnt</button>
                <button>Retry</button>
            </div>
        </div>
    )
};
