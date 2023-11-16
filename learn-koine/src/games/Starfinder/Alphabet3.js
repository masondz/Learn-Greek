import { useEffect, useRef } from "react";
import Phaser from "phaser";
import { Link } from "react-router-dom";
import {
  generateRandomSpeed,
  makeRandomArray,
  pickRandomLetter,
} from "./starfinder_utils";
import "../../App.css";
import StartStarfinder from "./starFinderStart";
import EndStarfinder from "./starFinderEnd";

const Alphabet = () => {
  const alphabetArray = "αβγδεζηθικλμνξοπρσςτυφχψω";

  const fieldRef = useRef();

  useEffect(() => {
    const letterNames = [
      "Alpha",
      "Beta",
      "Gamma",
      "Delta",
      "Epsilon",
      "Zeta",
      "Eta",
      "Theta",
      "Iota",
      "Kappa",
      "Lambda",
      "Mu",
      "Nu",
      "Xi",
      "Omicron",
      "Pi",
      "Rho",
      "Sigma",
      "Sigma (final)",
      "Tau",
      "Upsilon",
      "Phi",
      "Chi",
      "Psi",
      "Omega",
    ];

    let fieldWidth = fieldRef.current.getBoundingClientRect().width;
    let fieldHeight = fieldRef.current.getBoundingClientRect().height;
    let letterIndex = 0;

    let targetLetter = alphabetArray[letterIndex];

    const numLetters = 17;
    const letters = [];
    const backgrounds = [];

    const numStars = 150;

    const firstArray = makeRandomArray(targetLetter, alphabetArray);

    ///////////////////////////////////////////
    ////////--PHASER SETUP--///////////////////
    ///////////////////////////////////////////

    function handleClick(target, tween, time) {
      if (target.speed === 0 || gameState.score >= 5) {
        return;
      }

      if (target.text === gameState.targetLetter) {
        target.speed = 0;
        gameState.score++;
        if (tween) {
          console.log(tween);
          tween.pause();
          target.setTint(0x00ff55);
        }
        if (gameState.score >= 5) {
          time.delayedCall(
            1000,
            () => {
              console.log("hello???");
              gameState.letterIndex++;
              if (gameState.letterIndex >= 25) {
                gameState.letterIndex = 0;
              }
              gameState.targetLetter = alphabetArray[gameState.letterIndex];
              gameState.shortArray = makeRandomArray(
                gameState.targetLetter,
                alphabetArray
              );
            },
            [],
            this
          );
          // setTimeout(() => {
          //   gameState.letterIndex++;
          //   if (gameState.letterIndex >= 25) {
          //     gameState.letterIndex = 0;
          //   }
          //   gameState.targetLetter = alphabetArray[gameState.letterIndex];
          //   gameState.shortArray = makeRandomArray(
          //     gameState.targetLetter,
          //     alphabetArray
          //   );
          // }, 1000);
        }
      } else {
        tween.pause();
        const errorColor = Phaser.Display.Color.ValueToColor(0xff0000);
        const normalColor = Phaser.Display.Color.ValueToColor(0x00ffff);
        let value = tween.getValue();
        const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(
          errorColor,
          normalColor,
          1000,
          value
        );

        const tempColor = Phaser.Display.Color.GetColor(
          colorObject.r,
          colorObject.g,
          colorObject.b
        );

        target.setTint(tempColor);
        this.time.delayedCall(
          1000,
          function () {
            tween.restart();
          },
          [],
          this
        );
        // setTimeout(() => {
        //   tween.restart();
        // }, 1000);
      }
    }

    class Starfinder extends Phaser.Scene {
      constructor() {
        super({ key: "Starfinder" });
      }

      create() {
        this.cameras.main.setBackgroundColor("#191c24");
        // this.add.sprite(20, 20, "logo");
        let dataBox = this.add.rectangle(
          gameState.width / 2,
          gameState.height / 1.39,
          gameState.width + 18,
          gameState.height / 11,
          0x121222
        );

        let bugBox = this.add.rectangle(20, 20, 20, 20, 0xff0000);

        bugBox.setInteractive().on("pointerdown", () => {
          console.log(this.data.cut);
        });

        dataBox.depth = 1;
        dataBox.isStroked = true;
        dataBox.strokeColor = 0x00ffff;

        let scoreFontSize = "24px";
        gameState.scoreDescription = `Find: ${
          letterNames[gameState.letterIndex]
        } - Found: ${gameState.score}`;
        if (config.width < 415) {
          scoreFontSize = Math.ceil(config.width / 18) + "px";
          gameState.scoreDescription = `Find: ${
            letterNames[gameState.letterIndex]
          }\nFound: ${gameState.score}`;
        }

        gameState.currentScore = this.add.text(
          config.width / 25,
          config.height / 1.085,
          gameState.scoreDescription,
          {
            fontSize: scoreFontSize,
          }
        );

        gameState.currentScore.depth = 2;

        for (let i = 0; i < numLetters; i++) {
          let fontSize = "32px";
          if (config.width < 530) {
            fontSize = "24px";
          }

          let startX = Phaser.Math.Between(0, config.width);
          let startY = Phaser.Math.Between(600, 1000);

          gameState["background" + i] = this.add.rectangle(
            startX + gameState.xOffset,
            startY + gameState.yOffset,
            40,
            40,
            "#191c24"
          );

          gameState["background" + i].setAlpha(0.01);
          gameState["background" + i].name = "background" + i;

          backgrounds.push(gameState["background" + i]);

          gameState["letter" + i] = this.add.text(
            startX,
            startY,
            pickRandomLetter(gameState.shortArray),
            {
              fontFamily: "serif",
              fontSize: fontSize,
              fill: "#fff",
            }
          );

          gameState["letter" + i].speed = generateRandomSpeed(config);
          gameState["letter" + i].direction = Math.random() < 0.5;
          gameState["letter" + i].name = "letter" + i;

          const primaryColor = Phaser.Display.Color.ValueToColor(0xffffff);
          const secondaryColor = Phaser.Display.Color.ValueToColor(0x00ffff);

          const randomDuration = Phaser.Math.Between(300, 2000);

          const letterTween = this.tweens.addCounter({
            from: 0,
            to: 100,
            duration: randomDuration,
            easing: "Linear",
            yoyo: true,
            repeat: -1,
            onUpdate: (tween) => {
              const value = tween.getValue();
              const colorObject =
                Phaser.Display.Color.Interpolate.ColorWithColor(
                  primaryColor,
                  secondaryColor,
                  100,
                  value
                );

              const color = Phaser.Display.Color.GetColor(
                colorObject.r,
                colorObject.b,
                colorObject.g
              );

              gameState["letter" + i].setTint(color);
            },
          });

          gameState["letter" + i]
            .setInteractive()
            .on("pointerdown", () =>
              handleClick(gameState["letter" + i], letterTween, this.time)
            );

          gameState["background" + i]
            .setInteractive()
            .on("pointerdown", () =>
              handleClick(gameState["letter" + i], letterTween, this.time)
            );

          letters.push(gameState["letter" + i]);
        }

        function randPos() {
          let x = Phaser.Math.Between(5, config.width);
          let y = Phaser.Math.Between(5, 550);
          return { x, y };
        }

        function randSize() {
          let x = Phaser.Math.Between(1, 2);
          let y = Phaser.Math.Between(1, 2);
          return { x, y };
        }

        for (let i = 0; i < numStars; i++) {
          let pos = randPos();
          let size = randSize();

          const paleColor = Phaser.Display.Color.ValueToColor(0xffffff);
          const blueColor = Phaser.Display.Color.ValueToColor(0x00ffff);

          const randDuration = Phaser.Math.Between(300, 1000);

          gameState["star" + i] = this.add.rectangle(
            pos.x,
            pos.y,
            size.x,
            size.y,
            0xffffff
          );

          this.tweens.addCounter({
            from: 0,
            to: 100,
            duration: randDuration,
            easing: "Linear",
            yoyo: true,
            repeat: -1,
            onUpdate: (tween) => {
              const value = tween.getValue();
              const colorObject =
                Phaser.Display.Color.Interpolate.ColorWithColor(
                  paleColor,
                  blueColor,
                  100,
                  value
                );

              const color = Phaser.Display.Color.GetColor(
                colorObject.r,
                colorObject.b,
                colorObject.g
              );

              gameState["star" + i].setFillStyle(color, 50);
            },
          });
        }
      }

      update() {
        gameState.scoreDescription = `Find: ${
          letterNames[gameState.letterIndex]
        } - Found: ${gameState.score}`;

        if (config.width < 415) {
          gameState.scoreDescription = `Find: ${
            letterNames[gameState.letterIndex]
          }\nFound: ${gameState.score}`;
        }

        gameState.currentScore.text = gameState.scoreDescription;

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
                this.time.delayedCall(
                  1000,
                  function () {
                    letter.speed = config.width < 530 ? 5 : 7;
                  },
                  [],
                  this
                );
                // setTimeout(() => {
                //   letter.speed = config.width < 530 ? 5 : 7;
                // }, 1000);
              }
            }
          } else {
            letter.text = pickRandomLetter(gameState.shortArray);
            letter.speed = generateRandomSpeed(config);
            background.x =
              (letter.x = Phaser.Math.Between(0, config.width)) +
              gameState.xOffset;
            background.y = (letter.y = 600) + gameState.yOffset;
          }

          //updating the game state
          if (gameState.score >= 5) {
            this.time.delayedCall(1000, () => {
              gameState.score = 0;
              if (gameState.letterIndex >= 2) {
                this.scene.stop("Starfinder");
                this.cameras.resetAll();
                this.scene.start("EndStarfinder");
                return;
              }
              this.tweens.each((tween) => {
                if (tween.paused) {
                  tween.restart();
                }
              });
            });
            // setTimeout(() => {
            //   gameState.score = 0;
            //   if (gameState.letterIndex >= 2) {
            //     this.scene.stop("Starfinder");
            //     this.cameras.resetAll();
            //     this.scene.start("EndStarfinder");
            //     return;
            //   }
            //   this.tweens.each((tween) => {
            //     if (tween.paused) {
            //       tween.restart();
            //     }
            //   });
            // }, 1000);
          }
        }
      }
    }

    const config = {
      type: Phaser.AUTO,

      width: fieldWidth * 0.75,
      height: fieldHeight * 0.75,
      parent: "game-field",

      scene: [StartStarfinder, Starfinder, EndStarfinder],
    };

    const gameState = {
      width: fieldWidth,
      height: fieldHeight,
      shortArray: firstArray,
      letterIndex: 0,
      targetLetter: "α",
      score: 0,
      xIncline: config.width < 530 ? 0.2 : 1,
      xOffset: 7,
      yOffset: config.width < 530 ? 15 : 18,
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, [fieldRef]);

  return (
    <>
      <div className="game-title">
        <h1>Star Finder</h1>
        <div className="letter-container" id="game-field" ref={fieldRef}></div>
        <p>
          Search the stars for <b>5</b> of the target letter. After tagging 5
          letters, find 5 of the next target letter in alphabetical order.
        </p>
      </div>
      <Link to={"/"}>home</Link>
    </>
  );
};

export default Alphabet;