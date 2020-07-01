import React from "react";

import "./CreateCard.css";

import Choice from "../../input/Choice/Choice";
import CardInput from "../../input/CardInput/CardInput";

export default function CreateCard(props) {
  let cardKinds = [
    { name: "blue", text: "Blue" },
    { name: "white", text: "White" },
    { name: "red", text: "Red" },
  ];
  return (
    <div className="create-card">
      <Choice
        choices={cardKinds}
        onSelect={props.onSelectKind}
        selected={props.card.kind}
        name="kind"
      />
      <div className="blank"></div>
      <CardInput
        propName="text"
        card={props.card}
        onChange={props.onChangeText}
      />
    </div>
  );
}
