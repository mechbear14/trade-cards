import React, { useState } from "react";

import "./LabelledInput.css";

/**
 * Props:
 * value: Value in the input element
 * labelText: text content for label
 * type: input type
 * propName: name for referencing properties in state objects
 * onChange: function to fire when value changes
 */

export default function LabelledInput(props) {
  const [barClass, setBarClass] = useState("top-bar");
  let labelClass =
    barClass.split(" ").find((className) => className === "typing") ||
    (props.value && props.value.length && props.value.length > 0)
      ? "filled"
      : "empty";
  const onFocus = () => {
    setBarClass("top-bar typing");
  };
  const onBlur = () => {
    setBarClass("top-bar");
  };
  return (
    <div className="input">
      <label
        htmlFor={props.propName}
        className={labelClass}
        data-testid="label"
      >
        {props.labelText}
      </label>
      <input
        type={props.type}
        id={props.propName}
        value={props.value}
        onChange={props.onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        data-testid="input"
      />
      <div className="bottom-bar"></div>
      <div className={barClass} data-testid="bar"></div>
    </div>
  );
}
