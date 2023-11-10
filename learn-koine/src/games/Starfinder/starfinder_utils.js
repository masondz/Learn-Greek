export function generateRandomSpeed(config) {
  let maxSpeed = 5;
  if (config.width < 530) {
    maxSpeed = 3;
  }
  let newTime = Math.floor(Math.random() * maxSpeed + 1);
  return newTime;
}

export function pickRandomLetter(array) {
  const letterIndex = Math.floor(Math.random() * array.length);
  return array[letterIndex];
}

export function makeRandomArray(targetLetter, alphabetArray) {
  let initialArray = [targetLetter];
  for (let i = 0; i < 4; i++) {
    let randomIndex = Math.floor(Math.random() * alphabetArray.length);
    while (initialArray.includes[alphabetArray[randomIndex]]) {
      console.log(initialArray);
      randomIndex = Math.floor(Math.random() * alphabetArray.length);
    }

    initialArray.push(alphabetArray[randomIndex]);
  }
  return initialArray;
}
