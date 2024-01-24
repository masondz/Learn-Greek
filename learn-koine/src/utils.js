/*
  Takes an object of words ie:  object = {word: "word"}

    Nouns = 3
    Ajectives = 3
    Relative Pronoun = 3
    Demonstrative pronoun = 3
    reCiprocal pronoun = 3
    Personal pronoun = 3
    correlative pronoun = 3
    Adverb = 1
    Noun = 3
    particle = 1
    definite article = 3
    conjunction = guess definition out of 4
    verb = 5
    participle = 5
    infinitive = 2
    preposition = guess definition out of 4
*/

import { parseWord } from "./greek_text/parseLexicon";
// import { selectVerseReference } from "./features/verseSlice";
// import {
//   increaseCorrect,
//   increaseWrong,
//   selectScoreSlice,
// } from "./features/scoreSlice";

//input is an array of strings
export function scoreVerse(arrayStrings) {
  const parsedWordObjects = arrayStrings.map((word) => {
    return parseWord(word.word);
  });

  let score = 0;
  const scoreDirectory = {
    Adjective: 3,
    Noun: 3,
    "Relative pronoun": 3,
    "Demonstrative pronoun": 3,
    "Reciprocal pronoun": 3,
    "Personal pronoun": 3,
    "Correlative pronoun": 3,
    Adverb: 1,
    Particle: 1,
    "definite article": 3,
    Conjuction: 4,
    Verb: 5,
    Participle: 5,
    Infinitive: 2,
    Preposition: 4,
  };

  const scoreKeys = Object.keys(scoreDirectory);
  for (let i = 0; i < parsedWordObjects.length; i++) {
    let wordParse = parsedWordObjects[i].parse;
    for (let j = 0; j < scoreKeys.length; j++) {
      if (wordParse.includes(scoreKeys[j])) {
        score += scoreDirectory[scoreKeys[j]];
      }
    }
  }

  return score;
}

export function getOrSetHighScore(reference) {
  // let sliceReference = selectVerseReference();
  // console.log(typeof sliceReference);
  let verseScore = JSON.parse(localStorage.getItem(reference));
  console.log(verseScore);
  try {
    if (verseScore === null) {
      verseScore = localStorage.setItem(reference, "0");
      console.log("start new score for verse");
    }
  } catch (error) {
    console.log(error);
    return "Unable to save score";
  }
  return verseScore;
}

export function setNewHighScore(reference, newScore) {
  let oldScore = getOrSetHighScore(reference);
  if (oldScore < newScore) {
    localStorage.setItem(reference, newScore);
  }
  return;
}

//if user didn't score while viewing the verse.
export function removeHighscore(reference) {
  return localStorage.removeItem(reference);
}

export function scoringFunction(scoreObject, choice) {
  const { currentScore, correctWorth, wrongWorth } = scoreObject;
  let total = currentScore;
  if (choice === "correct") {
    total += correctWorth;
    // setNewHighScore(reference, total);
  } else {
    total -= wrongWorth;
  }
  console.log(total);
  return total;
}
