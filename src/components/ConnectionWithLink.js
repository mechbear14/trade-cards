import React from "react";

import "./Connection.css";

import CardWithLink from "./card/CardWithLink";

function ConnectionWithLink(props) {
  return (
    <div className="connection">
      <CardWithLink
        kind={props.card1.kind}
        text={props.card1.text}
        cardId={props.card1.id}
        onClick={() => props.onClick(props.card1)}
      />
      <CardWithLink
        kind={props.card2.kind}
        text={props.card2.text}
        cardId={props.card2.id}
        onClick={() => props.onClick(props.card2)}
      />
    </div>
  );
}

export default ConnectionWithLink;
