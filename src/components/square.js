import React from 'react';

function Square(props){
  const button = (
    <button className={"game-piece "}
            id={props.position}
            disabled={props.disabled}
            dangerouslySetInnerHTML = {{__html: props.value}}
            onClick={() => { props.onClick() }}>
    </button>
  );
  return button;
}

export default Square;
