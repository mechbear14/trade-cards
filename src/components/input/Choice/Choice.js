import React from "react";

import "./Choice.css";

/**
 * Props:
 * name: name of variable to choose for
 * choices: choices text to choose from, containing name and text properties
 * onSelect: function to fire when select
 * selected: current option that's selected
 */

export default function Choice(props) {
  return (
    <div className="choice">
      {props.choices.map((choice) => (
        <div className="option" key={choice.name}>
          <input
            type="radio"
            name={props.name}
            value={choice.name}
            id={choice.name}
            onChange={props.onSelect}
            checked={
              props.selected.name
                ? choice.name === props.selected.name
                : choice.name === props.selected
            }
            data-testid={`${props.name}-radio`}
          />
          <label htmlFor={choice.name}>{choice.text}</label>
        </div>
      ))}
    </div>
  );
}
