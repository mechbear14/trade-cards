import React from "react";

import Card from "../Card/Card";

import "./CardWithCount.css";

export const CardWithCount = (props) => {
  return (
    <div className="card-with-count" onClick={() => props.onClick(props.card)}>
      <Card card={props.card} small={true} />
      <span className="count">{props.count}</span>
    </div>
  );
};
