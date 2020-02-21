import React from 'react';
import './GameBoard.css';
import Grid from '../Grid/Grid';
import SubBoard from '../SubBoard/SubBoard';
import socketIOClient from 'socket.io-client';

const playerNames = ['a Spectator','Red','Blue'];

class GameBoard extends React.Component{

    state={
        size:Math.min(window.innerWidth*.8,window.innerHeight*.8,750),
        board:new Array(9).fill(0).map(()=>new Array(9).fill(0)),
        turn:1,
        sector:-1
    };
    socket = socketIOClient(window.location.href);

    componentDidMount(){
        window.addEventListener('resize',()=>this.setState({size:Math.min(window.innerWidth*.8,window.innerHeight*.8,750)}))
        this.socket.on('update',state=>{
            this.setState(state)
        });
    }

    receivePlay = (i,b) => {
        if(this.state.turn===this.state.me) {
            let board = this.state.board;
            board[b][i] = this.state.me;
            this.setState({board})
            this.socket.emit('play',[b,i]);
        }
    }

    render(){
        return (
            <React.Fragment>
                <div className="GameBoard" style={{width:`${this.state.size-2}px`,height:`${this.state.size}px`}}>
                    <Grid type={SubBoard} legal={this.state.sector} callup={this.receivePlay} board={this.state.board}/>
                </div>
                <div className="GameBoardSubtitle">
                    <span>{"You are " + playerNames[this.state.me]}</span>
                    <span>{this.state.turn===this.state.me?"It's your turn!":"Waiting for opponent to play."}</span>
                </div>
            </React.Fragment>
        );
    }
} export default GameBoard;
