import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Board from './components/board'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';

class Game extends Component {

  render(){
    return (
      <Board />
    );
  } // Game.render

} // Game

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
