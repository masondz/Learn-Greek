import { useEffect, useRef } from "react";
import Phaser from "phaser";
import { Link } from "react-router-dom";
import "./App.css";

const Alphabet = () => {
  const alphabetArray = "αβγδεζηθικλμνξοπρσςτυφχψω";

  const fieldRef = useRef();

  useEffect(() => {
    let fieldWidth = fieldRef.current.getBoundingClientRect().width;
    let letterIndex = 0;

    let targetLetter = alphabetArray[letterIndex];

    const numLetters = 15;
    const letters = [];

    function generateRandomSpeed() {
      let newTime = Math.floor(Math.random() * 5 + 1);
      return newTime;
    }

    function pickRandomLetter(array) {
      const letterIndex = Math.floor(Math.random() * array.length);
      return array[letterIndex];
    }

    function handleClick() {
      this.scene.pause();
    }

    let initialArray = [targetLetter];

    for (let i = 0; i < 5; i++) {
      let randomIndex = Math.floor(Math.random() * alphabetArray.length);
      while (initialArray.includes[alphabetArray[randomIndex]]) {
        randomIndex = Math.floor(Math.random() * alphabetArray.length);
      }

      initialArray.push(alphabetArray[randomIndex]);
    }

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
      shortArray: initialArray,
      letterIndex: 0,
      targetLetter: 0,
      speed: generateRandomSpeed(),
      direction: Math.random() < 0.5,
      score: 0,
    };

    function preload() {
      this.load.image("logo", "./favicon-32x32.png");
    }

    function create() {
      this.cameras.main.setBackgroundColor("#191c24");
      this.add.sprite(20, 20, "logo");

      for (let i = 0; i < numLetters; i++) {
        gameState["letter" + i] = this.add.text(
          Phaser.Math.Between(0, config.width),
          Phaser.Math.Between(600, 1000),
          pickRandomLetter(initialArray),
          {
            fontSize: "32px",
            fill: "#fff",
          }
        );

        gameState["letter" + i].speed = generateRandomSpeed();
        gameState["letter" + i].direction = Math.random() < 0.5;
        gameState["letter" + i].setInteractive().on("pointerdown", () => {
          console.log(gameState["letter" + i]);
          if (gameState["letter" + i].text === targetLetter) {
            gameState["letter" + i].speed = 0;
            gameState.score++;
          }
        });

        letters.push(gameState["letter" + i]);
      }

      gameState.letter = this.add.text(
        Phaser.Math.Between(10, config.width - 10),
        600,
        targetLetter,
        {
          fontSize: "32px",
          fill: "#fff",
        }
      );
    }

    function update() {
      for (const letter of letters) {
        if (letter.y > -50) {
          letter.y -= letter.speed;
          if (letter.speed > 0) {
            if (letter.direction) {
              letter.x++;
            } else {
              letter.x--;
            }
          } else {
            if (gameState.score === 5) {
              setTimeout(() => {
                letter.speed = 7;
                gameState.score = 0;
              }, 1000);
            }
          }
        } else {
          letter.text = pickRandomLetter(initialArray);
          letter.speed = generateRandomSpeed();
          letter.x = Phaser.Math.Between(0, config.width);
          letter.y = 600;

          // gameState.letterIndex++;
          // if (gameState.letterIndex === 25) {
          //       gameState.letterIndex = 0;
          //     }
        }
      }

      // if (gameState.letter.y > -100) {
      //   gameState.letter.y -= gameState.speed;
      //   if (gameState.direction) {
      //     gameState.letter.x++;
      //   } else {
      //     gameState.letter.x--;
      //   }
      // } else {
      //   console.log(gameState.startPoint, gameState.endPoint);
      //   gameState.letter.destroy();

      //   gameState.letterIndex++;
      //   if (gameState.letterIndex === 25) {
      //     gameState.letterIndex = 0;
      //   }

      //   gameState.targetLetter = alphabetArray[gameState.letterIndex];
      //   gameState.speed = generateRandomSpeed();
      //   gameState.direction = Math.random() < 0.5;
      //   gameState.letter = this.add.text(
      //     Phaser.Math.Between(10, config.width - 10),
      //     600,
      //     gameState.targetLetter,
      //     {
      //       fontSize: "32px",
      //       fill: "#fff",
      //     }
      //   );
      //   gameState.letter.y = 600;
      // }
    }

    return () => {
      game.destroy(true);
    };
  }, [fieldRef]);

  return (
    <>
      <h1>Alphabet Practice:</h1>
      <div className="letter-container" id="game-field" ref={fieldRef}></div>
      <Link to={"/"}>home</Link>
    </>
  );
};

export default Alphabet;
