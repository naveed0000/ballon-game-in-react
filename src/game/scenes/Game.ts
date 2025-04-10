import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    image: Phaser.GameObjects.Image;
    pumbHandle: Phaser.GameObjects.Image;
    balloon: Phaser.GameObjects.Image;
    overlay: Phaser.GameObjects.Image;
    string: Phaser.GameObjects.Image;

    pumpCount: number = 0;
    fixedBalloonY = window.innerHeight - 150;
    fixedBalloonX = window.innerWidth - 293;

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
        const x = this.scale.width / 2; // Center of the screen horizontally
        const y = this.scale.height / 2; // Center of the screen vertically

        this.balloon = this.add
            .image(x, y, "blueBallon")
            .setDisplaySize(30, 30) // Initial balloon size
            .setDepth(0.4);

        this.overlay = this.add.image(x, y, "a");
        this.overlay.setDisplaySize(20, 20);
        this.overlay.setDepth(0.5);

        // string
        this.string = this.add.image(x, y, "string"); // string starts below the balloon
        this.string.setDisplaySize(5, 40); // adjust size as needed
        this.string.setDepth(0.6); // make sure it's below the balloon

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

            // 🎈 Scale up the balloon
            // const newWidth = this.balloon.displayWidth + 10;
            // const newHeight = this.balloon.displayHeight + 10;
            // this.balloon.y = this.balloon.y - 10;
            // this.balloon.x = this.balloon.x - 2;
            // this.balloon.setDisplaySize(newWidth, newHeight);

            const newWidth = this.balloon.displayWidth + 10;
            const newHeight = this.balloon.displayHeight + 10;

            this.balloon.y = this.balloon.y - 10;
            this.balloon.x = this.balloon.x - 2;

            this.balloon.setDisplaySize(newWidth, newHeight);
            this.overlay.setDisplaySize(newWidth, newHeight); // sync overlay size if needed
            this.string.setDisplaySize(newWidth, newHeight);

            this.overlay.x = this.balloon.x; // sync overlay position
            this.overlay.y = this.balloon.y;

            this.string.x = this.balloon.x; // sync string position
            this.string.y = this.balloon.y;

            if (this.pumpCount >= 7 && this.pumpCount <= 10) {
                this.string.y =
                    this.balloon.y +
                    this.balloon.displayHeight +
                    (this.pumpCount - 10) * 10;
            }

            // if (this.pumpCount === 3) {
            //     this.string.y = this.balloon.y + 1000;
            // } else {
            //     this.string.x = this.balloon.x;
            //     this.string.y = this.balloon.y + 10;
            // }
            // 🪁 Fly away after 10 pumps
            if (this.pumpCount === 10) {
                this.pumpCount = 0;
                const distanceX = Phaser.Math.Between(-200, 200); // left or right
                const distanceY = -Phaser.Math.Between(300, 600); // always upward

                this.tweens.add({
                    targets: [this.balloon, this.overlay, this.string],
                    x: "+=" + distanceX,
                    y: "+=" + distanceY,
                    // x: this.balloon.x + distanceX,
                    // y: this.balloon.y + distanceY,
                    duration: 2000,
                    // scaleX: 0.7, // optional: shrink effect
                    // scaleY: 0.7,
                    ease: "Cubic.easeOut",
                    onComplete: () => {
                        this.balloon.setPosition(
                            this.fixedBalloonX,
                            this.fixedBalloonY
                        );
                        this.balloon.destroy(); // Optional: remove balloon after flight
                        this.overlay.destroy(); // Optional: remove balloon after flight
                        this.string.destroy(); // Optional: remove balloon after flight
                        // Optional: trigger next event or scene here
                    },
                });
            }

            this.tweens.add({
                targets: handle,
                y: window.innerHeight - 180,
                duration: 200,
                yoyo: true,
                ease: "Sine.easeInOut",
            });
        });

        handle.on("pointerup", () => {
            this.tweens.add({
                targets: handle,
                y: window.innerHeight - 225,
                duration: 100,
                ease: "quad.out",
            });
        });

        EventBus.emit("current-scene-ready", this);
    }

    changeScene() {
        this.scene.start("GameOver");
    }
}

