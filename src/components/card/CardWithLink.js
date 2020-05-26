import React from "react";

import Card from "./Card";

import "./BaseCard.css";

export default function CardWithLink(props) {
  return (
    <div className="with-link" onClick={props.onClick}>
      <Card kind={props.kind} text={props.text} small={props.small} />
    </div>
  );
}
