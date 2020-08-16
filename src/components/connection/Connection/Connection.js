import React from "react";

import "./Connection.css";

import Card from "../../card/Card/Card";
import CardWithClick from "../../card/CardWithClick/CardWithClick";

export default function Connection(props) {
  if (props.cardClickable) {
    return (
      <div className="connection">
        <CardWithClick
          card={props.connection.card1}
          small={props.small}
          onClick={() => props.onClickCard(props.connection.card1)}
        />
        <CardWithClick
          card={props.connection.card2}
          small={props.small}
          onClick={() => props.onClickCard(props.connection.card2)}
        />
      </div>
    );
  } else {
    return (
      <div className="connection">
        <Card card={props.connection.card1} small={props.small} />
        <Card card={props.connection.card2} small={props.small} />
      </div>
    );
  }
}
