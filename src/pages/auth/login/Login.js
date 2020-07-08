import React, { useState } from "react";
import { connect } from "react-redux";

import { LoginForm } from "./LoginForm";
import { ForgotPassword } from "./ForgotPassword";
import { AccountClosed } from "./AccountClosed";
import { ConfirmEmail } from "../register/ConfirmEmail";

import "../../BasePage.css";

export const Login = (props) => {
  const [forgotPassword, setForgotPassword] = useState(false);
  return (
    <div className="page">
      {!forgotPassword && (
        <LoginForm onForget={() => setForgotPassword(true)} />
      )}
      {forgotPassword && (
        <ForgotPassword onBack={() => setForgotPassword(false)} />
      )}
      {props.user && props.user.closed && (
        <AccountClosed connections={props.connections} />
      )}
      {props.user && !props.user.verified && <ConfirmEmail />}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
