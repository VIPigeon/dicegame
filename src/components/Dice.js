export class Dice {
    constructor(scene, x, y) {
        this.scene = scene;
        this.sprite = scene.add.sprite(x, y, 'dice1')
            .setInteractive()
            .setDisplaySize(80, 80);
        
        this.value = 1;
    }

    roll() {
        this.value = Phaser.Math.Between(1, 6);
        this.sprite.setTexture(`dice${this.value}`);
        return this.value;
    }

    setPosition(x, y) {
        this.sprite.setPosition(x, y);
    }
}