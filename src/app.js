import { BootScene } from './scenes/BootScene.js';
import { GameScene } from './scenes/GameScene.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 400,
    parent: 'game-container',
    scene: [BootScene, GameScene],
    backgroundColor: '#ffffff'
};

const game = new Phaser.Game(config);