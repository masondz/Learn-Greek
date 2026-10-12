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
import { verseScoreApi } from "./api/verseScoreApi";
// import { selectVerseReference } from "./features/verseSlice";
// import {
//   increaseCorrect,
//   increaseWrong,
//   selectScoreSlice,
// } from "./features/scoreSlice";

//input is an array of strings
const GUEST_HIGH_SCORES_KEY = "didakey.guestHighScores";

function isAuthenticated() {
  try {
    return Boolean(localStorage.getItem("token"));
  } catch (error) {
    return false;
  }
}

function readGuestHighScores() {
  try {
    const storedScores = localStorage.getItem(GUEST_HIGH_SCORES_KEY);
    if (!storedScores) return {};

    const scores = JSON.parse(storedScores);
    return scores && typeof scores === "object" && !Array.isArray(scores)
      ? scores
      : {};
  } catch (error) {
    console.error("Unable to read guest high scores:", error);
    return {};
  }
}

function writeGuestHighScores(scores) {
  try {
    localStorage.setItem(GUEST_HIGH_SCORES_KEY, JSON.stringify(scores));
    return true;
  } catch (error) {
    console.error("Unable to save guest high scores:", error);
    return false;
  }
}

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

export async function getOrSetHighScore(reference) {
  if (!isAuthenticated()) {
    const score = readGuestHighScores()[reference];
    return Number.isFinite(score) ? score : 0;
  }

  try {
    const scoreData = await verseScoreApi.getScore(reference);
    if (scoreData === null) {
      return 0;
    }
    return scoreData.score;
  } catch (error) {
    console.error("Unable to fetch score:", error);
    return 0;
  }
}

export async function setNewHighScore(reference, newScore) {
  if (!isAuthenticated()) {
    const scores = readGuestHighScores();
    const oldScore = Number.isFinite(scores[reference]) ? scores[reference] : 0;
    if (oldScore < newScore) {
      scores[reference] = newScore;
      writeGuestHighScores(scores);
    }
    return;
  }

  try {
    const oldScore = await getOrSetHighScore(reference);
    if (oldScore < newScore) {
      await verseScoreApi.saveScore(reference, newScore);
    }
  } catch (error) {
    console.error("Unable to save score:", error);
  }
}

//if user didn't score while viewing the verse.
export async function removeHighscore(reference) {
  if (!isAuthenticated()) {
    const scores = readGuestHighScores();
    delete scores[reference];
    writeGuestHighScores(scores);
    return;
  }

  try {
    await verseScoreApi.deleteScore(reference);
  } catch (error) {
    console.error("Unable to delete score:", error);
  }
}

export async function scoringFunction(scoreObject, choice, reference = null) {
  const { currentScore, correctWorth, wrongWorth } = scoreObject;
  let total = currentScore;
  if (choice === "correct") {
    total += correctWorth;
    if (reference !== null) {
      await setNewHighScore(reference, total);
    }
  } else {
    total -= wrongWorth;
  }
  return total;
}
