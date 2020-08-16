import React from "react";

import Card from "../Card/Card";

import "./CardWithClick.css";

function CardWithClick(props) {
  return (
    <div onClick={props.onClick} className="card-with-click">
      <Card card={props.card} small={props.small} />
    </div>
  );
}

export default CardWithClick;
