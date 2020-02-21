import React from 'react';
import './App.css';
import GameBoard from './GameBoard/GameBoard';

class App extends React.Component{
  render(){
    return (
      <div className="App">
        <h1>Ultimate Tic-Tac-Toe</h1>
        <GameBoard/>
      </div>
    );
  }
}

export default App;
