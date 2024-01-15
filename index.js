console.log('loaded snake game');

const board = document.getElementById('game-board');

let HEAD;

// the coordinates of the food, stored to avoid placing things ontop of eachother
let FOOD_COORDS = {
    x: '450px',
    y: '300px',
};

let DIRECTION = 'LEFT';

const getRandomCoords = () => {
    let x = Math.floor(Math.random() * 20) * 30;
    let y = Math.floor(Math.random() * 20) * 30;

    return {
        x,
        y,
    }
}

const initialise = () => {
    const food = document.createElement('div');
    food.className = 'food';

    food.style.left = foodCoords.x;
    food.style.top = foodCoords.y;

    const snakeHead = document.createElement('div');
    snakeHead.className = 'segment';

    snakeHead.style.left = '150px';
    snakeHead.style.top = '300px';

    HEAD = snakeHead;
    
    board.appendChild(snakeHead);
    board.appendChild(food);
}

const tick = () => {
    switch (DIRECTION) {
        case 'UP':
            return;
        case 'RIGHT':
            return;
        case 'DOWN':
            return;
        case 'LEFT':
            return;
    }
}

// around 60fps
setInterval(tick, 16.7)

document.addEventListener('DOMContentLoaded', initialise);

