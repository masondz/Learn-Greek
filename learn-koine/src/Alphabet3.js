import { useEffect, useRef } from "react";
import Phaser from "phaser";
import { Link } from "react-router-dom";
import "./App.css";

const Alphabet = () => {
  const alphabetArray = "αβγδεζηθικλμνξοπρσςτυφχψω";

  const fieldRef = useRef();

  // const [shortArray, setShortArray] = useState([]);

  useEffect(() => {
    let fieldWidth = fieldRef.current.getBoundingClientRect().width;
    console.log(fieldWidth);
    let letterIndex = 0;

    let targetLetter = alphabetArray[letterIndex];

    function generateRandomSpeed() {
      let newTime = Math.floor(Math.random() * 3 + 2);
      return newTime;
    }

    // const makeRandomLetter = (shorterArray) => {
    //   return shorterArray[Math.floor(Math.random() * shorterArray.length)];
    // };

    // function makeRandomEndPoint(width) {
    //   let randomPoint = width - Math.floor(Math.random() * width);
    //   let coinToss = Math.random() < 0.5;
    //   if (coinToss) {
    //     return randomPoint;
    //   } else {
    //     return Number("-" + randomPoint);
    //   }
    // }

    let initialArray = [targetLetter];

    for (let i = 0; i < 3; i++) {
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
    //749 - 996.61:  470 - 625.38
    const gameState = {
      shortArray: initialArray,
      letterIndex: 0,
      targetLetter: 0,
      speed: generateRandomSpeed(),
      direction: Math.random() < 0.5,
    };

    function preload() {
      this.load.image("logo", "./favicon-32x32.png");
    }

    function create() {
      console.log(config.width);
      this.add.sprite(20, 20, "logo");
      gameState.letter = this.add.text(
        gameState.startPoint,
        600,
        targetLetter,
        {
          fontSize: "32px",
          fill: "#fff",
        }
      );
    }

    function update() {
      if (gameState.letter.y > -100) {
        gameState.letter.y -= gameState.speed;
        if (gameState.direction) {
          gameState.letter.x++;
        } else {
          gameState.letter.x--;
        }
      } else {
        console.log(gameState.startPoint, gameState.endPoint);
        gameState.letter.destroy();

        gameState.letterIndex++;
        if (gameState.letterIndex === 25) {
          gameState.letterIndex = 0;
        }

        gameState.targetLetter = alphabetArray[gameState.letterIndex];
        gameState.speed = generateRandomSpeed();
        gameState.direction = Math.random() < 0.5;
        gameState.letter = this.add.text(
          Phaser.Math.Between(10, config.width - 10),
          600,
          gameState.targetLetter,
          {
            fontSize: "32px",
            fill: "#fff",
          }
        );
        gameState.letter.y = 500;
      }
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
