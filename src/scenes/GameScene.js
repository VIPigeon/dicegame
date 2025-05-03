import { DiceManager } from '../components/DiceManager.js';
import { UIManager } from '../components/UIManager.js';

export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        this.diceManager = new DiceManager(this);
        this.uiManager = new UIManager(this);
        
        this.diceManager.createDice();
        this.uiManager.createControls();
    }
}