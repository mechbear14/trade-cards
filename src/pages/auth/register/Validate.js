import React from "react";

import Button from "../../../components/input/Button/Button";
import ErrorBox from "../../../components/decorations/ErrorBox/ErrorBox";

export const Validate = (props) => {
  if (props.uid) {
    return (
      <div className="page one-column">
        <p>Your call sign for this season is</p>
        <h2>{props.callSign}</h2>
        <div className="blank "></div>
        <Button text="Go to dashboard" />
      </div>
    );
  } else {
    return (
      <div className="page">
        <ErrorBox error={new Error("You've followed an invalid link")} />
      </div>
    );
  }
};
