import "./Word.css"

const VerbGrid = ({ verse }) => {

    const onClick = (e) => {
        if (verse.parse.includes(e.target.innerHTML)) {
            console.log("correct!")
        } else {
            console.log('wrong!')
        }
    }
    
    return (
      <div>
        <div className="cases">
            <div className={"verb-option"}>
                first
            </div>
            <div className={"verb-option"}>
                second
            </div>
            <div className={"verb-option"}>
                third
            </div>
        </div>
        <div className="cases">
            <div className={"verb-option"}>
                singular
            </div>
            <div className={"verb-option"}>
                plural
            </div>
        </div>
      </div>
    );
  };

  export default VerbGrid;