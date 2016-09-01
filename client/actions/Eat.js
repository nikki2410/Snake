import EventEmitter from "events";

class Eat extends EventEmitter
{
    create(snakeBody, snakeLength)
    {
		// Random
        var newPos = {
            x: Math.floor(Math.random() * 80),
            y: Math.floor(Math.random() * 80) - 1
        };

		// Prevent collision
        for (var i = 0; i < snakeLength; i++)
        {
            if (newPos.x == snakeBody[i].x && newPos.y == snakeBody[i].y)
            {
                this.create(snakeBody, snakeLength);
                return;
            }
        }

		// Update and tell
        this.pos = newPos;
        this.emit("moved");
    }

    getPos()
    {
        return this.pos;
    }
}
export default new Eat;