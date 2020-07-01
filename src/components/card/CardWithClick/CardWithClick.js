import React from "react";

import Card from "../Card/Card";

function CardWithClick(props) {
  return (
    <div onClick={props.onClick}>
      <Card card={props.card} small={props.small} />
    </div>
  );
}

export default CardWithClick;
