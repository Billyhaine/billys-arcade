console.log('loaded snake game');

import { Segment } from './segment.js';

const board = document.getElementById('game-board');

let HEAD;
let FOOD;

// separating the default coordinates of the food so that we can reset the game
const DEFAULT_FOOD_COORDS = {
    x: 450,
    y: 300
};

// the coordinates of the food, stored to avoid placing things ontop of eachother
let FOOD_COORDS = DEFAULT_FOOD_COORDS;

let DIRECTION = 'RIGHT';

// get a random set of coordinates, used to place the food after being eaten.
const getRandomCoords = () => {
    let x = Math.floor(Math.random() * 20) * 30;
    let y = Math.floor(Math.random() * 20) * 30;

    return {
        x,
        y,
    }
}

// initialises the game board.
const initialise = () => {
    const food = document.createElement('div');
    food.className = 'food';

    food.style.left = `${DEFAULT_FOOD_COORDS.x}px`;
    food.style.top = `${DEFAULT_FOOD_COORDS.y}px`;

    FOOD = food;

    // create a new segment, this handles creating the element and adding it to the board
    const snakeHead = new Segment({ x:150, y: 300 }, board);

    HEAD = snakeHead;
    
    board.appendChild(food);
}

// resets the game back to the default state.
const resetGame = () => {
    console.log('resetting');

    // remove 
    HEAD.reset();
    FOOD.remove();

    FOOD_COORDS = DEFAULT_FOOD_COORDS;
    DIRECTION = "RIGHT";

    initialise();
}

// the event listener function for the `keydown` event.
const keyListener = (e) => {
    const key = e.key;
    
    switch (key) {
        // change direction to 'UP'
        case 'ArrowUp':
        case 'w':
            if(DIRECTION !== 'DOWN') DIRECTION = 'UP';
            return;
        // change direction to 'RIGHT'
        case 'd' || 'ArrowRight':
            if(DIRECTION !== 'LEFT') DIRECTION = 'RIGHT';
            return;
        // change direction to 'DOWN'
        case 's' || 'ArrowDown':
            if(DIRECTION !== 'UP') DIRECTION = 'DOWN';
            return;
        // change direction to 'LEFT'
        case 'a' || 'ArrowLeft':
            if(DIRECTION !== 'RIGHT') DIRECTION = 'LEFT';
            return;
        // reset the game back to the default state
        case 'Enter':
            resetGame();
            return;
    }
}

const tick = () => {
    // snake movement
    HEAD.move(DIRECTION);
    
    if(HEAD.coords.x === FOOD_COORDS.x && HEAD.coords.y === FOOD_COORDS.y){
        // firstly we move the food
        let NEW_COORDS = getRandomCoords();

        while(HEAD.isOverlapping(NEW_COORDS)){
            NEW_COORDS = getRandomCoords();
        }

        FOOD_COORDS = NEW_COORDS;

        FOOD.style.left = `${NEW_COORDS.x}px`;
        FOOD.style.top = `${NEW_COORDS.y}px`;

        // secondly we spawn a new segment on the snake.
        HEAD.addSegment(DIRECTION, board)
    };
}

// around 60fps
setInterval(tick, 175)

document.addEventListener('keydown', keyListener)

document.addEventListener('DOMContentLoaded', initialise);

