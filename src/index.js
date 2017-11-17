import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Board from './components/board'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import './index.css';

class Game extends Component {

  render(){
    return (
      <div className="container-fluid">

        <div className="row top-header">
            <h6> <i className="fa fa-laptop"></i></h6>
        </div>

        <Board />

        <div className="row bottom-header">
            <h6><i className="fa fa-user"></i></h6>
        </div>

      </div>
    );
  } // Game.render

} // Game

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
