import React, { useState } from "react";
import { isArticle } from "./features/wordSlice";
import { useDispatch } from "react-redux";

const wrongPick = "\u2716";
const correctPick = "\u2713";



const Word = (props) => {
    const [indicator, setIndicator] = useState("")
    const [highlight, setHighlight] = useState("")
    const dispatch = useDispatch()
    
    const { blankGrid, setArticleGrid, word } = props;

    const handleClick = () => {
        if(word.partOfSpeech === "article") {
            setIndicator(correctPick);
            setHighlight("-highlight-correct")
        } else {
            setIndicator(wrongPick);
            setHighlight("-highlight-wrong")
        }
        dispatch(isArticle(word.word))
        setArticleGrid(blankGrid)
    }

    return (
        <div className={"verse-word" + highlight}>
            <p className={"indicator" + highlight}>{indicator}</p>
            <p className="inner-word" name={word.word} onClick={handleClick}>{word.word}</p>
        </div>
    )
}

export default Word;