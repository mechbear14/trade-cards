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
      />
      <CardWithLink
        kind={props.card2.kind}
        text={props.card2.text}
        cardId={props.card2.id}
      />
    </div>
  );
}

export default ConnectionWithLink;
