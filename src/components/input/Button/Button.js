import React from "react";

import "./Button.css";

import Spinner from "../../decorations/Spinner/Spinner";

/**
 * @param { } onButtonClick Function to fire when the button is clicked
 * @param { } disabled Whether the button is disabled
 * @param { } loading Whether the button should show the loading spinner
 * @param { } text Text on the button
 */

export default function Button(props) {
  return (
    <div className="button">
      <button
        onClick={props.onButtonClick}
        disabled={props.disabled}
        data-testid="button"
      >
        {props.loading && <Spinner />}
        {props.text}
      </button>
    </div>
  );
}
