import { useEffect, useState } from "react";
import { randomWord } from "./greek_text/parseLexicon";
import { wordUsages } from "./greek_text/greekLexiconObject";
import VerbGrid from "./VerbGrid";
import "./Verb.css";

const Verb = () => {
    const [verb, setVerb] = useState("")

    useEffect(() => {
        let newVerb = randomWord(wordUsages, ["Present","Active","Indicative"])
        setVerb(newVerb);
    }, [])

    return (
        <div className="body">
            <div>Present Active Indicative Verbs</div>
            <h1 style={{margin: "100px"}}>{verb.word}</h1>
            <VerbGrid verb={verb}/>
        </div>
    )
}

export default Verb;