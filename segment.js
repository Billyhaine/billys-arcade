export class Segment {
    coords;
    element;
    parent;
    child;

    constructor(coords, board, parent){
        this.coords = coords;
        this.parent = parent;

        // by creating an element via the constructor the segment is always either the head or tail
        const className = parent ? 'tail' : 'head';

        // create the element for the segment
        const element = document.createElement('div');
        element.className = className;

        // set the position of the segment as per `coords`
        element.style.left = `${coords.x}px`;
        element.style.top = `${coords.y}px`;

        // append the element to the board
        board.appendChild(element);

        this.element = element;
    }

    /*
     * A simple check as to whether or not this Segment is the tail of the snake.
     */
    isTailSegment(){
        return !this.child;
    }

    /**
     * A recursive method used to add the end of the snake.
     * 
     * @param {Coords} previousCoords the segment that preceeds this one, used to determine position of new segment.
     * @param board the game board for this.
     */
    addSegment(previousCoords, board){
        if(!this.isTailSegment){
            this.child.addSegment(this.coords);
        } else {
            newTail = new Segment({  }, board)
        }
    }

    /**
     * A method used to move the snake, recursively applying to it's successive segments
     * 
     * @param direction One of 'UP', 'RIGHT', 'LEFT', 'DOWN'
     * @returns Moves this particular segment in the desired direction & triggers successive moves
     */
    move(direction){
        let newCoords

        switch (direction) {
            case 'UP':
                newCoords = {...this.coords, y: Math.max(this.coords.y - 30, 0) }

                this.coords = newCoords;
                   
                this.element.style.left = `${newCoords.x}px`;
                this.element.style.top = `${newCoords.y}px`;
                return;
            case 'RIGHT':
                newCoords = {...this.coords, x: Math.max(this.coords.x - 30, 0) }

                this.coords = newCoords;
                   
                this.element.style.left = `${newCoords.x}px`;
                this.element.style.top = `${newCoords.y}px`;
                return;
            case 'DOWN':
                newCoords = {...this.coords, y: Math.min(this.coords.y + 30, 600) }

                this.coords = newCoords;
                   
                this.element.style.left = `${newCoords.x}px`;
                this.element.style.top = `${newCoords.y}px`;
                return;
            case 'LEFT':
                newCoords = {...this.coords, x: Math.min(this.coords.x + 30, 600) }

                this.coords = newCoords;
                   
                this.element.style.left = `${newCoords.x}px`;
                this.element.style.top = `${newCoords.y}px`;
                return;
        }
    }
}