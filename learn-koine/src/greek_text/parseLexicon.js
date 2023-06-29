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

  console.log(isThereExclusion);

  if (isEveryCharInAttribute && !isThereExclusion) {
    console.log(checkKey + " " + obj[checkKey][attribute]);
    return { word: checkKey, parse: obj[checkKey][attribute] };
  } else {
    return randomWord(obj, attribute, arr, exclusions);
  }
};

export const randomChoicesSelection = (obj, conjunctionGloss) => {
  try {
    let initialArray = [conjunctionGloss];
    while (initialArray.length < 4) {
      const keys = Object.keys(obj);
      let randomGloss = obj[keys[Math.floor(Math.random() * keys.length)]];

      let glossArray = randomGloss.split("/");
      console.log(`glossArray: ${glossArray}`);
      if (!glossArray.some((e) => initialArray.includes(e))) {
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
