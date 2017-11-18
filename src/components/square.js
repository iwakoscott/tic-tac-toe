import React from 'react';

function Square(props){
  return (
    <button className="game-piece" id={ props.position } onClick={(e) => {props.onClick(e)}}>
      {props.value}
    </button>
  );
}

export default Square;
