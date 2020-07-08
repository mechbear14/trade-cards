import React from "react";
import { connect } from "react-redux";

import { ConfirmEmail } from "./ConfirmEmail";
import { RegisterForm } from "./RegisterForm";
import { UsePrev } from "./UsePrev";

import "../../BasePage.css";

export const Register = (props) => {
  return (
    <div className="page">
      {!props.user && <RegisterForm />}
      {props.user && !props.user.verified && <ConfirmEmail />}
      {props.user && props.user.previous && (
        <UsePrev previousCallSign={props.user.callSign} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
