import { Boot } from "./scenes/Boot";
import { Game as MainGame } from "./scenes/Game";
import { MainMenu } from "./scenes/MainMenu";
import { AUTO, Game } from "phaser";
import { Preloader } from "./scenes/Preloader";
import { GameOver } from "./scenes/GameOver";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    // width: 1436,
    // height: 808,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: "game-container",
    // backgroundColor: "#000",
    scene: [Boot, Preloader, MainMenu, MainGame, GameOver],
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
        },
    },
    
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
};

export default StartGame;

