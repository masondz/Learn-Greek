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

    const box = this.add.rectangle(
      screenCenterX,
      screenCenterY,
      200,
      100,
      0x002244
    );

    box.isStroked = true;
    box.strokeColor = 0x00ffff;

    this.add.text(screenCenterX - 60, screenCenterY - 15, "Click to Start", {
      fontFamily: "Times New Roman, Courier New, serif",
      fontSize: "24px",
      fill: "rgb(255, 255, 255)",
    });

    box.setInteractive().on("pointerdown", () => {
      this.scene.stop("StartStarfinder");
      this.scene.start("Starfinder");
    });
  }
}

export default StartStarfinder;
