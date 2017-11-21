import React from 'react';

function Square(props){
  const button = (
    <button className={"game-piece "}
            id={props.position}
            dangerouslySetInnerHTML = {{__html: props.value}}
            onClick={(e) => {props.onClick(e)}}>
    </button>
  );
  return button;
}

export default Square;
