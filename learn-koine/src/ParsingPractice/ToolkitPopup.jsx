import React, { useEffect, useRef } from "react";
import "./ToolkitPopup.css";

const tools = [
  { name: "Definite Article", abbrev: "Def Art.", id: "definite-article", className: "definite-article-picked" },
  { name: "Conjunction", abbrev: "Conj.", id: "Conjunction", className: "Conjunction-picked" },
  { name: "Preposition", abbrev: "Prep.", id: "Preposition", className: "Preposition-picked" },
  { name: "Noun and Adjective", abbrev: "Noun/Adj.", id: "Noun-and-Adjective", className: "Noun-and-Adjective-picked" },
  { name: "Pronoun", abbrev: "Pron.", id: "Pronoun", className: "Pronoun-picked" },
  { name: "Verb", abbrev: "Vrb.", id: "Verb", className: "Verb-picked" },
  { name: "Particle", abbrev: "Part.", id: "Particle", className: "Particle-picked" },
  { name: "Adverb", abbrev: "Adv.", id: "Adverb", className: "Adverb-picked" },
];

const ToolkitPopup = ({ position, onSelectMode }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    if (popupRef.current) {
      const popup = popupRef.current;
      const rect = popup.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let adjustedLeft = position.x;
      let adjustedTop = position.y;

      // Check if popup goes off right edge
      if (adjustedLeft + rect.width > viewportWidth - 10) {
        adjustedLeft = viewportWidth - rect.width - 10;
      }

      // Check if popup goes off left edge
      if (adjustedLeft < 10) {
        adjustedLeft = 10;
      }

      // Check if popup goes off bottom edge
      if (adjustedTop + rect.height > viewportHeight - 10) {
        adjustedTop = position.y - rect.height - 40;
      }

      // Check if popup goes off top edge (after positioning above)
      if (adjustedTop < 10) {
        adjustedTop = 10;
      }

      popup.style.left = `${adjustedLeft}px`;
      popup.style.top = `${adjustedTop}px`;
    }
  }, [position]);

  const handleClick = (tool) => {
    let modeName = tool.name;
    if (tool.name === "Definite Article") {
      modeName = "definite article";
    }
    onSelectMode(modeName, tool.id);
  };

  return (
    <div
      ref={popupRef}
      className="toolkit-popup"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    >
      {tools.map((tool) => (
        <div
          key={tool.id}
          className={`popup-tool ${tool.className}`}
          onClick={() => handleClick(tool)}
        >
          {tool.name}
        </div>
      ))}
    </div>
  );
};

export default ToolkitPopup;
