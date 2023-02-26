import React from "react";
import { useSelector } from "react-redux";
import { selectVerseReference } from "./features/verseSlice";
import "./Verse.css";

const books = [
  "Μαθθαῖον",
  "Μᾶρκον",
  "Λουκᾶν",
  "Ἰωάννην",
  "Πράξεις Ἀποστόλων",
  "Ῥωμαίους",
  "Κορινθίους ά",
  "Κορινθίους β´",
  "Γαλάτας",
  "Ἐφεσίους",
  "Φιλιππησίους",
  "Κολοσσαεῖς",
  "Θεσσαλονικεῖς ά",
  "Θεσσαλονικεῖς β´",
  "Τιμόθεον ά",
  "Τιμόθεον β´",
  "Τίτον",
  "Φιλήμονα",
  "Ἑβραίους",
  "Ἰακώβου",
  "Πέτρου ά",
  "Πέτρου β´",
  "Ἰωάννου ά",
  "Ἰωάννου β´",
  "Ἰωάννου γ´",
  "Ἰούδα",
  "Ἀποκάλυψις Ἰωάννου",
];

const decodeReference = (ref) => {
  //book
  let bookIndex = ref.slice(0, 2) - 40;
  //chapter
  let chapterNumber = ref.slice(3, 5);
  if (chapterNumber[0] === "0") {
    chapterNumber = chapterNumber[1];
  }
  //verse
  let verseNumber = ref.slice(6, 9);
  return {
    bookIndex: bookIndex,
    chapterNumber: chapterNumber,
    verseNumber: verseNumber,
  };
};

export const PassageNumber = () => {
  const referenceRaw = useSelector(selectVerseReference);

  const reference = decodeReference(referenceRaw);

  return (
    <div className="passage">{`${books[reference.bookIndex]} ${
      reference.chapterNumber
    }:${reference.verseNumber}`}</div>
  );
};
