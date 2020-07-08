import React, { useState } from "react";

import LabelledInput from "../../../components/input/LabelledInput/LabelledInput";
import Button from "../../../components/input/Button/Button";
import ErrorBox from "../../../components/decorations/ErrorBox/ErrorBox";

export const LoginForm = (props) => {
  const [callSign, setCallSign] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);

  const onClick = () => {
    let errors = [];
    if (callSign.length < 1)
      errors.push(new Error("Call sign cannot be blank"));
    if (password.length < 1) errors.push(new Error("Password cannot be blank"));
    if (errors.length > 0) {
      setError(errors);
    } else {
      props.onLogin({ callSign, password });
    }
  };

  return (
    <div className="page one-column">
      <h2>Log in to Trade Cards</h2>
      <div className="box">
        {error.length > 0 && <ErrorBox error={error} />}
        {props.loginError && <ErrorBox error={props.loginError} />}
        <LabelledInput
          value={callSign}
          labelText="Your call sign"
          propName="callSign"
          onChange={(e) => setCallSign(e.target.value)}
        />
        <LabelledInput
          value={password}
          labelText="Your password"
          type="password"
          propName="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="link" onClick={props.onForget}>
          Forgot password
        </p>
        <Button onButtonClick={onClick} text="Log in" />
      </div>
    </div>
  );
};
