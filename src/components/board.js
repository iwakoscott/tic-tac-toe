import React, { Component } from 'react';
import Square from './square';

function fontAwesomeIcon(args) {
  var cNames = 'fa';
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
      bb: '',
      bc: '',
      ca: fontAwesomeIcon('fa-hand-rock-o', 'fa-lg'),
      cb: fontAwesomeIcon('fa-hand-paper-o', 'fa-lg'),
      cc: fontAwesomeIcon('fa-hand-scissors-o', 'fa-lg')
    };

    this.updateSquareOnClick = this.updateSquareOnClick.bind(this);

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

  renderSquare(value, position){
    return <Square onClick={this.updateSquareOnClick} value={value} position={position}/>;
  } // Board.renderSquare

  render(){

    return (
      <div>

        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {this.renderSquare(this.state.aa, 'aa')}
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {this.renderSquare(this.state.ab, 'ab')}
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {this.renderSquare(this.state.ac, 'ac')}
          </div>
        </div>

        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {this.renderSquare(this.state.ba, 'ba')}
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {this.renderSquare(this.state.bb, 'bb')}
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {this.renderSquare(this.state.bc, 'bc')}
          </div>
        </div>

        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {this.renderSquare(this.state.ca, 'ca')}
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {this.renderSquare(this.state.cb, 'cb')}
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {this.renderSquare(this.state.cc, 'cc')}
          </div>
        </div>

      </div> // Wrapper
    );

  } // Board.render

} // Board

export default Board;
