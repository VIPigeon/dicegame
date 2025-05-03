// Конфигурация игры
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 400,
    parent: 'game',
    scene: {
        preload: preload,
        create: create
    },
    backgroundColor: '#ffffff'
};

// Создаём игру
const game = new Phaser.Game(config);

// Глобальные переменные
let dice = [];
let diceValues = [];
const diceCount = 5;
const diceSize = 80;
const spacing = 20;

// Предзагрузка
function preload() {
    this.load.setPath('pictures');
    for (let i = 1; i <= 6; i++) {
        this.load.image(`dice${i}`, `${i}.png`);
    }
}

// Создание сцены
function create() {
    const startX = (config.width - (diceCount * diceSize + (diceCount - 1) * spacing)) / 2;
    
    // Инициализация кубиков
    diceValues = Array(diceCount).fill().map(() => Phaser.Math.Between(1, 6));
    
    // Создание спрайтов
    for (let i = 0; i < diceCount; i++) {
        const x = startX + i * (diceSize + spacing) + diceSize / 2;
        const y = config.height / 2;
        
        dice[i] = this.add.sprite(x, y, `dice${diceValues[i]}`)
            .setDisplaySize(diceSize, diceSize)
            .setInteractive();
        
        // Обработчик клика
        dice[i].on('pointerdown', () => {
            diceValues[i] = Phaser.Math.Between(1, 6);
            dice[i].setTexture(`dice${diceValues[i]}`);
        });
    }
    
    // Кнопка броска
    document.getElementById('roll-button').addEventListener('click', () => {
        diceValues = diceValues.map(() => Phaser.Math.Between(1, 6));
        for (let i = 0; i < diceCount; i++) {
            dice[i].setTexture(`dice${diceValues[i]}`);
        }
    });
}