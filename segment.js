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
    }

    set assignCoords(newCoords){
        this.coords = newCoords;
    }

    get getCoords(){
        return this.coords;
    }

    set appendChild(child){
        this.child = child;
    }

    get getChild(){
        return this.child;
    }

    isTailSegment(){
        return !this.child;
    }

    move(direction){
        switch (DIRECTION) {
            case 'UP':
                this.assignCoords({...this.coords, y: this.coords.y + 30})
                return;
            case 'RIGHT':
                return;
            case 'DOWN':
                return;
            case 'LEFT':
                return;
        }
    }
}