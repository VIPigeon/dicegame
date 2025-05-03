export class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // Загрузка атласов/аудио
        this.load.setPath('assets/images');
        
        for (let i = 1; i <= 6; i++) {
            this.load.image(`dice${i}`, `${i}.png`);
        }
    }

    create() {
        this.scene.start('GameScene');
    }
}