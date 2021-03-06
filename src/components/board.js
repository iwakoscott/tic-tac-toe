import React, { Component } from 'react';
import Square from './square';

function getComputerMoves(){
  let moves = [];
  for (let i = 0; i < 3; i++) {
    let val = Math.floor(Math.random() * 1000) % 3;
    moves.push(val);
  }
  return moves;
}

function youWon(you, computer) {

  if (you === computer) {
    return 0;
  }

  if (you === 2 && computer === 1) {
    return 1;
  } // you: scissors, computer: paper

  if (you === 1 && computer === 0) {
    return 1;
  } // you: paper, computer: rock

  if (you === 0 && computer === 2) {
    return 1;
  } // you: rock, computer: scissors

  return -1;

} // youWon

function fontAwesomeIcon(args) {
  var cNames = 'game-piece fa';
  for (var i = 0; i < arguments.length; i++) {
    cNames += ' ' + arguments[i];
  } // for each argument (which are classNames)
  return '<i class=\'' + cNames + '\'></i>';
} // fontAwesomeIcon

function getRPSIcon(n) {
  let icon;
  switch(n) {
    case 0:
      icon = fontAwesomeIcon('fa-hand-rock-o', 'fa-lg');
      break;
    case 1:
      icon = fontAwesomeIcon('fa-hand-paper-o', 'fa-lg');
      break;
    case 2:
      icon = fontAwesomeIcon('fa-hand-scissors-o', 'fa-lg');
      break;
    default:
      icon = fontAwesomeIcon('fa-times-circle', 'fa-lg');
      break;
  }

  return icon;
} // getRPSIcon

class Board extends Component {

  constructor(props){
    super(props);

    this.state = {
      aa: 'TIC',
      ab: 'TAC',
      ac: 'TOE',
      ba: '',
      bb: 'START',
      bc: '',
      ca: '',
      cb: '',
      cc: '',
      rpsComputerMoves: [],
    };

    this.getTagFromEvent = this.getTagFromEvent.bind(this);
    this.startRPSGame = this.startRPSGame.bind(this);
    this.rpsSelect = this.rpsSelect.bind(this);
    this.setUpTTTGame = this.setUpTTTGame.bind(this);
    this.tttSelect = this.tttSelect.bind(this);
    this.startTTTGame= this.startTTTGame.bind(this);
  } // Board.constructor

  startTTTGame(){
    var self = this;
    if (this.props.rpsWinner !== 'You') {
      /* Play computers first move */
      let bestFirstMoves = ['aa', 'ac', 'bb', 'ca', 'cc'];
      let compFirstMove = bestFirstMoves[Math.floor(Math.random() * 1000) % bestFirstMoves.length];
      let updates = {};
      updates[compFirstMove] = fontAwesomeIcon('fa-times', 'fa-lg');
      self.setState(updates);
      self.props.disableBoardButtons(false);
    }// if you didn't win the rps game let the computer make a move.

    else {
      setTimeout(() => {
        self.props.disableBoardButtons(false);
      }, 2000);
    } // you won the round of rps
  } // Board.startTTTGame

  setUpTTTGame(){
    var self = this;
    this.props.toggleTTTMode(true);
    this.setState({
      aa: '',
      ab: '',
      ac: '',
      ba: '',
      bb: '',
      bc: '',
      ca: '',
      cb: '',
      cc: '',
    });
    this.props.updateMessage("Lets play Tic-Tac-Toe!")
    this.props.updateStage(2);
  } // Board.setUpTTTGame

  tttSelect(e) {
    let targetsPosition = e.target.id;
    let updates = {};
    updates[targetsPosition] = this.props.rpsWinner === 'You' ? fontAwesomeIcon('fa-times', 'fa-lg') : fontAwesomeIcon('fa-circle-o', 'fa-lg');

    if (!this.state[targetsPosition]) {
      this.setState(updates);
    } // if there is not already a move there
  } // Board.tttSelect


  getTagFromEvent(e){
    var currentTagName = e.target.tagName;
    var thisPosition;

    if (currentTagName === 'I') {
      thisPosition = e.target.parentElement.id;
    }

    else {
      thisPosition = e.target.id;
    }

    return thisPosition;
  }

  startRPSGame(){
    // update computer row with question mark icons + remove start button
    this.props.updateMessage("Lets play Rock, Paper, Scissors to decide who gets to be 'X'. First to win twice!");
    this.props.resetRPSScore();
    this.props.updateStage(1);
    this.setState({
      aa: '',
      ab: fontAwesomeIcon('fa-question-circle-o', 'fa-lg'),
      ac: '',
      bb: '',
      ca: fontAwesomeIcon('fa-hand-rock-o', 'fa-lg'),
      cb: fontAwesomeIcon('fa-hand-paper-o', 'fa-lg'),
      cc: fontAwesomeIcon('fa-hand-scissors-o', 'fa-lg'),
      rpsComputerMoves: getComputerMoves(),
    });

  } // Board.startGame

  rpsSelect(e){
    let self = this;
    let columns = 'abc';
    // Get coordinate
    let tag = this.getTagFromEvent(e);
    let col = tag.slice(1);
    //let row = tag.slice(0, 1);
    let selected = columns.indexOf(col);

    // for updating board components state
    this.setState({ 'ab': getRPSIcon(this.state.rpsComputerMoves[this.props.rpsNumTurns % 3]) });

    let iWon = youWon(selected, this.state.rpsComputerMoves[this.props.rpsNumTurns % 3]);

    if (iWon > 0) {
      this.props.updateMessage("Crap.");
    } // I won

    else if (iWon < 0) {
      this.props.updateMessage("ah ha!");
    } // Computer Won

    else {
      this.props.updateMessage('....');
    } // tie

    this.props.updateScores(iWon);

    setTimeout(() => {
      if (self.props.rpsWinnerDecided) {
        let message = self.props.rpsWinner === 'You' ? "You get 'X'!" : "Computer gets 'X'!";
        self.props.updateMessage(message);
        setTimeout(() => {
          self.setUpTTTGame();
          self.startTTTGame();
        }, 2000);
      }

      else if (self.props.rpsNumTurns % 3 === 0) {
        self.setState({
          rpsComputerMoves: getComputerMoves()
        });
      }
    }, 500);

  } // Board.rpsSelect

  renderSquare(value, position, disabled, onClick){
    return <Square onClick={onClick} disabled={disabled} value={value} position={position}/>;
  } // Board.renderSquare

  render(){

    // TODO: Build switch statement for each stage
    var board = '';
    switch(this.props.stage) {

      // Title Page
      case 0:
        board = (
          <div>
            <div className="row">
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                {this.renderSquare(this.state.aa, 'aa', true, null)}
              </div>
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                {this.renderSquare(this.state.ab, 'ab', true, null)}
              </div>
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                {this.renderSquare(this.state.ac, 'ac', true, null)}
              </div>
            </div>

            <div className="row">
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                {this.renderSquare(this.state.ba, 'ba', true, null)}
              </div>
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                {this.renderSquare(this.state.bb, 'bb', false, this.startRPSGame)}
              </div>
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                {this.renderSquare(this.state.bc, 'bc', true, null)}
              </div>
            </div>

            <div className="row">
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                {this.renderSquare(this.state.ca, 'ca', true, null)}
              </div>
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                {this.renderSquare(this.state.cb, 'cb', true, null)}
              </div>
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                {this.renderSquare(this.state.cc, 'cc', true, null)}
              </div>
            </div>

          </div> // Wrapper
        );
        break;

      // RPS Gameboard
      case 1:
        board = (
          <div>
            <div className="row">
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                {this.renderSquare(this.state.aa, 'aa', true, null)}
              </div>
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                {this.renderSquare(this.state.ab, 'ab', true, null)}
              </div>
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                {this.renderSquare(this.state.ac, 'ac', true, null)}
              </div>
            </div>

            <div className="row">
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                {this.renderSquare(this.state.ba, 'ba', true, null)}
              </div>
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                {this.renderSquare(this.state.bb, 'bb', true, null)}
              </div>
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                {this.renderSquare(this.state.bc, 'bc', true, null)}
              </div>
            </div>

            <div className='row' id="my-selection">
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                {this.renderSquare(this.state.ca, 'ca', this.props.buttonsDisabled, this.rpsSelect)}
              </div>
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                {this.renderSquare(this.state.cb, 'cb', this.props.buttonsDisabled, this.rpsSelect)}
              </div>
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                {this.renderSquare(this.state.cc, 'cc', this.props.buttonsDisabled, this.rpsSelect)}
              </div>
            </div>

          </div> // Wrapper
        );
        break;

      // TTT Gameboard
      case 2:
        board = (
          <div>
            <div className="row">
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                {this.renderSquare(this.state.aa, 'aa', this.props.buttonsDisabled, this.tttSelect)}
              </div>
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                {this.renderSquare(this.state.ab, 'ab', this.props.buttonsDisabled, this.tttSelect)}
              </div>
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                {this.renderSquare(this.state.ac, 'ac', this.props.buttonsDisabled, this.tttSelect)}
              </div>
            </div>

            <div className="row">
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                {this.renderSquare(this.state.ba, 'ba', this.props.buttonsDisabled, this.tttSelect)}
              </div>
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                {this.renderSquare(this.state.bb, 'bb', this.props.buttonsDisabled, this.tttSelect)}
              </div>
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                {this.renderSquare(this.state.bc, 'bc', this.props.buttonsDisabled, this.tttSelect)}
              </div>
            </div>

            <div className="row" id="my-selection">
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                {this.renderSquare(this.state.ca, 'ca', this.props.buttonsDisabled, this.tttSelect)}
              </div>
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                {this.renderSquare(this.state.cb, 'cb', this.props.buttonsDisabled, this.tttSelect)}
              </div>
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                {this.renderSquare(this.state.cc, 'cc', this.props.buttonsDisabled, this.tttSelect)}
              </div>
            </div>

          </div> // Wrapper
        );
        break;
    } // switch
    return board;

  } // Board.render

} // Board

export default Board;
