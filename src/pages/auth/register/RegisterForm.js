import React, { useState } from "react";

import LabelledInput from "../../../components/input/LabelledInput/LabelledInput";
import Button from "../../../components/input/Button/Button";
import ErrorBox from "../../../components/decorations/ErrorBox/ErrorBox";

export const RegisterForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);

  const onClick = () => {
    const emailRegExp = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
    let errors = [];
    if (password.length < 1) errors.push(new Error("Password cannot be blank"));
    if (email.length < 1)
      errors.push(new Error("Recovery email cannot be blank"));
    if (!email.match(emailRegExp))
      errors.push(new Error("Recovery email is not valid"));
    if (errors.length > 0) {
      setError(errors);
    } else {
      props.onRegister({ password, email });
    }
  };

  return (
    <div className="page one-column">
      <h2>Registering for this season</h2>
      <div className="box">
        {error.length > 0 && <ErrorBox error={error} />}
        {props.registerError && <ErrorBox error={props.registerError} />}
        <LabelledInput
          value={password}
          labelText="Password"
          type="password"
          propName="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <LabelledInput
          value={email}
          labelText="Password recovery email"
          propName="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onButtonClick={onClick} text="Register" />
      </div>
    </div>
  );
};
