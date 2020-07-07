import React, { useState } from "react";

import Card from "../../components/card/Card/Card";
import CreateCard from "../../components/compound/CreateCard/CreateCard";
import Button from "../../components/input/Button/Button";
import ErrorBox from "../../components/decorations/ErrorBox/ErrorBox";

import "./Respond.css";

export const Respond = (props) => {
  const [kind, setKind] = useState("blue");
  const [text, setText] = useState("");
  const [error, setError] = useState(null);

  const onChange = (e) => {
    if (error) setError(null);
    if (e.target.name === "kind") setKind(e.target.value);
    else if (e.target.name === "text") setText(e.target.value);
  };

  const onClick = () => {
    if (text.length < 1) setError(new Error("Text cannot be blank"));
    else props.onRespond({ kind, text });
  };

  return (
    <div className="page today">
      <div className="box">
        <div className="column">
          <h2>Your card today</h2>
          <Card card={props.cardGiven} />
        </div>
        <div className="column">
          <h2>Your response</h2>
          <p>Select a colour for the card, then click the card to respond.</p>
          <CreateCard
            card={{ kind, text }}
            onSelectKind={onChange}
            onChangeText={onChange}
          />
          <div className="blank"> </div>
          <p className="caption no-margin">Write no more than 30 characters.</p>
          <p className="caption no-margin">
            You cannot change your response once submitted.
          </p>
          <div className="blank"> </div>
          {props.respondError && (
            <React.Fragment>
              <div className="blank"></div>
              <ErrorBox error={props.respondError} />
            </React.Fragment>
          )}
          {error && (
            <React.Fragment>
              <div className="blank"></div>
              <ErrorBox error={error} />
            </React.Fragment>
          )}
          <p className="caption link">How to respond</p>
          <Button
            className="grid-item"
            text="Respond"
            onButtonClick={onClick}
            loading={props.responding}
            disabled={props.responding}
          />
        </div>
      </div>
    </div>
  );
};
