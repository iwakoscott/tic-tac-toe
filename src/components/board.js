import React, { Component } from 'react';
import Square from './square';

class Board extends Component {

  constructor(props){
    super(props);
    this.state = {
      a1: 'TIC',
      a2: 'TAC',
      a3: 'TOE',
      b1: '',
      b2: '',
      b3: '',
      c1: <i className="fa fa-hand-rock-o fa-lg"></i>,
      c2: <i className="fa fa-hand-paper-o fa-lg"></i>,
      c3: <i className="fa fa-hand-scissors-o fa-lg"></i>
    };

    this.updateSquare = this.updateSquare.bind(this);

  } // Board.constructor

  updateSquare(newPiece, coordinate){
    alert('Success!');
    this.setState({
      coordinate: newPiece
    });
  } // Board.updateSquare

  renderSquare(value){
    return <Square value={value} />;
  } // Board.renderSquare

  render(){

    return (
      <div>

        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {this.renderSquare(this.state.a1)}
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {this.renderSquare(this.state.a2)}
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {this.renderSquare(this.state.a3)}
          </div>
        </div>

        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {this.renderSquare(this.state.b1)}
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {this.renderSquare(this.state.b2)}
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {this.renderSquare(this.state.b3)}
          </div>
        </div>

        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {this.renderSquare(this.state.c1)}
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {this.renderSquare(this.state.c2)}
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {this.renderSquare(this.state.c3)}
          </div>
        </div>

      </div> // Wrapper
    );

  } // Board.render

} // Board

export default Board;
