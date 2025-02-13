console.log('loaded snake game');

import { Segment } from './segment.js';

const board = document.getElementById('game-board');

let HEAD;
let FOOD;

// separating the default coordinates of the food so that we can reset the game.
const DEFAULT_FOOD_COORDS = {
    x: 450,
    y: 300
};

// the coordinates of the food, stored to avoid placing things ontop of eachother.
let FOOD_COORDS = DEFAULT_FOOD_COORDS;

// direction the snake is heading in.
let DIRECTION = 'RIGHT';

// general game tick fn, run at an interval
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

        let NEW_SEGMENT_DIRECTION;

        // we want to put the new segment _behind_
        switch (DIRECTION) {
            case 'UP':
                NEW_SEGMENT_DIRECTION = 'DOWN';
                break;
            case 'DOWN':
                NEW_SEGMENT_DIRECTION = 'UP';
                break;
            case 'RIGHT':
                NEW_SEGMENT_DIRECTION = 'LEFT';
                break;
            case 'LEFT':
                NEW_SEGMENT_DIRECTION = 'RIGHT';
                break;
        }

        // secondly we spawn a new segment on the snake.
        HEAD.addSegment(NEW_SEGMENT_DIRECTION, board);
    };

    if(HEAD.knotted() || HEAD.outOfBounds()) {
        gameOver();
    }
}

// game tick id, set during `inititalize` to make the game run
let tickIntervalId;

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

    tickIntervalId = setInterval(tick, 175);
}

// get a random set of coordinates, used to place the food after being eaten.
const getRandomCoords = () => {
    let x = Math.floor(Math.random() * 20) * 30;
    let y = Math.floor(Math.random() * 20) * 30;

    return {
        x,
        y,
    }
}

// puts a game over container on the board 
const gameOver = () => {
    const gameOverContainer = document.createElement('div');
    gameOverContainer.className = 'game-over-container';
    gameOverContainer.id = 'game-over-container';

    const gameOverBanner = document.createElement('h3');
    gameOverBanner.className = 'arcade-banner game-over';
    gameOverBanner.textContent = 'game over';
    gameOverContainer.appendChild(gameOverBanner);

    const gameOverButton = document.createElement('button');
    gameOverButton.className = 'game-over-button';
    gameOverButton.textContent = 'Try again?';
    gameOverButton.addEventListener('click', resetGame);
    gameOverContainer.appendChild(gameOverButton);

    board.appendChild(gameOverContainer);

    clearInterval(tickIntervalId);

    HEAD.reset();
}

// resets the game back to the default state.
const resetGame = () => {
    // remove 
    HEAD.reset();
    FOOD.remove();

    clearInterval(tickIntervalId);

    document.getElementById('game-over-container')?.remove();

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



document.addEventListener('keydown', keyListener)

document.addEventListener('DOMContentLoaded', initialise);

