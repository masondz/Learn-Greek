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
    let letterIndex = 0;

    let targetLetter = alphabetArray[letterIndex];

    const numLetters = 15;
    const letters = [];

    function generateRandomSpeed() {
      let newTime = Math.floor(Math.random() * 4 + 2);
      return newTime;
    }

    function pickRandomLetter(array) {
      const letterIndex = Math.floor(Math.random() * array.length);
      return array[letterIndex];
    }

    // function createLetter() {
    //   const letterIndex = Math.floor(Math.random() * alphabetArray.length);
    //   const letter = alphabetArray[letterIndex];

    //   const letterSprite = game.scene.scenes[0].add.text(
    //     Phaser.Math.Between(10, config.width - 10),
    //     game.config.height,
    //     letter,
    //     {
    //       fontSize: "32px",
    //       fill: "#fff",
    //     }
    //   );

    //   game.scene.physics.world.enable(letterSprite);
    //   letterSprite.body.setVelocity(0, -generateRandomSpeed());
    //   letters.push(letterSprite);
    // }

    // function updateLetters() {
    //   for (const letter of letters) {
    //     if (letter.y > -100) {
    //       letter.y -= letter.speed;
    //     } else {
    //       letter.destroy();
    //       createLetter();
    //     }
    //   }
    // }

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
    };

    function preload() {
      this.load.image("logo", "./favicon-32x32.png");
    }

    function create() {
      this.add.sprite(20, 20, "logo");

      for (let i = 0; i < numLetters; i++) {
        gameState["letter" + i] = this.add.text(
          Phaser.Math.Between(10, config.width - 10),
          600,
          pickRandomLetter(initialArray),
          {
            fontSize: "32px",
            fill: "#fff",
          }
        );

        gameState["letter" + i].speed = generateRandomSpeed();
        gameState["letter" + i].direction = Math.random() < 0.5;

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
          if (letter.direction) {
            letter.x++;
          } else {
            letter.x--;
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
