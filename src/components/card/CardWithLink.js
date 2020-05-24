import React from "react";

import Card from "./Card";
import { NavLink } from "react-router-dom";

import "./BaseCard.css";

export default function CardWithLink(props) {
  return (
    <NavLink to={`/card/${props.cardId}`}>
      <Card kind={props.kind} text={props.text} small={props.small} />
    </NavLink>
  );
}
