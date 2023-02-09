import React, { useState } from "react";
import "./Verse.css";
import CheckWord from "./CheckWord";
import Word from "./Word";
import { useSelector } from "react-redux";
import { selectVerseSlice } from "./features/verseSlice";
import { ArticleGrid } from "./ArticleGrid";
import { PassageNumber } from "./PassageNumber";
import { checkIfArticle } from "./features/wordSlice";
import { greekArticles } from "./greek_text/greekArticles";

//make the verse an array:
const arrayIffy = (verse) => {
  let sentenceSplit = verse.split(" ");
  let sentenceWords = sentenceSplit.map((word) => {
    return {
      word: word,
    };
  });
  console.log(sentenceWords);
  return sentenceWords;
};


const Verse = () => {

  let [word] = useState("");

  const [articleGrid, setArticleGrid] = useState({
    nominative: "-clear",
    genitive: "-clear",
    dative: "-clear",
    accusative: "-clear",
    singular: "-clear",
    plural: "-clear",
    masculine: "-clear",
    feminine: "-clear",
    neuter: "-clear",
  });

  const blankGrid = {
    nominative: "-clear",
    genitive: "-clear",
    dative: "-clear",
    accusative: "-clear",
    singular: "-clear",
    plural: "-clear",
    masculine: "-clear",
    feminine: "-clear",
    neuter: "-clear",
  };

  const verse = useSelector(selectVerseSlice);

  let verseArray = arrayIffy(verse);
  for (let i=0; i < verseArray.length; i++) {
    if (checkIfArticle(verseArray[i].word)) {
      verseArray[i].partOfSpeech = "article";
      verseArray[i].parse = greekArticles[verseArray[i].word]
    } else {
      verseArray[i].partOfSpeech = "";
      verseArray[i].parse = { case: [], number: "", gender: [] };
    }
  }
  console.log(verseArray);


  return (
    <div className="verse-sentence">
      {verseArray.map((word, i) => {
        return (
          <Word key={word.word + i} word={word}  setArticleGrid={setArticleGrid} blankGrid={blankGrid}/>
        );
      })
    }
    <br></br>
    <br></br>
      <PassageNumber />
      <br></br>
      <div>
        <CheckWord word={word} setArticleGrid={setArticleGrid} blankGrid={blankGrid}>
          <ArticleGrid
            articleGrid={articleGrid}
            setArticleGrid={setArticleGrid}
          />
        </CheckWord>
      </div>
      <div>
      </div>
    </div>
  );
};

export default Verse;
