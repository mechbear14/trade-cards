import React from "react";

import "./Connection.css";

import Card from "../../card/Card/Card";

export default function Connection(props) {
  return (
    <div className="connection">
      <Card card={props.connection.card1} small={props.small} />
      <Card card={props.connection.card2} small={props.small} />
    </div>
  );
}
