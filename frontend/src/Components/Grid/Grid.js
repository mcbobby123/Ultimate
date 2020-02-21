import React from 'react';
import Spot from '../Spot/Spot'
import './Grid.css';

class Grid extends React.Component{
    recieveCall = (...n) => {
        this.props.callup(...n, this.props.index)
    }

    render(){
        return (
            <div className="Grid">
                {new Array(9).fill(0).map((_,i)=>(
                    <Spot key={i}>
                        <this.props.type index={i} callup={this.recieveCall} legal={i===this.props.legal||-1===this.props.legal} board={this.props.board[i]}/>
                    </Spot>
                ))}
            </div>
        );
    }
}

export default Grid;
