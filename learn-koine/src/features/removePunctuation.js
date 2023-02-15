function removePunctuation(str) {
    const punctuationRegex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    // const diacriticsRegex = /[\u0300-\u036f]/g;
    // const greekLettersRegex = /[α-ωΑ-Ω]/g;
  
    const punctuationRemoved = str.replace(punctuationRegex, '');
    // const diacriticsKept = punctuationRemoved.replace(diacriticsRegex, (match) => match);
    // const greekLettersKept = diacriticsKept.replace(greekLettersRegex, (match) => match);
  
    return punctuationRemoved;
  }

  const myString = "Γεια σου, πώς είσαι;"
  const noPunctString = removePunctuation(myString)
  console.log(noPunctString) // "Hello world Hows it going"