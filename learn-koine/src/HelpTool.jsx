import { useEffect, useRef, useState } from "react";
import { wordUsages } from "./greek_text/greekLexiconObject";

const vocabularyHelp = (
  <div>
    <h2>Learning Vocabulary</h2>
    <p>
      First pick a category from the sidebar menu. <b>Most Common</b> are words
      that occur 500 times or more, <b>More Common</b> words are between 499 and 250
      times, and <b>Common</b> words occur between 249 and 50 times.
    </p>
    <p>
      You can also practice <b>Rare</b> words that occur less than 50 times. These are organized by book.
      The upprer right corner of the cards show how frequently the given word appears in a particular book as comapred to the rest of the New Testament.
    </p>
    <p>
      Tap the word to flip the card over. You can drag the card to the left to go to the next word, or drag to left to go back. You can also drag the card downward to take it out of the deck and put it in your "learned" deck.
      You can do the same with the arrow kes and "learnt" button. The <b>View learned</b> button switches to your "learned" deck. <b>Retry</b> puts all of your learned words back into the unlearned deck.
    </p>
  </div>
);

const parseHelp = (
  <div>
    <h2>Verse Parsing Practice</h2>
    <p>
      This page allows the you to practice parsing an entire verse. First, a
      random verse is displayed. Users can use the search menu to pick a
      particular verse, as well as click through the New Testamen one verse at a
      time.
    </p>
    <p>
      At the bottom is a toolbar that has different parts of speech. Click on
      the part of speech you wish to practice or identify. Then, select a word
      in the verse that matches the part of speech you chose. If you are wrong,
      the word will turn red, but you can still try to guess the correct part of
      speech.
    </p>
    <p>
      Once you identify the word’s correct part of speech, the word will be
      highlighted the corresponding color from the toolbar. You can then
      practice parsing the word. For example: if the word is a definite article,
      you would choose the case, number and gender. If it is a verb, you will
      first choose what kind of verb it is (regular, participle, or infinitive),
      then select the correct options that describe the verb.
    </p>
    <p>
      Verbs, participles, and infinitives are associated with the "Verb" tab.
    </p>
    <p>
      Particles and Adverbs do not have parsing characteristics, so only a brief
      translation will be provided.
    </p>
    <p>
      NOTE: the text and definitions come from{" "}
      <a style={{ color: "rgb(236, 84, 13)" }} href="/about">
        open source material
      </a>
      . They may not represent the most current scholarship. This section is
      only meant for practicing identifying the parts of speech. For true
      translation work, scholarly lexicons, dictionaries and other resources
      should be consulted.
    </p>
  </div>
);

const verbHelp = (
  <div>
    <h2>Learning Verbs</h2>
    <p>
      This section randomly picks verbs that match the criteria you choose. If
      you wish to practice present tense verbs, click “present” in the Tense
      section of the sidebar menu and then click “submit”. Dida Key will then
      randomly select a verb that is in the present tense. Then, use the grid to
      pick the correct parsing definition of the verb. Once all of the correct
      options have been selected, a new verb will automatically be displayed.
    </p>
    <p>
      If you hit “Random Verb” after submitting options, Dida Key will pick a
      new verb that matches your criteria. If you click the “Random Verb” button
      without choosing any options, then a completely random verb will be
      selected.
    </p>
  </div>
);

const tableContainer = {
  width: "100%",
  border: "2px solid darkgray",
  display: "flex",
  flexDirection: "column",
  marginBottom: 10,
};

const hFour = {
  margin: 0,
  background: "darkblue",
  color: "white",
  paddingLeft: "1em",
};

const tableStyle = {
  borderCollapse: "collapse",
  border: "solid black 1px",
  textAlign: "center",
};

const rowStyle = {
  background: "darkgray",
  color: "white",
  border: "1px black solid",
  padding: "5px",
  textShadow: "1px 1px 2px black",
};

const tdStyle = {
  border: "1px black solid",
  padding: "3px",
  background: "white",
  color: "#20242d",
};

const augmentStyle = {
  color: "#1769d2",
};

const reduplicationStyle = {
  color: "rgb(20, 195, 10, 1)",
};

const endingStyle = {
  color: "rgb(255, 20, 50)",
};

const aoristActiveIndicative = {
  name: "Aorist Active Indicative",
  firstSingular: (
    <p>
      <i style={augmentStyle}>ἔ</i>λυ<b style={endingStyle}>σα</b>
    </p>
  ),
  secondSingular: (
    <p>
      <i style={augmentStyle}>ἔ</i>λυ<b style={endingStyle}>σας</b>
    </p>
  ),
  thirdSingular: (
    <p>
      <i style={augmentStyle}>ἔ</i>λυ<b style={endingStyle}>σε(ν)</b>
    </p>
  ),
  firstPlural: (
    <p>
      <i style={augmentStyle}>ἔ</i>λυ<b style={endingStyle}>σαμεν</b>
    </p>
  ),
  secondPlural: (
    <p>
      <i style={augmentStyle}>ἔ</i>λυ<b style={endingStyle}>σατε</b>
    </p>
  ),
  thirdPlural: (
    <p>
      <i style={augmentStyle}>ἔ</i>λυ<b style={endingStyle}>σαν</b>
    </p>
  ),
};

const imperfectActiveIndicative = {
  name: "Imperfect Active Indicative",
  firstSingular: (
    <p>
      <i style={augmentStyle}>ἔ</i>λυ<b style={endingStyle}>ον</b>
    </p>
  ),
  secondSingular: (
    <p>
      <i style={augmentStyle}>ἔ</i>λυ<b style={endingStyle}>ες</b>
    </p>
  ),
  thirdSingular: (
    <p>
      <i style={augmentStyle}>ἔ</i>λυ<b style={endingStyle}>ε(ν)</b>
    </p>
  ),
  firstPlural: (
    <p>
      <i style={augmentStyle}>ἔ</i>λυ<b style={endingStyle}>ομεν</b>
    </p>
  ),
  secondPlural: (
    <p>
      <i style={augmentStyle}>ἔ</i>λυ<b style={endingStyle}>ετε</b>
    </p>
  ),
  thirdPlural: (
    <p>
      <i style={augmentStyle}>ἔ</i>λυ<b style={endingStyle}>ον</b>
    </p>
  ),
};

const presentActiveIndicative = {
  name: "Present Active Indicative",
  firstSingular: (
    <p>
      λυ<b style={endingStyle}>ω</b>
    </p>
  ),
  secondSingular: (
    <p>
      λυ<b style={endingStyle}>εις</b>
    </p>
  ),
  thirdSingular: (
    <p>
      λυ<b style={endingStyle}>ει</b>
    </p>
  ),
  firstPlural: (
    <p>
      λυ<b style={endingStyle}>ομεν</b>
    </p>
  ),
  secondPlural: (
    <p>
      λυ<b style={endingStyle}>ετε</b>
    </p>
  ),
  thirdPlural: (
    <p>
      λυ<b style={endingStyle}>ουσι(ν)</b>
    </p>
  ),
};

const presentMiddlePassiveIndicative = {
  name: "Present Middle/Passive Indicative",
  firstSingular: (
    <p>
      λυ<b style={endingStyle}>ομαι</b>
    </p>
  ),
  secondSingular: (
    <p>
      λυ<b style={endingStyle}>ῃ</b>
    </p>
  ),
  thirdSingular: (
    <p>
      λυ<b style={endingStyle}>εται</b>
    </p>
  ),
  firstPlural: (
    <p>
      λυ<b style={endingStyle}>ομεθα</b>
    </p>
  ),
  secondPlural: (
    <p>
      λυ<b style={endingStyle}>εσθε</b>
    </p>
  ),
  thirdPlural: (
    <p>
      λυ<b style={endingStyle}>ονται</b>
    </p>
  ),
};

const futureActiveIndicative = {
  name: "Future Active Indicative",
  firstSingular: (
    <p>
      λυ<b style={endingStyle}>σω</b>
    </p>
  ),
  secondSingular: (
    <p>
      λυ<b style={endingStyle}>σεις</b>
    </p>
  ),
  thirdSingular: (
    <p>
      λυ<b style={endingStyle}>σει</b>
    </p>
  ),
  firstPlural: (
    <p>
      λυ<b style={endingStyle}>σομεν</b>
    </p>
  ),
  secondPlural: (
    <p>
      λυ<b style={endingStyle}>σετε</b>
    </p>
  ),
  thirdPlural: (
    <p>
      λυ<b style={endingStyle}>σουσι(ν)</b>
    </p>
  ),
};
//ύ
const perfectActiveIndicative = {
  name: "Perfect Active Indicative",
  firstSingular: (
    <p>
      <i style={reduplicationStyle}>λέ</i>λυ<b style={endingStyle}>κα</b>
    </p>
  ),
  secondSingular: (
    <p>
      <i style={reduplicationStyle}>λέ</i>λυ<b style={endingStyle}>κας</b>
    </p>
  ),
  thirdSingular: (
    <p>
      <i style={reduplicationStyle}>λέ</i>λυ<b style={endingStyle}>κε(ν)</b>
    </p>
  ),
  firstPlural: (
    <p>
      <i style={reduplicationStyle}>λε</i>λύ<b style={endingStyle}>καμεν</b>
    </p>
  ),
  secondPlural: (
    <p>
      <i style={reduplicationStyle}>λε</i>λύ<b style={endingStyle}>κατε</b>
    </p>
  ),
  thirdPlural: (
    <p>
      <i style={reduplicationStyle}>λε</i>λύ<b style={endingStyle}>κασι(ν)</b>
    </p>
  ),
};
const pluperfectActiveIndicative = {
  name: "Pluperfect Active Indicative",
  firstSingular: (
    <p>
      <i style={augmentStyle}>ἐ</i>
      <i style={reduplicationStyle}>λέ</i>λυ<b style={endingStyle}>κειν</b>
    </p>
  ),
  secondSingular: (
    <p>
      <i style={augmentStyle}>ἐ</i>
      <i style={reduplicationStyle}>λέ</i>λυ<b style={endingStyle}>κεις</b>
    </p>
  ),
  thirdSingular: (
    <p>
      <i style={augmentStyle}>ἐ</i>
      <i style={reduplicationStyle}>λέ</i>λυ<b style={endingStyle}>κει</b>
    </p>
  ),
  firstPlural: (
    <p>
      <i style={augmentStyle}>ἐ</i>
      <i style={reduplicationStyle}>λε</i>λύ<b style={endingStyle}>κειμεν</b>
    </p>
  ),
  secondPlural: (
    <p>
      <i style={augmentStyle}>ἐ</i>
      <i style={reduplicationStyle}>λε</i>λύ<b style={endingStyle}>κειτε</b>
    </p>
  ),
  thirdPlural: (
    <p>
      <i style={augmentStyle}>ἐ</i>
      <i style={reduplicationStyle}>λε</i>λύ<b style={endingStyle}>κεισαν</b>
    </p>
  ),
};

const Paradigms = ({ tense }) => {
  return (
    <div style={tableContainer}>
      <h4 style={hFour}>{tense.name}</h4>
      <table style={tableStyle}>
        <tbody>
          <tr>
            <th style={rowStyle}>Person</th>
            <th style={rowStyle}>Singular</th>
            <th style={rowStyle}>Plural</th>
          </tr>
          <tr>
            <td style={tdStyle}>First</td>
            <td style={tdStyle}>{tense.firstSingular}</td>
            <td style={tdStyle}>{tense.firstPlural}</td> {/*firstPlural*/}
          </tr>
          <tr>
            <td style={tdStyle}>Second</td>
            <td style={tdStyle}>{tense.secondSingular}</td> {/*secondSingular*/}
            <td style={tdStyle}>{tense.secondPlural}</td> {/*secondPlural*/}
          </tr>
          <tr>
            <td style={tdStyle}>Third</td>
            <td style={tdStyle}>{tense.thirdSingular}</td> {/*thirdSingular*/}
            <td style={tdStyle}>{tense.thirdPlural}</td> {/*thirdPlural*/}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const getVerbParadigmVoice = (voice, tense, mood) => {
  const normalizedVoice = voice.toLowerCase();
  const hasMiddle = normalizedVoice.includes("middle");
  const hasPassive = normalizedVoice.includes("passive");

  if (normalizedVoice.includes("deponent")) {
    if (hasMiddle && hasPassive) return "Deponent (Middle/Passive)";
    if (hasMiddle) return "Deponent (Middle)";
    if (hasPassive) return "Deponent (Passive)";
    return "Deponent";
  }
  const middleAndPassiveShareForms =
    (tense === "present" && ["indicative", "subjunctive", "imperative"].includes(mood)) ||
    (tense === "imperfect" && mood === "indicative") ||
    (tense === "perfect" && ["indicative", "imperative"].includes(mood)) ||
    (tense === "pluperfect" && mood === "indicative");
  if (
    middleAndPassiveShareForms &&
    (normalizedVoice === "middle" || normalizedVoice === "passive")
  ) {
    return "Middle/Passive";
  }
  if (hasMiddle && hasPassive) return "Middle/Passive";
  return voice.charAt(0).toUpperCase() + voice.slice(1);
};

const normalizeGreekCharacter = (character) =>
  character.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

const renderGeneratedVerbForm = (word, paradigm, exampleForms) => {
  if (!word) return <p>—</p>;

  const characters = Array.from(word);
  const otherForms = Array.from(exampleForms.values()).map((form) => Array.from(form));
  let sharedStemLength = 0;
  while (
    otherForms.length &&
    otherForms.every(
      (form) =>
        form.length > sharedStemLength &&
        normalizeGreekCharacter(form[sharedStemLength]) ===
        normalizeGreekCharacter(characters[sharedStemLength])
    )
  ) {
    sharedStemLength += 1;
  }

  const suffixStart =
    sharedStemLength > 0 && sharedStemLength < characters.length
      ? sharedStemLength
      : Math.max(characters.length - 1, 0);
  const baseTense = paradigm.tense.replace(/^2nd /, "");
  const hasAugment =
    paradigm.mood === "indicative" &&
    ["aorist", "imperfect", "pluperfect"].includes(baseTense) &&
    ["ἐ", "ἔ", "ἠ", "ἤ", "ἦ"].includes(characters[0]);
  const augmentLength = hasAugment ? 1 : 0;
  const reduplicationStart = hasAugment ? 1 : 0;
  const first = normalizeGreekCharacter(characters[reduplicationStart] || "");
  const second = normalizeGreekCharacter(characters[reduplicationStart + 1] || "");
  const repeated = normalizeGreekCharacter(characters[reduplicationStart + 2] || "");
  const hasReduplication =
    ["perfect", "pluperfect"].includes(baseTense) &&
    /^[βγδζθκλμπρστφχ]$/.test(first) &&
    /^[αεηιουω]$/.test(second) &&
    first === repeated &&
    reduplicationStart + 2 <= suffixStart;
  const reduplicationEnd = hasReduplication ? reduplicationStart + 2 : 0;
  const segments = [];

  if (augmentLength) {
    segments.push(<i key="augment" style={augmentStyle}>{characters.slice(0, augmentLength).join("")}</i>);
  }
  if (hasReduplication) {
    segments.push(
      <i key="reduplication" style={reduplicationStyle}>
        {characters.slice(reduplicationStart, reduplicationEnd).join("")}
      </i>
    );
  }

  const rootStart = Math.max(augmentLength, reduplicationEnd);
  if (suffixStart > rootStart) {
    segments.push(<span key="root">{characters.slice(rootStart, suffixStart).join("")}</span>);
  }
  if (suffixStart < characters.length) {
    segments.push(
      <b key="ending" style={endingStyle}>
        {characters.slice(suffixStart).join("")}
      </b>
    );
  }

  return <p>{segments}</p>;
};

const additionalVerbParadigms = (() => {
  const groupedParadigms = new Map();
  const personKeys = ["first", "second", "third"];
  const numberKeys = ["singular", "plural"];

  Object.entries(wordUsages).forEach(([word, entry]) => {
    const descriptions = (entry.parse.split("｜")[1] || "").split(", ");
    if (
      descriptions[0] !== "Verb" ||
      descriptions[2]?.toLowerCase().includes("deponent") ||
      descriptions.some((description) =>
        ["Infinitive", "Participle", "Optative"].includes(description)
      )
    ) {
      return;
    }

    const [, tense, rawVoice, mood] = descriptions;
    const person = descriptions.find((value) => personKeys.includes(value));
    const number = descriptions.find((value) => numberKeys.includes(value));
    if (!tense || !rawVoice || !mood || !person || !number) return;

    const normalizedTense = tense.toLowerCase();
    const normalizedMood = mood.toLowerCase();
    const voice = getVerbParadigmVoice(rawVoice, normalizedTense, normalizedMood);
    const baseTense = normalizedTense.replace(/^2nd /, "");

    // These combinations are rejected by the Verb Practice selection rules.
    if (
      ((baseTense === "future" || baseTense === "imperfect") &&
        ["imperative", "subjunctive"].includes(normalizedMood)) ||
      (baseTense === "perfect" &&
        normalizedMood === "subjunctive" &&
        !rawVoice.toLowerCase().includes("deponent") &&
        (rawVoice.toLowerCase().includes("middle") ||
          rawVoice.toLowerCase().includes("passive")))
    ) {
      return;
    }

    // The six active indicative grids already have hand-colored stem and ending examples.
    if (
      voice === "Active" &&
      !normalizedTense.startsWith("2nd ") &&
      normalizedMood === "indicative" &&
      ["present", "future", "aorist", "imperfect", "perfect", "pluperfect"].includes(baseTense)
    ) {
      return;
    }

    const key = `${voice}|${normalizedTense}|${normalizedMood}`;
    if (!groupedParadigms.has(key)) {
      groupedParadigms.set(key, {
        voice,
        tense: normalizedTense,
        mood: normalizedMood,
        examplesByLemma: new Map(),
      });
    }

    const group = groupedParadigms.get(key);
    const lemma = entry.GN || word;
    if (!group.examplesByLemma.has(lemma)) group.examplesByLemma.set(lemma, new Map());
    const forms = group.examplesByLemma.get(lemma);
    const slot = `${person}${number.charAt(0).toUpperCase()}${number.slice(1)}`;
    if (!forms.has(slot)) forms.set(slot, word);
  });

  return Array.from(groupedParadigms.values())
    .map((group) => {
      const examples = Array.from(group.examplesByLemma.values()).sort(
        (left, right) => right.size - left.size
      )[0];
      const titleCase = (value) => value.charAt(0).toUpperCase() + value.slice(1);
      const formCell = (slot) =>
        renderGeneratedVerbForm(examples.get(slot), group, examples);

      return {
        name: `${titleCase(group.tense)} ${group.voice} ${titleCase(group.mood)}`,
        firstSingular: formCell("firstSingular"),
        firstPlural: formCell("firstPlural"),
        secondSingular: formCell("secondSingular"),
        secondPlural: formCell("secondPlural"),
        thirdSingular: formCell("thirdSingular"),
        thirdPlural: formCell("thirdPlural"),
      };
    })
    .sort((left, right) => left.name.localeCompare(right.name));
})();

const HelpTool = ({ pageName, className = "" }) => {
  const [helpShown, setHelpShown] = useState(false);
  const [tipShown, setTipShown] = useState(false);
  const helpContainerRef = useRef(null);

  useEffect(() => {
    if (!helpShown) return undefined;

    const closeOnOutsideClick = (event) => {
      if (!helpContainerRef.current?.contains(event.target)) setHelpShown(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [helpShown]);

  let chosenPage = "";

  function handleOnClick() {
    setHelpShown(!helpShown);
  }

  if (pageName === "initial") {
    chosenPage = <di>Return to the home page to select an area of study.</di>;
  } else if (pageName === "vocabulary-help") {
    chosenPage = vocabularyHelp;
  } else if (pageName === "parse-help") {
    chosenPage = parseHelp;
  } else if (pageName === "verb-help") {
    chosenPage = verbHelp;
  }

  return (
    <div ref={helpContainerRef} className={`help-container ${className}${helpShown ? " help-open" : ""}`}>
      <div style={{ position: "fixed" }}></div>
      {helpShown && (
        <div className="help-paragraph" role="dialog" aria-modal="true" aria-label="Help">
          {chosenPage}
          {pageName === "verb-help" && (
            <HelpTabs tipShown={tipShown} setTipShown={setTipShown} />
          )}
        </div>
      )}
      <button type="button" aria-expanded={helpShown} className={`help-tool-button ${className}-button`} onClick={handleOnClick}>
        ?
      </button>
    </div>
  );
};

const HelpTabs = ({ tipShown, setTipShown }) => {
  function handleClick() {
    setTipShown(!tipShown);
  }

  return (
    <div>
      <p onClick={handleClick}>Tips</p>
      {tipShown && (
        <div style={{ marginBottom: 11 }}>
          <Paradigms tense={presentActiveIndicative} />
          <Paradigms tense={presentMiddlePassiveIndicative} />
          <Paradigms tense={futureActiveIndicative} />
          <Paradigms tense={aoristActiveIndicative} />
          <Paradigms tense={imperfectActiveIndicative} />
          <Paradigms tense={perfectActiveIndicative} />
          <Paradigms tense={pluperfectActiveIndicative} />
          {additionalVerbParadigms.map((paradigm) => (
            <Paradigms key={paradigm.name} tense={paradigm} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HelpTool;
