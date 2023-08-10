import { wordUsages } from "./greekLexiconObject";
import { greekArticles } from "./greekArticles";

function removePunctuation(str) {
  //this is from ChatpGPT
  const punctuationRegex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~˚“‘”’·ʼ]/g;
  const punctuationRemoved = str.replace(punctuationRegex, "");
  return punctuationRemoved;
}

export const parseWord = (inputWord) => {
  let chosenWord = removePunctuation(inputWord);
  let wordState = {};
  if (
    wordUsages[chosenWord] === undefined &&
    wordUsages[chosenWord.toLowerCase()] === undefined
  ) {
    if (
      wordUsages[chosenWord + "ʼ"] !== undefined ||
      wordUsages[chosenWord.toLowerCase() + "ʼ"] !== undefined
    ) {
      chosenWord = chosenWord.toLowerCase() + "ʼ";
    } else {
      wordState.word = "Word not in Lexicon";
      wordState.parse = "";
      wordState.gNum = "";
      return wordState;
    }
  } else if (
    wordUsages[chosenWord] === undefined &&
    wordUsages[chosenWord.toLowerCase()] !== undefined
  ) {
    chosenWord = chosenWord.toLowerCase();
  }

  //definite articles have their own lexicon, so we have to direct the logic to that one, make it compatible.
  if (wordUsages[chosenWord].parse.includes("definite article")) {
    wordState.word = chosenWord;
    wordState.parse =
      JSON.stringify(greekArticles[chosenWord]) + " definite article";
    wordState.gNum = wordUsages[chosenWord].GN;
    wordState.gloss = wordUsages[chosenWord].gloss;
    return wordState;
  }
  //

  wordState.word = chosenWord;
  wordState.parse = wordUsages[chosenWord].parse;
  wordState.gNum = wordUsages[chosenWord].GN;
  wordState.gloss = wordUsages[chosenWord].gloss;
  return wordState;
};

export const randomWord = (obj, attribute, arr, exclusions = []) => {
  const keys = Object.keys(obj);
  const checkKey = keys[Math.floor(Math.random() * keys.length)];
  let isEveryCharInAttribute = arr.every((characteristic) =>
    obj[checkKey][attribute].includes(characteristic)
  );

  let isThereExclusion = false;
  for (let i = 0; i < exclusions.length; i++) {
    if (obj[checkKey][attribute].includes(exclusions[i])) {
      isThereExclusion = true;
    }
  }

  if (isEveryCharInAttribute && !isThereExclusion) {
    console.log(checkKey + " " + obj[checkKey][attribute]);
    return { word: checkKey, parse: obj[checkKey][attribute] };
  } else {
    return randomWord(obj, attribute, arr, exclusions);
  }
};

export const randomVerb = (obj, attribute, arr, exclusions) => {
  console.log("trying randomVerb function");
  const arrayOfPossibles = [];
  const keys = Object.keys(obj);
  // console.log(obj[keys[0]]);
  for (let i = 0; i < keys.length; i++) {
    if (
      arr.every((characteristic) =>
        obj[keys[i]][attribute].includes(characteristic)
      )
    ) {
      arrayOfPossibles.push(keys[i]);
    }
  }

  if (arrayOfPossibles.length === 0) {
    return alert("Verb with given characteristics does not exist.");
  }

  console.log("possible verbs: " + arrayOfPossibles.length);

  let checkKey = "";

  let testingExclusions = true;

  while (testingExclusions) {
    let isThereExclusion = false;
    checkKey =
      arrayOfPossibles[Math.floor(Math.random() * arrayOfPossibles.length)];
    console.log("checking verb: " + obj[checkKey]);
    for (let i = 0; i < exclusions.length; i++) {
      if (obj[checkKey][attribute].includes(exclusions[i])) {
        isThereExclusion = true;
      }
    }

    if (!isThereExclusion) {
      console.log(checkKey + " " + obj[checkKey][attribute]);
      testingExclusions = false;
    }
  }
  console.log(
    "random verb: " + { word: checkKey, parse: obj[checkKey][attribute] }
  );
  return { word: checkKey, parse: obj[checkKey][attribute] };
};

export const randomChoicesSelection = (obj, conjunctionGloss) => {
  try {
    let initialArray = [conjunctionGloss];
    let initialGlossArray = conjunctionGloss.split("/");
    while (initialArray.length < 4) {
      const keys = Object.keys(obj);
      let randomGloss = obj[keys[Math.floor(Math.random() * keys.length)]];

      let glossArray = randomGloss.split("/");
      console.log(glossArray);
      if (
        !glossArray.some((e) => initialArray.includes(e)) &&
        !initialGlossArray.some((e) => glossArray.includes(e)) &&
        !initialArray.includes(randomGloss)
      ) {
        initialArray.push(randomGloss);
      }
    }

    //randomize the array
    let randomArray = initialArray.slice();
    for (let i = randomArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomArray[i], randomArray[j]] = [randomArray[j], randomArray[i]];
    }
    return randomArray;
  } catch (error) {
    console.log(`Problem with randomChoicesSelection: ${error}`);
  }
};
