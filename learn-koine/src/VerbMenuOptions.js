import "./Menu.css";

const VerbMenuOptions = ({
  menuOptions,
  setVerbCharacteristics,
  characteristic,
  verbCharacteristics,
}) => {
  //menu options will be an array

  const handleAddCharacteristic = (e) => {
    e.preventDefault();
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
            className="verb-menu-selection"
            key={option}
            onClick={handleAddCharacteristic}
          >
            {option}
          </div>
        );
      })}
      <div
        className="verb-menu-all-selection"
        onClick={handleAddCharacteristic}
      >
        All
      </div>
    </div>
  );
};

export default VerbMenuOptions;
