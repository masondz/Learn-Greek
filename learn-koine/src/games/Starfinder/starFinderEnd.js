import Phaser from "phaser";

class EndStarfinder extends Phaser.Scene {
  constructor() {
    super({ key: "EndStarfinder" });
  }

  create() {
    const screenCenterX =
      this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
    const screenWidth = this.cameras.main.width;
    const screenHeight = this.cameras.main.height;

    let fontSize = Math.ceil(screenWidth * 0.04) + "px";
    let fontScale = 0.7;

    if (screenWidth < 550) {
      fontSize = Math.ceil(screenWidth * 0.06) + "px";
      fontScale = 0.35;
    }

    if (screenWidth < 550) {
      fontSize = Math.ceil(screenWidth * 0.18) + "px";
      fontScale = 0.35;
    }

    this.cameras.main.setBackgroundColor("#191c24");
    console.log(fontSize);

    const box = this.add.rectangle(
      screenCenterX,
      screenCenterY,
      screenWidth / 1.2,
      screenHeight / 4,
      0x002244
    );
    box.isStroked = true;
    box.strokeColor = 0x00ffff;

    this.add
      .text(screenCenterX, screenCenterY, "Stellar Work!\n\nTry Again?", {
        fontFamily: "Times New Roman, Courier New, serif",
        fontSize: fontSize,
        fill: "rgb(255, 255, 255)",
        align: "center",
      })
      .setOrigin(0.5, 0.5)
      .setScale(fontScale);

    box.setInteractive().on("pointerdown", () => {
      this.scene.stop("EndStarfinder");
      this.scene.start("StartStarfinder");
    });
  }
}

export default EndStarfinder;
