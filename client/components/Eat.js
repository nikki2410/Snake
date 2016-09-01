import React from 'react';

import EatAction from "../actions/Eat";

export default class Eat extends React.Component
{

    constructor()
    {
        super();
        
        this.state = {
            pos: EatAction.getPos()
        };
    }

    componentWillMount()
    {
		// Listen an actions
        EatAction.on("moved", () => {
            this.setState({pos: EatAction.getPos()});
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
        return(
            <div className="eat" style={this.stylePosition(this.state.pos)}></div>
        );
    }
}