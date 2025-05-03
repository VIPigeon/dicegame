import { Dice } from './Dice.js';
import { DICE_COUNT, DICE_SPACING } from '../utils/constants.js';

export class DiceManager {
    constructor(scene) {
        this.scene = scene;
        this.dice = [];
    }

    createDice() {
        const startX = (this.scene.sys.game.config.width - 
                       (DICE_COUNT * 80 + (DICE_COUNT - 1) * DICE_SPACING)) / 2;

        for (let i = 0; i < DICE_COUNT; i++) {
            const x = startX + i * (80 + DICE_SPACING) + 40;
            const y = this.scene.sys.game.config.height / 2;
            
            const die = new Dice(this.scene, x, y);
            this.dice.push(die);
        }
    }

    rollAll() {
        return this.dice.map(die => die.roll());
    }
}