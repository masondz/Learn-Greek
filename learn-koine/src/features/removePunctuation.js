function removePunctuation(str) {
    const punctuationRegex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    const punctuationRemoved = str.replace(punctuationRegex, '');
    return punctuationRemoved;
  }

  const myString = "Γεια σου, πώς είσαι;"
  const noPunctString = removePunctuation(myString)
