import React, { Component } from 'react';
import Square from './square';

class Board extends Component {

  constructor(props){
    super(props);
    this.state = {

    };
  } // Board.constructor

  renderSquare(){
    return <Square />;
  } // Board.renderSquare

  render(){

    return (
      <div className="container board">

        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {this.renderSquare()}
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {this.renderSquare()}
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {this.renderSquare()}
          </div>
        </div>

        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {this.renderSquare()}
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {this.renderSquare()}
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {this.renderSquare()}
          </div>
        </div>

        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {this.renderSquare()}
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {this.renderSquare()}
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {this.renderSquare()}
          </div>
        </div>

      </div> // Wrapper
    );

  } // Board.render

} // Board

export default Board;
