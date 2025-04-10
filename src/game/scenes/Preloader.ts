import { Scene } from "phaser";

export class Preloader extends Scene {
    constructor() {
        super("Preloader");
    }

    init() {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, "background");

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on("progress", (progress: number) => {
            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + 460 * progress;
        });
    }

    preload() {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath("assets");

        this.load.image("logo", "logo.png");
        this.load.image("star", "star.png");

        // gmae assets
        this.load.image("gameBg", "gameBg.png");
        this.load.image("airIjector", "airIjector.png");
        this.load.image("pumbHandle", "pumbHandle.png");
        this.load.image("pumbMachine", "pumbMachine.png");

        // ballon assets
        this.load.image("blueBallon", "blueBallon.png");
        this.load.image("blueLightballon", "blueLightballon.png");
        this.load.image("greenBallon", "greenBallon.png");
        this.load.image("orangeLightBallon", "orangeLightBallon.png");
        this.load.image("orangeWhiteBallon", "orangeWhiteBallon.png");
        this.load.image("pinkBallon", "pinkBallon.png");
        this.load.image("pinkHeartBallon", "pinkHeartBallon.png");
        this.load.image("pinkWhiteBallon", "pinkWhiteBallon.png");
        this.load.image("redBallon", "redBallon.png");
        this.load.image("yellowBallon", "yellowBallon.png");

        this.load.image('string', "string.png");
        // Alphebet
        this.load.image("a", "a.png");
        this.load.image("b", "b.png");
        this.load.image("c", "c.png");
        this.load.image("d", "d.png");
        this.load.image("e", "e.png");
        this.load.image("f", "f.png");
        this.load.image("g", "g.png");
        this.load.image("h", "h.png");
        this.load.image("i", "i.png");
        this.load.image("j", "j.png");
        this.load.image("k", "k.png");
        this.load.image("l", "l.png");
        this.load.image("m", "m.png");
        this.load.image("n", "n.png");
        this.load.image("o", "o.png");
        this.load.image("p", "p.png");
        this.load.image("q", "q.png");
        this.load.image("r", "r.png");
        this.load.image("s", "s.png");
        this.load.image("t", "t.png");
        this.load.image("u", "u.png");
        this.load.image("v", "v.png");
        this.load.image("w", "w.png");
        this.load.image("x", "x.png");
        this.load.image("y", "y.png");
        this.load.image("z", "z.png");

        // animation
        this.load.spritesheet("press-pumb-handle", "pump-handle.png", {
            frameWidth: 64,
            frameHeight: 64,
        });

        // Define animation in create
    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start("Game");
    }
}

