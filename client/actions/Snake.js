import EventEmitter from "events";

const VECTOR_X = [-1, +1, 0, 0];
const VECTOR_Y = [0, 0, +1, -1];

// Directions
const LEFT = 0;
const RIGHT = 1;
const UP = 2;
const DOWN = 3;

class Snake extends EventEmitter
{

    constructor()
    {
        super();
        this.born();
    }

	// Create snake
    born()
    {
        this.length = 3;
        this.pos = [];

        this.pos[0] ={
            x: 3,
            y: 80
        };
        this.pos[1] ={
            x: 2,
            y: 80
        };
        this.pos[2] ={
            x: 1,
            y: 80
        };

        this.direction = 1;
    }

    move()
    {
        let newPos = {
            x: this.pos[0].x,
            y: this.pos[0].y
        };

        newPos.x = newPos.x + VECTOR_X[this.direction];
		// Out of a field - move to another side
        if (newPos.x > 80) newPos.x = 1;
        if (newPos.x < 1) newPos.x = 80;
		
        newPos.y = newPos.y + VECTOR_Y[this.direction];
		// Out of a field - move to another side
        if (newPos.y > 80) newPos.y = 1;
        if (newPos.y < 1) newPos.y = 80;

		// Don't bite self
        for (var i = 0; i < this.length; i++)
        {
            if (newPos.x == this.pos[i].x && newPos.y == this.pos[i].y)
            {
                alert('Snake is dead!');
                this.die();
                return;
            }
        }

		// Update body
        this.pos.pop();
        this.pos.unshift(newPos);

		// Tell about
        this.emit("move");
    }

    getPos()
    {
        return this.pos;
    }

    getDirection()
    {
        return this.direction;
    }

    changeDirection(newDirection)
    {
        let direction = this.direction;

        if( newDirection == LEFT )
            if( direction == UP || direction == DOWN )
                this.direction = LEFT;

        if( newDirection == RIGHT )
            if( direction == UP || direction == DOWN )
                this.direction = RIGHT;

        if( newDirection == UP )
            if( direction == LEFT || direction == RIGHT )
                this.direction = UP;

        if( newDirection == DOWN )
            if( direction == LEFT || direction == RIGHT )
                this.direction = DOWN;
    }

    grow()
    {
        this.length = this.length + 1;
        this.pos.unshift(this.pos[0]);

        this.emit("grow");
    }

    getLength(){
        return this.length;
    }

    die()
    {
		// So sad
        this.emit("die");
    }
}

export default new Snake;