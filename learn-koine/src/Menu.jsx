import { useState } from "react";
import StudySidebar from "./StudySidebar";

const Menu = ({ enableDeponentVerbs, setEnableDeponentVerbs }) => {
  const [advancedSettingsOpen, setAdvancedSettingsOpen] = useState(false);

  return (
    <StudySidebar currentPage="parsing-verse">
      <section className="advanced-settings">
        <button
          type="button"
          className="advanced-settings-toggle"
          aria-expanded={advancedSettingsOpen}
          onClick={() => setAdvancedSettingsOpen((open) => !open)}
        >
          Advanced Settings
          <span aria-hidden="true">{advancedSettingsOpen ? "−" : "+"}</span>
        </button>
        {advancedSettingsOpen && (
          <div className="advanced-settings-panel">
            <label className="deponent-toggle">
              <input
                type="checkbox"
                checked={enableDeponentVerbs}
                onChange={(event) => setEnableDeponentVerbs(event.target.checked)}
              />
              <span>Enable Deponent Verbs</span>
            </label>
            <p>
              When disabled, middle and passive forms are accepted for deponent verbs.
            </p>
          </div>
        )}
      </section>
    </StudySidebar>
  );
};

export default Menu;
