import React from "react";

import Spinner from "./Spinner";

import "./Button.css";

export default function Button(props) {
  return (
    <div className="button">
      <button onClick={props.onClick} disabled={props.disabled}>
        {props.disabled && <Spinner fontSize={"1rem"} />}
        {props.name}
      </button>
    </div>
  );
}
