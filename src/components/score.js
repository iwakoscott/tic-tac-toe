import React, { Component } from 'react';

function fontAwesomeIcon(args) {
  var cNames = 'game-piece fa';
  for (var i = 0; i < arguments.length; i++) {
    cNames += ' ' + arguments[i];
  } // for each argument (which are classNames)
  return '<i class=\'' + cNames + '\'></i>';
} // fontAwesomeIcon

class Score extends Component {

  displayStars(score){
    var show = '';
    for (let i = 0; i < score; i++) {
      show += ' ' + fontAwesomeIcon('fa-star', 'fa-lg');
    }
    return show;
  } // Score.displayStars

  render(){

    if (this.props.ttt) {

      return (
        <div className="score-comp">

          <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 ttt-header">
            <h1 className="score-header">You</h1>
            <h5 className="ttt" dangerouslySetInnerHTML={{__html: this.props.you}}></h5>
          </div>

          <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 ttt-header">
            <h1 className="score-header">Computer</h1>
            <h5 className="ttt" dangerouslySetInnerHTML={{__html: this.props.computer}}></h5>
          </div>

      </div>
      );
    } // if in tic tac toe mode

    return (
      <div className="score-comp">

        <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 scoreboard">
          <h1 className="score-header">You</h1>
          <h5 className="score" dangerouslySetInnerHTML={{__html: this.displayStars(this.props.you)}}></h5>
        </div>

        <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 scoreboard">
          <h1 className="score-header">Computer</h1>
          <h5 className="score" dangerouslySetInnerHTML={{__html: this.displayStars(this.props.computer)}}></h5>
        </div>

    </div>
    );

  } // Score.render

} // Score

export default Score;
