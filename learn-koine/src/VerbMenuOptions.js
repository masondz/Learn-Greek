import "./Menu.css";

const VerbMenuOptions = ({
  menuOptions,
  setVerbCharacteristics,
  characteristic,
  verbCharacteristics,
}) => {
  //menu options will be an array

  // const handleNext = () => {
  //   let caseOptions = document.getElementsByClassName("case-option");
  //   console.log(caseOptions);
  //   for (let i = 0; i < caseOptions.length; i++) {
  //     caseOptions[i].className = "case-option";
  //   }
  //   let nextVerb = randomWord(
  //     wordUsages,
  //     "parse",
  //     verbMode.toLowerCase().split(" ")
  //   );
  //   dispatch(setWord(nextVerb));
  // };

  const controlHighlight = (e) => {
    const charCategoryArray = document.getElementsByClassName(characteristic);
    console.log(charCategoryArray);

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
    console.log(charOption);
    const newCharOptions = { ...verbCharacteristics };

    if (charOption === "all") {
      newCharOptions[characteristic] = "";
      setVerbCharacteristics(newCharOptions);
      return;
    }
    newCharOptions[characteristic] = charOption;
    setVerbCharacteristics(newCharOptions);
    console.log(newCharOptions);
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
