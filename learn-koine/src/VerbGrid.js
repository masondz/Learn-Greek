import { wordUsages } from "./greek_text/greekLexiconObject";
import "./Word.css"

const VerbGrid = ({ verb, dispatch, setWord, randomWord }) => {

    const handleNext = () => {
        let caseOptions = document.getElementsByClassName("case-option")
        console.log(caseOptions)
        for (let i = 0; i <caseOptions.length; i++) {
            caseOptions[i].className = "case-option";
        }
        let nextVerb = randomWord(wordUsages, ["Present", "Active", "Indicative"])
        dispatch(setWord(nextVerb))
    }

    const onClick = (e) => {
        if (verb.parse.includes(e.target.innerHTML)) {
            console.log("correct!")
            e.target.className = e.target.className + " correct";
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
        <button onClick={handleNext}>Next</button>
      </div>
    );
  };

  export default VerbGrid;