import React, { useState } from "react";
import { isArticle } from "./features/wordSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectArticleCount, selectFoundArticles } from "./features/countSlice";
import { setAllArticlesFound, incrementFoundArticles } from "./features/countSlice";



const wrongPick = "\u2716";
const correctPick = "\u2713";



const Word = (props) => {
    // console.log("Word renders");
    const [indicator, setIndicator] = useState("o")
    const [highlight, setHighlight] = useState("")
    const articleCount = useSelector(selectArticleCount)
    const foundArticles = useSelector(selectFoundArticles)
    const dispatch = useDispatch()


    const { blankGrid, setArticleGrid, word } = props;

    const handleClick = () => {
        if (highlight === "-highlight-correct") {
            return;
        }
        if(word.partOfSpeech === "article") {
            setIndicator(correctPick);
            setHighlight("-highlight-correct");
            dispatch(incrementFoundArticles());
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