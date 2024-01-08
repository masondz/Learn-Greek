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

//input is an array of strings
export function scoreVerse(arrayStrings, lexicon) {
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

  for (let i = 0; i < arrayStrings.length; i++) {
    for (let j = 0; j < scoreKeys.length; j++) {
      // if (lexicon[arrayStrings[i]].parse.includes(scoreKeys[j])) {
      //   score += scoreDirectory[scoreKeys[j]];
      // }
      console.log(scoreKeys[j]);
    }
  }

  return score;
}
