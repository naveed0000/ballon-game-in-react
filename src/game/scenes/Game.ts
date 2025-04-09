import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    image: Phaser.GameObjects.Image;
    pumbHandle: Phaser.GameObjects.Image;
    balloon: Phaser.GameObjects.Image;

    pumpCount: number = 0;
    constructor() {
        super("Game");
    }

    create() {
        // this.camera = this.cameras.main;
        // this.camera.setBackgroundColor(0x00ff00);
        // this.image = this.add.image(1024, 768, "bg");

        // this.background = this.add.image(512, 384, "background");
        // this.background.setAlpha(0.5);

        // set back ground image
        const bg = this.add.image(
            this.scale.width / 2,
            this.scale.height / 2,
            "gameBg"
        );

        const scaleX = this.scale.width / bg.width;
        const scaleY = this.scale.height / bg.height;
        const scale = Math.max(scaleX, scaleY);

        // 180 - end , 225 top
        bg.setScale(scale).setScrollFactor(0);

        this.balloon = this.add
            .image(this.scale.width / 2, this.scale.height / 2, "blueBallon")
            .setDisplaySize(100, 100) // Initial balloon size
            .setDepth(2);

        // set airIjector position
        this.image = this.add
            .image(
                window.innerWidth - 255,
                window.innerHeight - 100,
                "airIjector"
            )
            .setDisplaySize(150, 150)
            .setDepth(0);

        // set pumb machine
        this.image = this.add
            .image(
                window.innerWidth - 140,
                window.innerHeight - 90,
                "pumbMachine"
            )
            .setDisplaySize(250, 250)
            .setDepth(2);

        const handle = this.add
            .image(
                window.innerWidth - 140,
                window.innerHeight - 225,
                "pumbHandle"
            )
            .setDisplaySize(150, 150)
            .setDepth(0.4);
        handle.setInteractive({ useHandCursor: true });
        handle.on("pointerdown", () => {
            this.pumpCount += 1;
            console.log(`pump count: ${this.pumpCount}`);

            const newWidth = this.balloon.displayWidth + 10;
            const newHeight = this.balloon.displayHeight + 10;
            this.balloon.setDisplaySize(newWidth, newHeight);
            if (this.pumpCount === 10) {
                const randX = Phaser.Math.Between(-200, 200);
                const randY = -Phaser.Math.Between(300, 600);

                this.tweens.add({
                    targets: this.balloon,
                    x: this.balloon.x + randX,
                    y: this.balloon.y + randY,
                    duration: 2000,
                    ease: "Cubic.easeOut",

                    onComplete: () => {
                        this.balloon.destroy(); // Optional: remove balloon after flight
                        // Optional: trigger next event or scene here
                    },
                });
            }
        });
        handle.on("pointerup", () => {
            this.tweens.add({
                targets: handle,
                y: window.innerHeight - 185,
                duration: 250,
                yoyo: true,
                ease: "Cubic.easeOut",
            });
        });

        EventBus.emit("current-scene-ready", this);
    }

    changeScene() {
        this.scene.start("GameOver");
    }
}

