import React from 'react';

import SnakeAction from "../actions/Snake";

export default class Snake extends React.Component
{

    constructor()
    {
        super();
		
        this.state = {
            length: SnakeAction.getLength(),
            pos: SnakeAction.getPos()
        };
    }

    componentWillMount()
    {
		// Listen an actions
        SnakeAction.on("grow", () => {
            this.setState({length: SnakeAction.getLength()});
        });

        SnakeAction.on("move", () => {
            this.setState({pos: SnakeAction.getPos()});
        });
    }

    stylePosition(pos)
    {
		// CSS transform and W. & H.
        let left = (pos.x-1) * this.props.size;
        let top = (80 - pos.y) * this.props.size;

        return { transform: "translate(" + left + "px, " + top + "px)", width: this.props.size, height: this.props.size }
    }

    render()
    {
        const parts = this.state.pos;

        return(
            <div>
                {parts.map((pos) => {
                    return <div className="snake" style={this.stylePosition(pos)}></div>;
                })}
            </div>
        );
    }
}