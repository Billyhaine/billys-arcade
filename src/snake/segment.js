export class Segment {
    coords;
    element;
    parent;
    child;
    direction;

    constructor(coords, board, parent, direction){
        this.coords = coords;
        this.parent = parent;
        this.direction = direction;

        // by creating an element via the constructor the segment is always either the head or tail
        const className = parent ? 'tail' : 'head';

        // create the element for the segment
        const element = document.createElement('div');
        element.className = `segment ${className}`;

        // set the position of the segment as per `coords`
        element.style.left = `${coords.x}px`;
        element.style.top = `${coords.y}px`;

        // append the element to the board
        board.appendChild(element);

        this.element = element;
    }

    /*
     * Changes the direction the segment is heading in.
    */
    setDirection(dir){
        this.direction = dir;
    };

    /* 
     * Gets the direction that the segments is heading in.
    */
    getDirection(){
        return this.direction;
    }

    /**
     * Used to get the relative direction from this segment to another.
     */
    getRelativeDirection(segment){
        // segment is to the left
        if(this.coords.x < segment.coords.x) return 'RIGHT';

        // segment is to the right
        if(this.coords.x > segment.coords.x) return 'LEFT';

        // segment is above
        if(this.coords.y > segment.coords.y) return 'UP';

        // segment is below
        if(this.coords.y < segment.coords.y) return 'DOWN';
    }

    /**
     * Checks if a set of coordinates overlaps with either this segments coordinates or any of it's children.
     */
    knotted(coords){
        if(!this.parent){
            return this.child?.knotted(this.coords);
        }
        return ((coords.x === this.coords.x && coords.y === this.coords.y) || this.child?.knotted(coords))
    }

    outOfBounds(){
        return this.coords.y < 0 || this.coords.y > 600 || this.coords.x < 0 || this.coords.x > 600;
    }

    /**
     * A recursive method used to add the end of the snake.
     * 
     * @param {Direction} direction the direction we would want to add the new segment in.
     * @param board the game board for this.
     */
    addSegment(direction, board){
        // if it isn't the tail figure out the desired direction & pass it down
        if(!!this.child){
            this.child.addSegment(this.getRelativeDirection(this.child), board);
        } else {
            let TAIL_COORDS;

            switch (direction) {
                case 'UP':
                // one space below
                TAIL_COORDS = {...this.coords, y: this.coords.y - 30 }
                break;
            case 'RIGHT':
                // one space to the left
                TAIL_COORDS = {...this.coords, x: this.coords.x + 30 }
                break;
            case 'DOWN':
                // one space above
                TAIL_COORDS = {...this.coords, y: this.coords.y + 30 }
                break;
            case 'LEFT':
                // one space to the right
                TAIL_COORDS = {...this.coords, x: this.coords.x - 30 }
                break;
            }

            const TAIL = new Segment(TAIL_COORDS, board, this);

            this.child = TAIL;

            if(this.parent) this.element.className = 'segment middle';
        }
    }

    isOverlapping(targetCoords){
        // is the target coordinates actively overlapping this segment
        const isOverlappingSelf = this.coords.x === targetCoords.x && this.coords.y === targetCoords.y

        // if this is the tail simply return whether it's overlapping itself
        if(!this.child){
            return isOverlappingSelf;
        }

        // if we're not the tail return is it overlapping this segment or it's child
        return isOverlappingSelf || this.child.isOverlapping(targetCoords);
    }

    /**
     * A method used to move the snake, recursively applying to it's successive segments
     * 
     * @param direction One of 'UP', 'RIGHT', 'LEFT', 'DOWN', NOTE: if this isnt the head this won't be passed.
     * @returns Moves this particular segment in the desired direction & triggers successive moves
     */
    move(){
        let newCoords;
        let direction = this.direction;

        if(this.parent){
            direction = this.getRelativeDirection(this.parent);
        }

        switch (direction) {
            case 'UP':
                newCoords = {...this.coords, y: this.coords.y - 30 }
 
                this.element.style.left = `${newCoords.x}px`;
                this.element.style.top = `${newCoords.y}px`;

                break;
            case 'DOWN':
                newCoords = {...this.coords, y: this.coords.y + 30 }

                this.element.style.left = `${newCoords.x}px`;
                this.element.style.top = `${newCoords.y}px`;
                break;
            case 'LEFT':
                newCoords = {...this.coords, x: this.coords.x - 30 }
                    
                this.element.style.left = `${newCoords.x}px`;
                this.element.style.top = `${newCoords.y}px`;
                break;
            case 'RIGHT':
                newCoords = {...this.coords, x: this.coords.x + 30 }
                   
                this.element.style.left = `${newCoords.x}px`;
                this.element.style.top = `${newCoords.y}px`;
                break;
        }

        if(!!this.child){
            this.child.move();
        }

        this.coords = newCoords;
    }

    /**
     * Deletes all childen & then itself
     */
    reset(){
        if(this.child){
            this.child.reset();
            this.child = undefined;
        }

        this.element.remove();
    }

}