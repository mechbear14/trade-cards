import React from "react";

import Card from "./Card";

import "./CardWithCount.css";
import { NavLink } from "react-router-dom";

function CardWithCount(props) {
  return (
    <NavLink to={`cards/${props.cardId}`} className="card-with-count">
      <Card kind={props.kind} text={props.text} small={true} />
      <span className="count">{props.count}</span>
    </NavLink>
  );
}

export default CardWithCount;
