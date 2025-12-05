import "./Menu.css";
import { useEffect } from "react";

const VerbMenuOptions = ({
  menuOptions,
  setVerbCharacteristics,
  characteristic,
  verbCharacteristics,
}) => {
  //menu options will be an array
  useEffect(() => {
    const charChoices = document.getElementsByClassName(characteristic);
    let anOptionIsPicked = false;
    let allOptionIndex = 0;
    for (let i = 0; i < charChoices.length; i++) {
      if (charChoices[i].innerHTML === "All") {
        allOptionIndex = i;
      }

      //styling type since options must be upper case.
      if (characteristic === "Type") {
        if (
          verbCharacteristics.Type === charChoices[i].innerHTML &&
          !charChoices[i].className.includes("chosen-option")
        ) {
          charChoices[i].className += " chosen-option";
          anOptionIsPicked = true;
          console.log(
            `${charChoices[i].innerHTML}: ${charChoices[i].className}`
          );
        }
      } else if (
        verbCharacteristics[characteristic] ===
          charChoices[i].innerHTML.toLowerCase() &&
        !charChoices[i].className.includes("chosen-option")
      ) {
        charChoices[i].className += " chosen-option";
        anOptionIsPicked = true;
        console.log(`${charChoices[i].innerHTML}: ${charChoices[i].className}`);
      }
    }

    if (anOptionIsPicked) {
      console.log("option picked");
      if (
        charChoices[allOptionIndex].className.includes(
          "verb-menu-all-selection"
        )
      ) {
        console.log(charChoices[allOptionIndex]);
        charChoices[
          allOptionIndex
        ].className = `${characteristic} verb-menu-all-selection`;
      }
    }
  });

  const controlHighlight = (e) => {
    const charCategoryArray = document.getElementsByClassName(characteristic);

    for (let i = 0; i < charCategoryArray.length; i++) {
      charCategoryArray[i].className = charCategoryArray[i].className.replace(
        " chosen-option",
        ""
      );
      charCategoryArray[i].className = charCategoryArray[i].className.replace(
        " chosen-all-option",
        ""
      );
    }

    if (e.target.className.includes("verb-menu-all-selection")) {
      e.target.className = e.target.className + " chosen-all-option";
    } else {
      e.target.className = e.target.className + " chosen-option";
    }
  };

  const handleAddCharacteristic = (e) => {
    e.preventDefault();
    controlHighlight(e);

    const charOption = e.target.innerHTML.toLowerCase();
    const newCharOptions = { ...verbCharacteristics };

    if (["Verb", "Participle", "Infinitive"].includes(e.target.innerHTML)) {
      newCharOptions["Type"] = e.target.innerHTML;
      setVerbCharacteristics(newCharOptions);
    } else if (charOption === "all") {
      newCharOptions[characteristic] = "";
      setVerbCharacteristics(newCharOptions);
    } else {
      newCharOptions[characteristic] = charOption;
      setVerbCharacteristics(newCharOptions);
    }
    return;
  };

  return (
    <div className="verb-menu-categories">
      {menuOptions.map((option) => {
        return (
          <div
            className={`${characteristic} verb-menu-selection`}
            key={option}
            onClick={handleAddCharacteristic}
          >
            {option}
          </div>
        );
      })}
      <div
        className={`${characteristic} verb-menu-all-selection chosen-all-option`}
        onClick={handleAddCharacteristic}
        key={characteristic + "all"}
      >
        All
      </div>
    </div>
  );
};

export default VerbMenuOptions;
