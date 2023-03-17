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
    console.log(chosenWord + "ʼ");
    if (
      wordUsages[chosenWord + "ʼ"] !== undefined ||
      wordUsages[chosenWord.toLowerCase() + "ʼ"] !== undefined
    ) {
      chosenWord = chosenWord.toLowerCase() + "ʼ";
    } else {
      console.log("cant' find lower case");
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

export const randomWord = (obj, arr) => {
  const keys = Object.keys(obj);
  const checkKey = keys[Math.floor(Math.random() * keys.length)];
  let isEveryCharInParse = arr.every((characteristic) =>
    obj[checkKey].parse.includes(characteristic)
  );
  if (isEveryCharInParse) {
    console.log(checkKey + " " + obj[checkKey].parse);
    return { word: checkKey, parse: obj[checkKey].parse };
  } else {
    return randomWord(obj, arr);
  }
};

export const randomConjuctionSelection = (conjunctionGloss) => {
  let randomArray = [conjunctionGloss];
  let randomConjunctionGloss =
    wordUsages[randomWord(wordUsages, ["Conjunction"])];
  console.log(randomConjunctionGloss);
  return randomArray;
};
