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
    for (let i = 0; i < charChoices.length; i++) {
      if (
        verbCharacteristics[characteristic] ===
        charChoices[i].innerHTML.toLowerCase()
      ) {
        console.log(charChoices[i].className);
        charChoices[i].className = charChoices[i].className + " chosen-option";
      }
    }
  }, []);

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

    if (charOption === "all") {
      newCharOptions[characteristic] = "";
      setVerbCharacteristics(newCharOptions);
      return;
    }
    newCharOptions[characteristic] = charOption;
    setVerbCharacteristics(newCharOptions);
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
        className={`${characteristic} verb-menu-all-selection`}
        onClick={handleAddCharacteristic}
      >
        All
      </div>
    </div>
  );
};

export default VerbMenuOptions;
