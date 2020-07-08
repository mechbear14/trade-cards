import React, { useState } from "react";

import Button from "../../../components/input/Button/Button";

export const ConfirmEmail = (props) => {
  const [disableButton, setDisableButton] = useState(false);

  const onClick = () => {
    props.onResend();
    setDisableButton(true);
    setTimeout(() => setDisableButton(false), 60000);
  };

  return (
    <div className="page one-column">
      <h2>We've sent you an email</h2>
      <p>Please click the link in it to verify your email address.</p>
      <p>Not getting anything?</p>
      <Button
        onButtonClick={onClick}
        text={disableButton ? "Please wait" : "Send again"}
        disabled={disableButton}
        loading={disableButton}
      />
    </div>
  );
};
