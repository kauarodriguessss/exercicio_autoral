import { Cena1 } from "./scenes/cena1.js";
import { Menu } from "./scenes/menu.js";

// Configuração para inicialização do jogo
var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scale: {
        mode: Phaser.Scale.FIT,
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 900 },
        }
    },
    pixelArt: true,
    scene: [Menu, Cena1]
};
// Inicialização do jogo
const game = new Phaser.Game(config);