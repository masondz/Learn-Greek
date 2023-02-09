import React, { useState } from "react";
import { isArticle } from "./features/wordSlice";
import { useDispatch } from "react-redux";

const Word = (props) => {
    const [highlight, setHighlight] = useState("")
    const dispatch = useDispatch()
    
    const { blankGrid, setArticleGrid } = props;

    const handleClick = () => {
        setHighlight("-highlight-correct")
        dispatch(isArticle(props.word))
        setArticleGrid(blankGrid)
    }

    return (
        <p className={"verse-word" + highlight} name={props.word} onClick={handleClick}>{props.word}</p>)
}

export default Word;