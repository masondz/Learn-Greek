import { useEffect } from "react";
import { randomWord } from "./greek_text/parseLexicon";
import { wordUsages } from "./greek_text/greekLexiconObject";
import VerbGrid from "./VerbGrid";
import "./Verb.css";
import { setWord, selectWordSlice } from "./features/wordSlice";
import { useDispatch, useSelector } from "react-redux";
import Menu from "./Menu";



const Verb = () => {
    const verb = useSelector(selectWordSlice);
    const dispatch = useDispatch();

    const menuOptions = [
        "Present Active Indicative"
    ]

    const menuLinks = [
        "Vocabulary",
        "Parse Practice"
    ]

    useEffect(() => {
        let newVerb = randomWord(wordUsages, ["Present","Active","Indicative"])
        dispatch(setWord(newVerb));
    }, [dispatch])

    return (
        <div className="body">
            <Menu menuOptions={menuOptions} menuLinks={menuLinks}/>
            <br></br>
            <div>Present Active Indicative Verbs</div>
            <h1 style={{margin: "100px"}}>{verb.word}</h1>
            <VerbGrid verb={verb} dispatch={dispatch} setWord={setWord} randomWord={randomWord}/>
        </div>
    )
}

export default Verb;