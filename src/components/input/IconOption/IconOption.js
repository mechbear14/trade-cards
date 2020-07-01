import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./IconOption.css";

/**
 * Props:
 * selectName: Name of the variable to select
 * optionName: Name of the option to that variable
 * icon: FontAwesome icon object to use
 * optionLabel: Description of the option
 * onChange: Function that fires when selection changes
 */

export default function IconOption(props) {
  return (
    <div className="icon-option">
      <input
        type="radio"
        name={props.selectName}
        id={props.optionName}
        data-testid={`${props.testid}-radio`}
        onChange={props.onChange}
      />
      <label htmlFor={props.optionName} data-testid={props.testid}>
        <span className="icon">
          <FontAwesomeIcon icon={props.icon} />
        </span>
        <span className="caption">{props.optionLabel}</span>
      </label>
    </div>
  );
}
