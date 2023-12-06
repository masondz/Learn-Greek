import { useEffect, useRef } from "react";
import Phaser from "phaser";
import { Link } from "react-router-dom";
import {
  makeRandomArray,
  pickRandomLetter,
  clickLetter,
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

    const numStars = 150;

    const firstArray = makeRandomArray(targetLetter, alphabetArray);

    ///////////////////////////////////////////
    ////////--PHASER SETUP--///////////////////
    ///////////////////////////////////////////

    // function handleClick(target, tween, time) {
    //   if (target.speed === 0 || gameState.score >= 5) {
    //     return;
    //   }

    //   if (target.text === gameState.targetLetter) {
    //     target.speed = 0;
    //     gameState.score++;
    //     if (tween) {
    //       console.log(tween);
    //       tween.pause();
    //       target.setTint(0x00ff55);
    //     }
    //     if (gameState.score >= 5) {
    //       time.delayedCall(
    //         1000,
    //         () => {
    //           console.log("hello???");
    //           gameState.letterIndex++;
    //           if (gameState.letterIndex >= 25) {
    //             gameState.letterIndex = 0;
    //           }
    //           gameState.targetLetter = alphabetArray[gameState.letterIndex];
    //           gameState.shortArray = makeRandomArray(
    //             gameState.targetLetter,
    //             alphabetArray
    //           );
    //         },
    //         [],
    //         this
    //       );
    //     }
    //   } else {
    //     tween.pause();

    //     const errorColor = Phaser.Display.Color.ValueToColor(0xff0000);
    //     // const normalColor = Phaser.Display.Color.ValueToColor(0x00ffff);

    //     target.setTint(errorColor);
    //     time.delayedCall(
    //       1000,
    //       () => {
    //         tween.restart();
    //       },
    //       [],
    //       this
    //     );
    //   }
    // }

    class Starfinder extends Phaser.Scene {
      constructor() {
        super({ key: "Starfinder" });
      }

      createLetter() {
        let fontSize = "32px";
        if (config.width < 530) {
          fontSize = "24px";
        }
        let startX = Phaser.Math.Between(0, config.width);
        let startY = Phaser.Math.Between(600, 1000);
        let endX = Phaser.Math.Between(0, config.width);

        let randDuration = Phaser.Math.Between(3500, 7500);
        let newLetter = this.add.text(
          startX,
          startY,
          pickRandomLetter(gameState.shortArray),
          {
            fontFamily: "serif",
            fontSize: fontSize,
            fill: "#fff",
          }
        );

        let newBackground = this.add.rectangle(
          startX + gameState.xOffset,
          startY + gameState.yOffset,
          40,
          40,
          "#191c24"
        );

        newBackground.setAlpha(0.01);

        let tween = this.tweens.add({
          targets: [newLetter, newBackground],
          x: endX,
          y: -150,
          duration: randDuration,
          onComplete: () => {
            newLetter.destroy();
            newBackground.destroy();
            this.createLetter();
          },
        });

        const primaryColor = Phaser.Display.Color.ValueToColor(0xffffff);
        const secondaryColor = Phaser.Display.Color.ValueToColor(0x00ffff);

        const randomDuration = Phaser.Math.Between(300, 2000);

        let tinting = this.tweens.addCounter({
          from: 0,
          to: 100,
          duration: randomDuration,
          easing: "Linear",
          yoyo: true,
          repeat: -1,
          onUpdate: (tween) => {
            const value = tween.getValue();
            const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(
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

            newLetter.setTint(color);
          },
        });

        newLetter.setInteractive();
        newLetter.on("pointerdown", () => {
          if (
            clickLetter(gameState.targetLetter, newLetter, [tween, tinting])
          ) {
            gameState.score++;
            if (gameState.score === 5) {
              tween.resume();
            }
          }
        });

        newBackground.setInteractive().on("pointerdown", () => {
          if (
            clickLetter(gameState.targetLetter, newLetter, [tween, tinting])
          ) {
            gameState.score++;
            if (gameState.score === 5) {
              tween.resume();
            }
          }
        });

        return newLetter;
      }

      //Create method
      create() {
        this.cameras.main.setBackgroundColor("#191c24");
        // this.add.sprite(20, 20, "logo");

        //scoreboard display
        let dataBox = this.add.rectangle(
          gameState.width / 2,
          gameState.height / 1.39,
          gameState.width + 18,
          gameState.height / 11,
          0x121222
        );

        //scoreboard and display
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

        //make letters group
        gameState.letters = this.add.group();
        gameState.backgrounds = this.add.group();
        gameState.stars = this.add.group();

        ////generate the letters. Main Game Loop

        for (let i = 0; i < numLetters; i++) {
          gameState.letters.add(this.createLetter());

          // function handleClick(target, tween, context) {
          //   console.log(target.text);
          //   if (target.speed === 0 || gameState.score >= 5) {
          //     return;
          //   }

          //   if (target.text === gameState.targetLetter) {
          //     target.speed = 0;
          //     gameState.score++;
          //     if (tween) {
          //       console.log(tween);
          //       tween.pause();
          //       target.setTint(0x00ff55);
          //     }
          //     if (gameState.score >= 5) {
          //       context.time.delayedCall(
          //         1000,
          //         () => {
          //           console.log("hello???");
          //           gameState.letterIndex++;
          //           if (gameState.letterIndex >= 25) {
          //             gameState.letterIndex = 0;
          //           }
          //           gameState.targetLetter =
          //             alphabetArray[gameState.letterIndex];
          //           gameState.shortArray = makeRandomArray(
          //             gameState.targetLetter,
          //             alphabetArray
          //           );
          //         },
          //         [],
          //         this
          //       );
          //     }
          //   }
          // }

          // this.tweens.add({
          //   targets: [currentBackground, currentLetter],
          //   paused: false,
          //   onUpdate: function () {
          //     currentLetter.y += 100;
          //     console.log("hi");
          //     console.log(handleClick); // clear the ES-lINt errors
          //   },
          // });

          //make letters interactive
          //   currentLetter.setInteractive().on("pointerdown", function () {
          //     // handleClick(gameState["letter" + i], letterTween, this.time)
          //     // fnInCreate(gameState["letter" + i], letterTween, this)
          //     gameState.score++;
          //     letterTween.pause();
          //     console.log(this);
          //     currentLetter.destroy();
          //     currentBackground.destroy();
          //   });

          //   currentBackground.setInteractive().on("pointerdown", (t) => {
          //     // handleClick(gameState["letter" + i], letterTween, this.time)
          //     // fnInCreate(gameState["letter" + i], letterTween, this)
          //     gameState.score++;
          //     letterTween.pause();
          //   });
          // }
        }
        let bugBox = this.add.rectangle(20, 20, 20, 20, 0xff0000);
        bugBox.setInteractive();
        bugBox.on("pointerdown", () => {
          this.scene.stop("Starfinder");
          this.scene.start("EndStarfinder");
        });

        function randPos() {
          let x = Phaser.Math.Between(5, config.width);
          let y = Phaser.Math.Between(5, 550);
          return { x, y };
        }

        function randSize() {
          let x = Phaser.Math.Between(1.5, 2);
          let y = Phaser.Math.Between(1.5, 2);
          return { x, y };
        }

        for (let i = 0; i < numStars; i++) {
          let pos = randPos();
          let size = randSize();

          const paleColor = Phaser.Display.Color.ValueToColor(0xffffff);
          const blueColor = Phaser.Display.Color.ValueToColor(0x00ffff);

          const randDuration = Phaser.Math.Between(300, 1000);

          const currentStar = this.add.rectangle(
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

              currentStar.setFillStyle(color, 50);
            },
          });

          gameState.stars.add(currentStar);
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

        // console.log(gameState.letters);

        // for (let i = 0; i < gameState.letters.length; i++) {
        //   let letter = gameState.letters[i];
        //   let background = gameState.backgrounds[i];
        //   if (letter.y > -50) {
        //     letter.y -= letter.speed;
        //     background.y -= letter.speed;
        //     if (letter.speed > 0) {
        //       if (letter.direction) {
        //         letter.x = letter.x + gameState.xIncline;
        //         background.x = background.x + gameState.xIncline;
        //       } else {
        //         letter.x = letter.x - gameState.xIncline;
        //         background.x = background.x - gameState.xIncline;
        //       }
        //     } else {
        //       if (gameState.score >= 5) {
        //         this.time.delayedCall(
        //           1000,
        //           function () {
        //             letter.speed = config.width < 530 ? 5 : 7;
        //           },
        //           [],
        //           this
        //         );
        //       }
        //     }
        //   } else {
        //     letter.text = pickRandomLetter(gameState.shortArray);
        //     letter.speed = generateRandomSpeed(config);
        //     background.x =
        //       (letter.x = Phaser.Math.Between(0, config.width)) +
        //       gameState.xOffset;
        //     background.y = (letter.y = 600) + gameState.yOffset;
        //   }
        // }

        //Checking if game score is 5, and if all alphabet cyceled through
        if (gameState.score >= 5) {
          console.log("hello");
          gameState.score = 0;
          this.time.delayedCall(1000, () => {
            console.log("goodbye");
            gameState.letterIndex++;
            if (gameState.letterIndex >= 24) {
              gameState.letterIndex = 0;
              this.scene.stop("Starfinder");
              this.scene.start("EndStarfinder");
              return;
            }
            // this.tweens.each((tween) => {
            //   if (tween.paused) {
            //     tween.restart();
            //   }
            // });
          });
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
