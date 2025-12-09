import Phaser from "phaser";

class StartStarfinder extends Phaser.Scene {
  constructor() {
    super({ key: "StartStarfinder" });
  }

  create() {
    const screenCenterX =
      this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
    const screenWidth = this.cameras.main.width;
    const screenHeight = this.cameras.main.height;


    let fontSize = Math.ceil(screenWidth * 0.08) + "px";
    let fontScale = 0.7;

    if (screenWidth < 550) {
      fontSize = Math.ceil(screenWidth * 0.18) + "px";
      fontScale = 0.35;
    }

    this.cameras.main.setBackgroundColor("#191c24");

    const box = this.add.rectangle(
      screenCenterX,
      screenCenterY,
      screenWidth / 1.2,
      screenHeight / 4,
      0x002244
    );

    box.isStroked = true;
    box.strokeColor = 0x00ffff;

    // const instructions = `Search the stars for 5 of the target letter.\n\nAfter clicking 5 letters, find 5 of the next\ntarget letter in alphabetical order.\n\nClick to Start!`;

    this.add
      .text(
        screenCenterX,
        screenCenterY,
        "Find 5 of the Target Letter.\nClick to Start",
        {
          fontFamily: "Times New Roman, Courier New, serif",
          fontSize: fontSize,
          fill: "rgb(255, 255, 255)",
          align: "center",
        }
      )
      .setOrigin(0.5, 0.5)
      .setScale(fontScale);

    box.setInteractive().on("pointerdown", () => {
      this.scene.stop("StartStarfinder");
      this.scene.start("Starfinder");
    });
  }
}

export default StartStarfinder;
