import React, { useState } from 'react';

const Word = (word) => {
    return (
        <p>
         {
          word.word ? word.word : " "
         }
        </p>
    )
}

export default Word;
