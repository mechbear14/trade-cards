import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import "./CardSelect.css";

import Card from "../../card/Card/Card";

/**
 * Props:
 * propName: name of the variable to change
 * card: the card to select/unselect
 * onChange: function to fire when input changes
 */
export default function CardSelect(props) {
  return (
    <div className="card-with-tick">
      <label htmlFor={props.propName}>
        <input
          type="checkbox"
          id={props.propName}
          onChange={props.onChange}
          data-testid="checkbox"
          checked={props.selected}
        />
        <div className="card-cover">
          <FontAwesomeIcon className="icon" icon={faCheckCircle} />
        </div>
        <Card card={props.card} small={true} />
      </label>
    </div>
  );
}
