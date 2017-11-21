import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Board from './components/board';
import Message from './components/message';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import './index.css';

class Game extends Component {

  constructor(props){
    super(props);
    this.state = {
      stage: 0
    };

    this.updateStage = this.updateStage.bind(this);
  } // Game.constructor

  updateStage(stage){
    this.setState({
      stage,
    });
  } // Game.updateStage

  render(){
    return (
      <div className="container-fluid">

        {/* Top header */}
        <div className="row top-header">
            <h6> <i className="fa fa-laptop"></i></h6>
        </div>

        {/* Board Element */}
        <Board stage={this.state.stage} updateStage={this.updateStage}/>

        {/* Bottom header */}
        <div className="row bottom-header">
            <h6><i className="fa fa-user"></i> You</h6>
            <Message text="So. Who's X?"/>
        </div>

      </div>
    );
  } // Game.render

} // Game

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
