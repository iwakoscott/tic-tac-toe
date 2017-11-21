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
      show += ' ' + fontAwesomeIcon('fa-thumbs-up', 'fa-lg');
    }
    return show;
  } // Score.displayStars

  render(){

    return (
      <div className="score-comp">

        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <h1 className="score-header">You</h1>
          <h5 className="score" dangerouslySetInnerHTML={{__html: this.displayStars(this.props.you)}}></h5>
        </div>

        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <h1 className="score-header">Computer</h1>
          <h5 className="score" dangerouslySetInnerHTML={{__html: this.displayStars(this.props.computer)}}></h5>
        </div>

    </div>
    );

  }

} // Score

export default Score;