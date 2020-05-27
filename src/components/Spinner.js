import React from "react";

import "./Spinner.css";

export default function Spinner(props) {
  return (
    <div className="spinner" style={{ fontSize: props.fontSize }}>
      <div className="spinner-container">
        <div className="spinner-card"></div>
        <div className="spinner-card"></div>
      </div>
    </div>
  );
}
