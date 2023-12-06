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
  for (let i = 0; i < 5; i++) {
    let randomIndex = Math.floor(Math.random() * alphabetArray.length);
    while (initialArray.includes[alphabetArray[randomIndex]]) {
      console.log(initialArray);
      randomIndex = Math.floor(Math.random() * alphabetArray.length);
    }

    initialArray.push(alphabetArray[randomIndex]);
  }
  return initialArray;
}

export function clickLetter(targetLetter = "!", letter, tweenArray) {
  if (targetLetter !== letter.text) {
    letter.setTint("0xff3344");
    tweenArray[1].pause();
    return false;
  } else {
    letter.setTint("0x00ff00");
    tweenArray.forEach((tween) => {
      tween.pause();
    });
    return true;
  }
}
