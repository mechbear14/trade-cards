import React, { useState } from "react";

import LabelledInput from "../../../components/input/LabelledInput/LabelledInput";
import Button from "../../../components/input/Button/Button";
import ErrorBox from "../../../components/decorations/ErrorBox/ErrorBox";

export const ForgotPassword = (props) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const onClick = () => {
    const emailRegExp = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
    if (email.length < 1) setError(new Error("Email cannot be empty"));
    else if (!email.match(emailRegExp))
      setError(new Error("Email address is not valid"));
    else props.onSubmit({ email });
  };

  return (
    <React.Fragment>
      <p className="link" onClick={props.onBack}>
        Back
      </p>
      <div className="page one-column">
        <h2>Password recovery</h2>
        <div className="box">
          {error && <ErrorBox error={error} />}
          {props.submitError && <ErrorBox error={props.submitError} />}
          <LabelledInput
            value={email}
            propName="email"
            type="email"
            labelText="Password recovery email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onButtonClick={onClick} text="Continue" />
        </div>
      </div>
    </React.Fragment>
  );
};
