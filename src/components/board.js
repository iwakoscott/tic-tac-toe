import React, { Component } from 'react';
import Square from './square';

function shuffle(array){
  // Source cited: https://goo.gl/E3Xoch
  let temp = array;
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [temp[i], temp[j]] = [temp[j], temp[i]];
  }
  return temp;
} // shuffle

function fontAwesomeIcon(args) {
  var cNames = 'game-piece fa';
  for (var i = 0; i < arguments.length; i++) {
    cNames += ' ' + arguments[i];
  } // for each argument (which are classNames)
  return '<i class=\'' + cNames + '\'></i>';
} // fontAwesomeIcon

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
      rpsComputer: [0, 1, 2]
    };

    this.updateSquareOnClick = this.updateSquareOnClick.bind(this);
    this.startRPSGame = this.startRPSGame.bind(this);
    this.rpsSelect = this.rpsSelect.bind(this);
  } // Board.constructor

  updateSquareOnClick(e){

    var currentTagName = e.target.tagName;
    var thisPosition;

    if (currentTagName === 'I') {
      thisPosition = e.target.parentElement.id;
    }

    else {
      thisPosition = e.target.id;
    }

    var changeInState = {};
    changeInState[thisPosition] = 'k';

    this.setState(changeInState);

  } // Board.updateSquareOnClick

  startRPSGame(){
    // update computer row with question mark icons + remove start button
    this.props.updateStage(1);
    this.setState({
      aa: fontAwesomeIcon('fa-question-circle-o', 'fa-lg'),
      ab: fontAwesomeIcon('fa-question-circle-o', 'fa-lg'),
      ac: fontAwesomeIcon('fa-question-circle-o', 'fa-lg'),
      bb: '',
      ca: fontAwesomeIcon('fa-hand-rock-o', 'fa-lg'),
      cb: fontAwesomeIcon('fa-hand-paper-o', 'fa-lg'),
      cc: fontAwesomeIcon('fa-hand-scissors-o', 'fa-lg'),
      rpsComputer: shuffle(this.state.rpsComputer)
    });

  } // Board.startGame

  rpsSelect(){
    alert('Selected!');
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
