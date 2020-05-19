import React from "react";

import "./LabelledInput.css";

function LabelledInput(props){
  return (
    <div className="input">
      <label htmlFor={props.id} className="label">{props.name}</label>
      <input type={props.type} id={props.id} className="input-box" onChange={props.onChange}/>
      <div className="line-box">
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </div>
  );
}

export default LabelledInput;
