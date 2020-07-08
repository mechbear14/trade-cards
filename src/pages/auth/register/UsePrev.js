import React, { useState } from "react";

import Button from "../../../components/input/Button/Button";

import "./UsePrev.css";

export const UsePrev = (props) => {
  const [selectedYes, setSelectedYes] = useState(false);
  const [decided, setDecided] = useState(false);
  const onClick = (yes) => {
    setDecided(true);
    setSelectedYes(yes);
    yes ? props.onYes() : props.onNo();
  };

  return (
    <div className="page one-column use-prev">
      <h2>We've met before.</h2>
      <p>You have previously registered and had this call sign:</p>
      <h2>{props.previousCallSign}</h2>
      <div className="blank"></div>
      <p>Would you like to use this previous call sign for this season?</p>
      <div className="button-box">
        {!(decided && !selectedYes) && (
          <Button
            onButtonClick={() => onClick(true)}
            text="Yes"
            disabled={decided}
            loading={!props.knowResult}
          />
        )}
        {!(decided && selectedYes) && (
          <Button
            onButtonClick={() => onClick(false)}
            text="No"
            disabled={decided}
            loading={!props.knowResult}
          />
        )}
      </div>
    </div>
  );
};
