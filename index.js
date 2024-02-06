console.log('loaded snake game');

import { Segment } from './segment.js';

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

    food.style.left = FOOD_COORDS.x;
    food.style.top = FOOD_COORDS.y;

    // create a new segment, this handles creating the element and adding it to the board
    const snakeHead = new Segment({ x:150, y: 300 }, board);

    HEAD = snakeHead;
    
    board.appendChild(food);
}

const tick = () => {
    // snake movement
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

