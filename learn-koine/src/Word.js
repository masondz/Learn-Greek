import React, { useState } from 'react';
import { greekArticles } from './greek_text/greekArticles';

const checkIfArticle = (word) => {
    if (greekArticles.includes(word.word)) {
        console.log("it's an article!")
    } else {
        console.log("it is not an article :(")
    }
}

const Word = (word) => {

    checkIfArticle(word);

    return (
        <p>
         {
          word.word ? word.word : " "
         }
        </p>
    )
}

export default Word;
