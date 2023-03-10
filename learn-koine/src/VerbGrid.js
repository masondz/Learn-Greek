import { useState } from "react";
import { wordUsages } from "./greek_text/greekLexiconObject";
import "./Word.css"

const VerbGrid = ({ verb, dispatch, setWord, randomWord, verbMode }) => {
    const [checkParse, setCheckParse] = useState("Pick correct person and number");

     const handleNext = () => {
        let caseOptions = document.getElementsByClassName("case-option")
        console.log(caseOptions)
        for (let i = 0; i <caseOptions.length; i++) {
            caseOptions[i].className = "case-option";
        }
        let nextVerb = randomWord(wordUsages, verbMode.split(" "))
        dispatch(setWord(nextVerb))
    }

    let numCorrect = 0;

    const isParsed = () => {
        console.log("check parsed thing")
        numCorrect++;
        if (numCorrect === 2) {
            setCheckParse("Good Job!");
            setTimeout(() => {
                handleNext();
                setCheckParse("Pick correct person and number")
            }, 850)
        } else{
            return;
        }
    };

    const onClick = (e) => {
        if (verb.parse.includes(e.target.innerHTML)) {
            console.log("correct!")
            e.target.className = e.target.className + " correct";
            isParsed();
        } else {
            console.log('wrong!');
            e.target.className = e.target.className + " wrong";
        }
    }
    
    return (
      <div>
        <div className="cases">
            <div className={"case-option"}
                onClick={ (e) => onClick(e)}>
                first
            </div>
            <div className={"case-option"}
                onClick={ (e) => onClick(e)}>
                second
            </div>
            <div className={"case-option"}
                onClick={ (e) => onClick(e)}>
                third
            </div>
        </div>
        <div className="cases">
            <div className={"case-option"}
                onClick={ (e) => onClick(e)}>
                singular
            </div>
            <div className={"case-option"}
                onClick={ (e) => onClick(e)}>
                plural
            </div>
        </div>
        <br></br>
        <p>{checkParse}</p>
      </div>
    );
  };

  export default VerbGrid;