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
      rpsComputer: []
    };

    this.getTagFromEvent = this.getTagFromEvent.bind(this);
    this.startRPSGame = this.startRPSGame.bind(this);
    this.rpsSelect = this.rpsSelect.bind(this);
  } // Board.constructor

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

    this.props.updateMessage("Lets play Rock, Paper, Scissors to decide who gets to be 'X'. Best two out of three.");

    this.props.updateStage(1);
    this.setState({
      aa: fontAwesomeIcon('fa-question-circle-o', 'fa-lg'),
      ab: fontAwesomeIcon('fa-question-circle-o', 'fa-lg'),
      ac: fontAwesomeIcon('fa-question-circle-o', 'fa-lg'),
      bb: '',
      ca: fontAwesomeIcon('fa-hand-rock-o', 'fa-lg'),
      cb: fontAwesomeIcon('fa-hand-paper-o', 'fa-lg'),
      cc: fontAwesomeIcon('fa-hand-scissors-o', 'fa-lg'),
      rpsComputer: getComputerMoves()
    });

  } // Board.startGame

  rpsSelect(e){
    let tag = this.getTagFromEvent(e);

    let col = tag.slice(1);
    // if needed
    let row = tag.slice(0, 1);
    let updates = {};
    let i = 'abc'.indexOf(col);
    updates['a' + col] = getRPSIcon(this.state.rpsComputer[i]);
    this.setState(updates);
    let iWon = youWon(i, this.state.rpsComputer[i]);

    if (iWon > 0) {
      this.props.updateMessage("Crap.");
    } // I won

    else if (iWon < 0) {
      this.props.updateMessage("ah ha!");
    } // Computer Won
    this.props.updateMyScore(iWon);
  } // Board.rpsSelect

  renderSquare(value, position, disabled, onClick){
    return <Square onClick={onClick} disabled={disabled} value={value} position={position}/>;
  } // Board.renderSquare

  render(){

    // TODO: Build switch statement for each stage
    var board;
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

            <div className="row">
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                {this.renderSquare(this.state.ca, 'ca', false, this.rpsSelect)}
              </div>
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                {this.renderSquare(this.state.cb, 'cb', false, this.rpsSelect)}
              </div>
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                {this.renderSquare(this.state.cc, 'cc', false, this.rpsSelect)}
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
