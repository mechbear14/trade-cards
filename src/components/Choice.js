import React from "react";

import "./Choice.css";

function Choice(props) {
  return (
    <div className="choice">
      {props.choices.map((choice, index) => (
        <div className="option" key={choice.name}>
          <input
            type="radio"
            name={props.name}
            value={choice.value}
            id={choice.name}
            onChange={props.onSelect}
            defaultChecked={index === 0}
          />
          <label htmlFor={choice.name}>{choice.text}</label>
        </div>
      ))}
    </div>
  );
}

export default Choice;
