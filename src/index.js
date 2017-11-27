import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Board from './components/board';
import Message from './components/message';
import Score from './components/score';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import './index.css';

function fontAwesomeIcon(args) {
  var cNames = 'game-piece fa';
  for (var i = 0; i < arguments.length; i++) {
    cNames += ' ' + arguments[i];
  } // for each argument (which are classNames)
  return '<i class=\'' + cNames + '\'></i>';
} // fontAwesomeIcon

class Game extends Component {

  constructor(props){
    super(props);
    this.state = {
      stage: 0,
      you: 0,
      computer: 0,
      message: "Hi. Let's play a game! Click start!",
      rpsWinner: '',
      rpsWinnerDecided: false,
      rpsNumTurns: 0,
      ttt: false
    };

    this.updateStage = this.updateStage.bind(this);
    this.updateScores = this.updateScores.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.resetRPSScore = this.resetRPSScore.bind(this);
    this.toggleTTTMode = this.toggleTTTMode.bind(this);
  } // Game.constructor

  toggleTTTMode(status){
    this.setState({
      ttt: status,
      you: this.state.rpsWinner === 'You' ? fontAwesomeIcon('fa-times', 'fa-lg') : fontAwesomeIcon('fa-circle-o', 'fa-lg'),
      computer: this.state.rpsWinner === 'Computer' ? fontAwesomeIcon('fa-times', 'fa-lg') : fontAwesomeIcon('fa-circle-o', 'fa-lg')
    });
  } // Game.toggleTTTMode

  resetRPSScore(){
    this.setState({
      you: 0,
      computer: 0,
      rpsNumTurns: 0
    });
  } // Game.resetRPSScore

  updateMessage(message) {
    this.setState({ message });
  } // Game.updateMessage

  updateStage(stage){
    this.setState({ stage });
  } // Game.updateStage

  updateScores(score){
    let you = this.state.you;
    let computer = this.state.computer;

    if (score > 0) {
      you += 1;
    } // I won. Give me the points

    else if (score < 0) {
      computer += 1;
    }

    let rpsWinnerDecided = you > 1 || computer > 1 ? true : false;
    let rpsWinner = '';

    if (rpsWinnerDecided) {
      rpsWinner = you > 1 ? 'You' : 'Computer';
    }

    this.setState({
      you,
      computer,
      rpsWinner,
      rpsWinnerDecided,
      rpsNumTurns: this.state.rpsNumTurns + 1
    });

  } // Game.updateScores

  render(){
    return (
      <div className="container-fluid">

        {/* Top header */}
        <div className="row top-header">
            <Score you={this.state.you} computer={this.state.computer} ttt={this.state.ttt}/>
            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 computer-holder">
              <h6> <i className="fa fa-laptop"></i></h6>
            </div>
        </div>

        {/* Board Element */}
        <Board stage={this.state.stage}
               updateStage={this.updateStage}
               updateScores={this.updateScores}
               updateMessage={this.updateMessage}
               computer={this.state.computer}
               you={this.state.you}
               resetRPSScore={this.resetRPSScore}
               rpsWinnerDecided={this.state.rpsWinnerDecided}
               rpsWinner={this.state.rpsWinner}
               rpsNumTurns={this.state.rpsNumTurns}
               toggleTTTMode={this.toggleTTTMode}
               />

        {/* Bottom header */}
        <div className="row bottom-header">
            <h6><i className="fa fa-user"></i> You</h6>
            <Message text={this.state.message}/>
        </div>

      </div>
    );
  } // Game.render

} // Game

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
