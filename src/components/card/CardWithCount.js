import React from "react";

import Card from "./Card";

import "./CardWithCount.css";

function CardWithCount(props) {
  return (
    <div className="card-with-count" onClick={props.onClick}>
      <Card kind={props.kind} text={props.text} small={true} />
      <span className="count">{props.count}</span>
    </div>
  );
}

export default CardWithCount;
