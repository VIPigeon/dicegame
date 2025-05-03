export class UIManager {
    constructor(scene) {
        this.scene = scene;
    }

    createControls() {
        const rollBtn = this.scene.add.dom(
            this.scene.sys.game.config.width / 2,
            50,
            'button',
            'background: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px;',
            'Бросить кубики'
        ).addListener('click').on('click', () => {
            this.scene.diceManager.rollAll();
        });
    }
}