import { useEffect, useState } from "react";
import { randomWord } from "./greek_text/parseLexicon";
import { wordUsages } from "./greek_text/greekLexiconObject";

const Verb = () => {
    const [verb, setVerb] = useState("")

    useEffect(() => {
        let newVerb = randomWord(wordUsages, ["Present","Active","Indicative"])
        setVerb(newVerb);
    }, [])

    return (
        <div>
            <div>Verbs</div>
            <h1>{verb}</h1>
            <button onClick={()=> setVerb(randomWord(wordUsages, ["Present","Active","Indicative"]))}>click</button>
        </div>
    )
}

export default Verb;