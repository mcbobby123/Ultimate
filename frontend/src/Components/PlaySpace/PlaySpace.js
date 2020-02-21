import React from 'react';
import './PlaySpace.css';

const teamMap = ['','red','blue'];

class PlaySpace extends React.Component{

    onClick = () => {
        if(this.props.legal&&!this.props.board) this.props.callup(this.props.index);
    }

    render(){
        return (
            <div className={`PlaySpace ${(this.props.legal&&!this.props.board)?'glow':''} ${teamMap[this.props.board]}`} onClick={this.onClick}/>
        );
    }
}

export default PlaySpace;
