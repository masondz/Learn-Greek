import { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import { Link } from "react-router-dom";
import "./App.css";

const Alphabet = () => {
  const alphabetArray = "αβγδεζηθικλμνξοπρσςτυφχψω";

  const fieldRef = useRef();

  const [score, setScore] = useState(0);

  useEffect(() => {
    let fieldWidth = fieldRef.current.getBoundingClientRect().width;
    let letterIndex = 0;

    let targetLetter = alphabetArray[letterIndex];

    const numLetters = 3;
    const letters = [];
    const backgrounds = [];

    function generateRandomSpeed() {
      let maxSpeed = 5;
      if (config.width < 530) {
        maxSpeed = 3;
      }
      let newTime = Math.floor(Math.random() * maxSpeed + 1);
      return newTime;
    }

    function pickRandomLetter(array) {
      const letterIndex = Math.floor(Math.random() * array.length);
      return array[letterIndex];
    }

    function makeRandomArray(targetLetter) {
      let initialArray = [targetLetter];
      for (let i = 0; i < 2; i++) {
        let randomIndex = Math.floor(Math.random() * alphabetArray.length);
        while (initialArray.includes[alphabetArray[randomIndex]]) {
          console.log(initialArray);
          randomIndex = Math.floor(Math.random() * alphabetArray.length);
        }

        initialArray.push(alphabetArray[randomIndex]);
      }
      return initialArray;
    }

    const firstArray = makeRandomArray(targetLetter);

    let xOffset = 8;
    let yOffset = 18;

    ///////////////////////////////////////////
    ////////--PHASER SETUP--///////////////////
    ///////////////////////////////////////////

    const config = {
      type: Phaser.AUTO,

      width: fieldWidth * 0.75,
      height: "75vh",
      parent: "game-field",

      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };

    const game = new Phaser.Game(config);
    const gameState = {
      shortArray: firstArray,
      letterIndex: 0,
      targetLetter: "α",
      score: 0,
      xIncline: config.width < 530 ? 0.2 : 1,
    };

    function preload() {
      this.load.image("logo", "./favicon-32x32.png");
    }

    function create() {
      this.cameras.main.setBackgroundColor("#191c24");
      this.add.sprite(20, 20, "logo");

      for (let i = 0; i < numLetters; i++) {
        let fontSize = "32px";
        if (config.width < 530) {
          fontSize = "24px";
        }

        let startX = Phaser.Math.Between(0, config.width);
        let startY = Phaser.Math.Between(600, 1000);

        gameState["background" + i] = this.add.rectangle(
          startX + xOffset,
          startY + yOffset,
          40,
          40,
          0xfff
        );

        backgrounds.push(gameState["background" + i]);

        gameState["letter" + i] = this.add.text(
          startX,
          startY,
          pickRandomLetter(gameState.shortArray),
          {
            fontFamily: "Helvettica Neue, Times, Courier New, serif",
            fontSize: fontSize,
            fill: "#fff",
          }
        );

        gameState["letter" + i].speed = generateRandomSpeed();
        gameState["letter" + i].direction = Math.random() < 0.5;
        gameState["letter" + i].setInteractive().on("pointerdown", () => {
          console.log(gameState["letter" + i]);
          if (gameState["letter" + i].text === gameState.targetLetter) {
            gameState["letter" + i].speed = 0;
            gameState.score++;
            setScore(gameState.score);
            if (gameState.score >= 5) {
              gameState.letterIndex++;
              if (gameState.letterIndex >= 25) {
                gameState.letterIndex = 0;
              }
              gameState.targetLetter = alphabetArray[gameState.letterIndex];
              gameState.shortArray = makeRandomArray(gameState.targetLetter);
            }
          }
        });

        letters.push(gameState["letter" + i]);
      }

      gameState.description = this.add.text(
        40,
        75,
        `ShortArray: ${gameState.shortArray}, letterIndex: ${gameState.letterIndex}, targetLetter: ${gameState.targetLetter}, score: ${gameState.score}`,
        { fontSize: "15px", fill: "#fff" }
      );
    }

    function update() {
      gameState.description.text = `width: ${config.width}\nshortArray: ${gameState.shortArray}\nletterIndex: ${gameState.letterIndex}\ntargetLetter: ${gameState.targetLetter}`;

      //updateing the individual letters
      for (let i = 0; i < letters.length; i++) {
        let letter = letters[i];
        let background = backgrounds[i];
        if (letter.y > -50) {
          letter.y -= letter.speed;
          background.y -= letter.speed;
          if (letter.speed > 0) {
            if (letter.direction) {
              letter.x = letter.x + gameState.xIncline;
              background.x = background.x + gameState.xIncline;
            } else {
              letter.x = letter.x - gameState.xIncline;
              background.x = background.x - gameState.xIncline;
            }
          } else {
            if (gameState.score >= 5) {
              setTimeout(() => {
                letter.speed = config.width < 530 ? 5 : 7;
              }, 1000);
            }
          }
        } else {
          letter.text = pickRandomLetter(gameState.shortArray);
          letter.speed = generateRandomSpeed();
          background.x =
            (letter.x = Phaser.Math.Between(0, config.width)) + xOffset;
          background.y = (letter.y = 600) + yOffset;
        }

        //updating the game state
        if (gameState.score >= 5) {
          setTimeout(() => {
            gameState.score = 0;
            setScore(gameState.score);
          }, 1000);
        }
      }
    }

    return () => {
      game.destroy(true);
    };
  }, [fieldRef]);

  return (
    <>
      <h1>Alphabet Practice: {score}</h1>
      <div className="letter-container" id="game-field" ref={fieldRef}></div>
      <Link to={"/"}>home</Link>
    </>
  );
};

export default Alphabet;
