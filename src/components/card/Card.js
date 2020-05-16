import React from "react";
import "./BaseCard.css";

function Card(props){
  return (
    <div className={`card ${props.kind}`}>
      {props.text}
    </div>
  );
}

export default Card;
