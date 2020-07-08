import React, { useState } from "react";

import LabelledInput from "../../../components/input/LabelledInput/LabelledInput";
import Button from "../../../components/input/Button/Button";
import ErrorBox from "../../../components/decorations/ErrorBox/ErrorBox";

export const ResetPassword = (props) => {
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [error, setError] = useState([]);

  const onClick = () => {
    let errors = [];
    if (password.length < 1) errors.push(new Error("Password cannot be blank"));
    if (passwordAgain.length < 1)
      errors.push(new Error("Confirmed password cannot be blank"));
    if (
      password.length > 0 &&
      passwordAgain.length > 0 &&
      password !== passwordAgain
    )
      errors.push(new Error("Passwords don't match"));
    if (errors.length > 0) {
      setError(errors);
    } else {
      props.onSubmit({ newPassword: password });
    }
  };

  if (props.uid) {
    return (
      <div className="page one-column">
        <h2>Log in to Trade Cards</h2>
        <div className="box">
          {error.length > 0 && <ErrorBox error={error} />}
          {props.resetError && <ErrorBox error={props.resetError} />}
          <LabelledInput
            value={password}
            labelText="New password"
            propName="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <LabelledInput
            value={passwordAgain}
            labelText="New password again"
            type="password"
            propName="passwordAgain"
            onChange={(e) => setPasswordAgain(e.target.value)}
          />
          <Button onButtonClick={onClick} text="Submit" />
        </div>
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
