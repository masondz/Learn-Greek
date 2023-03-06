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
    console.log(chosenWord + "ʼ")
    if (wordUsages[chosenWord + "ʼ"] !== undefined ||
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
    return wordState;
  }
  //

  wordState.word = chosenWord;
  wordState.parse = wordUsages[chosenWord].parse;
  wordState.gNum = wordUsages[chosenWord].GN;
  return wordState;
};

export const randomWord = (obj, arr) => {
  const keys = Object.keys(obj);
  const checkKey = keys[Math.floor(Math.random() * keys.length)];
  let isEveryCharInParse = arr.every(characteristic => obj[checkKey].parse.includes(characteristic))
  if(isEveryCharInParse) {
    console.log(checkKey + " " + obj[checkKey].parse);
    return {word: checkKey, parse: obj[checkKey].parse};
  } else {
    return randomWord(obj, arr)
  }
};

/*
export const parseWord = (inputWord) => {
      let state = {partOfSpeech: null, parse: {case: [null], number: null, gender: [null]}};
      let chosenWord = removePunctuation(inputWord)
      console.log(`Setting word action... ${chosenWord}`)
      console.log(wordUsages[chosenWord])
      if (wordUsages[chosenWord] === undefined && wordUsages[chosenWord.toLowerCase()] === undefined) { 
        console.log(`${chosenWord} is not in lexicon...`)
        state.partOfSpeech = "Sorry, word isn't in our lexicon "
        state.parse = { case: [null], number: null, gender: [null]};
        return;
      } else if (wordUsages[chosenWord] === undefined && wordUsages[chosenWord.toLowerCase()] !== undefined) {
        chosenWord = chosenWord.toLowerCase(); //the lexicon has some words with and without capitalized letters.
      }
        console.log(`${chosenWord}: ${wordUsages[chosenWord].parse}`)
        let splitParseOnOR = wordUsages[chosenWord].parse.split('｜');
        let splitOnComma = splitParseOnOR[1].split(', ')
        state.partOfSpeech = splitOnComma[0];
        if(state.partOfSpeech !== "Verb") {
          state.parse.case = splitOnComma[1];
          state.parse.number = splitOnComma[2];
          state.parse.gender = splitOnComma[3];
        } else if (state.partOfSpeech === "Verb") {
          if (splitOnComma[1].includes("iNfinitive")) {  //"ἀγαθοποιοῦντες":{"parse":"V-PAP-NPM｜Verb, Present, Active, Participle, Nominative, Plural, Masculine","GN":"G15"}
            state.parse.tense = splitOnComma[1];         //"ἀγαλλιῶμεν":{"parse":"V-PAS-1P｜Verb, Present, Active, Subjunctive, first, Plural","GN":"G21"},
            state.parse.voice = splitOnComma[2];         //"ἀγαπάτω":{"parse":"V-PAM-3S｜Verb, Present, Active, iMperative, third, Singular","GN":"G25"}
            state.parse.mood = splitOnComma[3];
            state.parse.case = [null];
            state.parse.person = null;
            state.parse.number = null;
            state.parse.gender = [null];
          } else {
            state.parse = {tense: splitOnComma[1], voice: splitOnComma[2], mood: splitOnComma[3], }
            if(state.parse.mood === "Participle") {
              state.parse.case = splitOnComma[4];
              state.parse.number = splitOnComma[5];
              state.parse.gender = splitOnComma[6];
            } else {
              state.parse.person = splitOnComma[4];
              state.parse.number = splitOnComma[5];
            }
          }
      }
      return state;
}*/
