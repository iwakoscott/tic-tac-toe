import React from 'react';

function Square(props){
  return (
    <button >
      <h1 className="game-piece">{props.value}</h1>
    </button>
  );
}

export default Square;
