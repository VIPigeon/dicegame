// Конфигурация игры
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500, // Увеличили высоту для двух областей
    parent: 'game',
    scene: {
        preload: preload,
        create: create
    },
    backgroundColor: '#ffffff'
};

const game = new Phaser.Game(config);

// Глобальные переменные
let dice = [];
let diceValues = [];
const diceCount = 5;
const diceSize = 80;
const spacing = 20;
let startX;

// Зоны для кубиков
let topArea, bottomArea;
let draggedDie = null;

function preload() {
    this.load.setPath('pictures');
    for (let i = 1; i <= 6; i++) {
        this.load.image(`dice${i}`, `${i}.png`);
    }
}

function create() {
    // const scene = this; // Сохраняем контекст
    
    // Создаем области
    createAreas.call(this);
    
    // Инициализация кубиков
    initDice.call(this);
    
    // Кнопка броска
    document.getElementById('roll-button').addEventListener('click', () => {
        rollDice.call(this);
    });
}

function createAreas() {
    // Верхняя область (40% высоты)
    topArea = this.add.rectangle(
        config.width / 2,
        config.height * 0.2,
        config.width - 40,
        config.height * 0.4 - 20,
        0xeeeeee
    ).setStrokeStyle(2, 0xcccccc).setAlpha(0.3);
    
    // Нижняя область (60% высоты)
    bottomArea = this.add.rectangle(
        config.width / 2,
        config.height * 0.7,
        config.width - 40,
        config.height * 0.6 - 20,
        0xeeeeee
    ).setStrokeStyle(2, 0xcccccc).setAlpha(0.3);
    
    // Текст для подсказок
    this.add.text(config.width / 2, 20, "Перетащите кубики сюда", { 
        fontSize: '18px',
        color: '#666'
    }).setOrigin(0.5, 0);
    
    this.add.text(config.width / 2, config.height * 0.4 + 10, "Кубики для броска", { 
        fontSize: '18px',
        color: '#666'
    }).setOrigin(0.5, 0);
}


function initDice() {
    startX = (config.width - (diceCount * diceSize + (diceCount - 1) * spacing)) / 2;
    diceValues = Array(diceCount).fill().map(() => Phaser.Math.Between(1, 6));
    
    for (let i = 0; i < diceCount; i++) {
        const x = startX + i * (diceSize + spacing) + diceSize / 2;
        const y = config.height * 0.7;
        
        dice[i] = this.add.sprite(x, y, `dice${diceValues[i]}`)
            .setDisplaySize(diceSize, diceSize)
            .setInteractive({ draggable: true })
            .setData('inBottomArea', true)
            .setData('originalX', x); // Сохраняем исходную позицию по X
            
        this.input.setDraggable(dice[i]);
        
        dice[i].on('dragstart', () => {
            draggedDie = dice[i];
            this.children.bringToTop(dice[i]);
        });
        
        dice[i].on('drag', (pointer, dragX, dragY) => {
            dice[i].x = dragX;
            dice[i].y = dragY;
        });
        
        dice[i].on('dragend', () => {
            const die = dice[i];
            const dieBounds = die.getBounds();
            const topBounds = topArea.getBounds();
            const bottomBounds = bottomArea.getBounds();
            
            // Увеличиваем область проверки на 10px для более лояльного определения
            const expandedTopBounds = new Phaser.Geom.Rectangle(
                topBounds.x - 10,
                topBounds.y - 10,
                topBounds.width + 20,
                topBounds.height + 20
            );
            
            const expandedBottomBounds = new Phaser.Geom.Rectangle(
                bottomBounds.x - 10,
                bottomBounds.y - 10,
                bottomBounds.width + 20,
                bottomBounds.height + 20
            );
            
            const inTopArea = Phaser.Geom.Rectangle.ContainsRect(expandedTopBounds, dieBounds);
            const inBottomArea = Phaser.Geom.Rectangle.ContainsRect(expandedBottomBounds, dieBounds);
            
            if (inTopArea) {
                die.setData('inBottomArea', false);
                // Центрируем в верхней области
                die.setData('targetX', config.width / 2 - (diceCount * diceSize / 2) + i * diceSize);
            } else if (inBottomArea) {
                die.setData('inBottomArea', true);
                // Возвращаем в исходную позицию по X
                die.setData('targetX', die.getData('originalX'));
            }
            
            updateDicePosition(i);
            draggedDie = null;
        });
    }
}

function updateDicePosition(index) {
    const die = dice[index];
    const inBottomArea = die.getData('inBottomArea');
    const targetY = inBottomArea ? config.height * 0.7 : config.height * 0.2;
    const targetX = die.getData('targetX') || die.x;
    
    this.tweens.add({
        targets: die,
        x: targetX,
        y: targetY,
        duration: 300,
        ease: 'Power2'
    });
}

function rollDice() {
    for (let i = 0; i < diceCount; i++) {
        if (dice[i].getData('inBottomArea')) {
            diceValues[i] = Phaser.Math.Between(1, 6);
            dice[i].setTexture(`dice${diceValues[i]}`);
            
            // Анимация броска
            this.tweens.add({
                targets: dice[i],
                angle: 360,
                duration: 300,
                ease: 'Bounce'
            });
        }
    }
}