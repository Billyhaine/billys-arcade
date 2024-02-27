console.log('loaded snake game');

import { Segment } from './segment.js';

const board = document.getElementById('game-board');

let HEAD;
let FOOD;

// the coordinates of the food, stored to avoid placing things ontop of eachother
let FOOD_COORDS = {
    x: 450,
    y: 300,
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

    food.style.left = `${FOOD_COORDS.x}px`;
    food.style.top = `${FOOD_COORDS.y}px`;

    FOOD = food;

    // create a new segment, this handles creating the element and adding it to the board
    const snakeHead = new Segment({ x:150, y: 300 }, board);

    HEAD = snakeHead;
    
    board.appendChild(food);
}

const tick = () => {
    // snake movement
    HEAD.move(DIRECTION);
    
    if(HEAD.coords.x === FOOD_COORDS.x && HEAD.coords.y === FOOD_COORDS.y){
        // firstly we move the food
        let NEW_COORDS = getRandomCoords();

        while(HEAD.coords.x === NEW_COORDS.x && HEAD.coords.y === NEW_COORDS.y){
            console.log('they match')
            NEW_COORDS = getRandomCoords();
        }

        FOOD.style.left = `${NEW_COORDS.x}px`;
        FOOD.style.top = `${NEW_COORDS.y}px`;
    };
}

// around 60fps
setInterval(tick, 250)

document.addEventListener('DOMContentLoaded', initialise);

