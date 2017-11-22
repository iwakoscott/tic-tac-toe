import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Board from './components/board';
import Message from './components/message';
import Score from './components/score';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import './index.css';

class Game extends Component {

  constructor(props){
    super(props);
    this.state = {
      stage: 0,
      you: 0,
      computer: 0,
      message: "Hi. Let's play a game! Click start!"
    };

    this.updateStage = this.updateStage.bind(this);
    this.updateMyScore = this.updateMyScore.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
  } // Game.constructor

  updateMessage(message) {
    this.setState({ message });
  } // Game.updateMessage

  updateStage(stage){
    this.setState({
      stage,
    });
  } // Game.updateStage

  updateMyScore(score){
    let you = this.state.you;
    let computer = this.state.computer;

    if (score > 0) {
      you += 1;
    } // I won. Give me the points

    else if (score < 0) {
      computer += 1;
    }

    this.setState({
      you,
      computer
    });
  } // Game.updateMyScore

  render(){
    return (
      <div className="container-fluid">

        {/* Top header */}
        <div className="row top-header">
            <Score you={this.state.you} computer={this.state.computer}/>
            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 computer-holder">
              <h6> <i className="fa fa-laptop"></i></h6>
            </div>
        </div>

        {/* Board Element */}
        <Board stage={this.state.stage}
               updateStage={this.updateStage}
               updateMyScore={this.updateMyScore}
               updateMessage={this.updateMessage}/>

        {/* Bottom header */}
        <div className="row bottom-header">
            <h6><i className="fa fa-user"></i> You</h6>
            <Message text={this.state.message} />
        </div>

      </div>
    );
  } // Game.render

} // Game

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
