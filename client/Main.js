import React from 'react';
import ReactDOM from 'react-dom';

import SnakeAction from "./actions/Snake";
import EatAction from "./actions/Eat";

import Snake from "./components/Snake";
import Eat from "./components/Eat";

// Directions
const LEFT = 0;
const RIGHT = 1;
const UP = 2;
const DOWN = 3;

// Key Codes
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_UP = 38;
const KEY_DOWN = 40;

// Touches
let touchStart;
let touchEnd;

const app = document.getElementById('app');

function calcCellSize()
{
	// Set a game field size and cell size
    let side;

    if( window.innerHeight > window.innerWidth )
        side = window.innerWidth;
    else
        side = window.innerHeight;

    app.style.width = side + 'px';
    app.style.height = side + 'px';

    return side/80;
}

export default class SnakeGame extends React.Component
{
    constructor()
    {
        super();

        this.state = {
            size: calcCellSize()
        };

        let snakePos = SnakeAction.getPos();
        let snakeLength = SnakeAction.getLength();
        EatAction.create(snakePos, snakeLength);
    }

    loop()
    {
        SnakeAction.move();

        let snakePos = SnakeAction.getPos();
        let snakeLength = SnakeAction.getLength();
        let eatPos = EatAction.getPos();

		// Snake eat a food - create new
        if(eatPos.x == snakePos[0].x && eatPos.y == snakePos[0].y)
        {
            SnakeAction.grow();
            EatAction.create(snakePos, snakeLength);
        }
    }

    keyDown(e)
    {
        let key = e.nativeEvent.keyCode;

        switch (key)
        {
            case KEY_LEFT:
                SnakeAction.changeDirection(LEFT);
                break;
            case KEY_RIGHT:
                SnakeAction.changeDirection(RIGHT);
                break;
            case KEY_UP:
                SnakeAction.changeDirection(UP);
                break;
            case KEY_DOWN:
                SnakeAction.changeDirection(DOWN);
                break;

            default:
                break;
        }
    }

    handleResize()
    {
        this.setState({size: calcCellSize()});
    }

    touchStartHandler(e)
    {
        e.preventDefault();
        e.stopPropagation();
        touchStart = e.touches[0];
    }

    touchEndHandler(e)
    {
		// Swape
        e.preventDefault();
        e.stopPropagation();
        touchEnd = e.changedTouches[0];

        let xAbs = Math.abs(touchStart.pageX - touchEnd.pageX);
        let yAbs = Math.abs(touchStart.pageY - touchEnd.pageY);

        if (xAbs > 20 || yAbs > 20)
        {
            if (xAbs > yAbs)
            {
                if (touchEnd.pageX < touchStart.pageX)
                    SnakeAction.changeDirection(LEFT);
                else
                    SnakeAction.changeDirection(RIGHT);
            }
            else
            {
                if (touchEnd.pageY < touchStart.pageY)
                    SnakeAction.changeDirection(UP);
                else
                    SnakeAction.changeDirection(DOWN);
            }
        }
    }

    componentDidMount()
    {
        window.addEventListener('resize', this.handleResize.bind(this));
		// New game
        SnakeAction.born();
		// Make a loop
        this.interval = setInterval(this.loop.bind(this), 150);
		// Listen an action
        SnakeAction.on("die", () => {
            clearInterval(this.interval);
        });
    }

    componentWillUnmount()
    {
        window.removeEventListener('resize', this.handleResize.bind(this));
        clearInterval(this.interval);
    }

    render()
    {
        return(
            <div className="gameField" onKeyDown={this.keyDown} onTouchStart={this.touchStartHandler.bind(this)} onTouchEnd={this.touchEndHandler.bind(this)} tabIndex="1">
                <Eat size={this.state.size} />
                <Snake size={this.state.size} />
            </div>
        );
    }
}

ReactDOM.render(<SnakeGame/>, app);