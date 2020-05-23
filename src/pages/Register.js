import React from "react";

import { register, resetRegisterError } from "../store/actions/AuthActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import LabelledInput from "../components/LabelledInput";
import Button from "../components/Button";
import Error from "../components/Error";

import "./Login.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
      errors: [],
    };
  }

  onChange = (e) => {
    this.props.resetErrors();
    if (this.state.errors.length > 0) {
      this.setState({
        errors: [],
      });
    }
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  onClick = (e) => {
    e.preventDefault();
    let errors = [];
    if (this.state.password.length < 8) {
      errors.push({ message: "Password must be at least 8-digit long" });
    }
    let emailRegExp = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
    if (!this.state.email.match(emailRegExp)) {
      errors.push({ message: "Invalid email address" });
    }
    if (errors.length === 0) {
      this.props.register(this.state.password, this.state.email);
    } else {
      this.setState({
        errors,
      });
    }
  };

  onTowardsLogin = () => {
    this.props.history.push("/login");
  };

  componentWillUnmount() {
    this.props.resetError();
  }

  render() {
    if (this.props.loggedInUser && this.props.loggedInUser.userId) {
      return <Redirect to="/today" />;
    }
    let errors = this.state.errors.slice();
    if (this.props.firebaseError) {
      errors.push(this.props.firebaseError);
    }
    if (this.props.registeredUser) {
      return (
        <div className="page one-column">
          <p>Your call sign for this season is</p>
          <h2>{this.props.registeredUser.callSign}</h2>
          <p>Your can now log in with your call sign and password</p>
          <div className="blank"></div>
          <Button name="Log in" onClick={this.onTowardsLogin} />
        </div>
      );
    } else {
      return (
        <div className="page one-column">
          <h2>Select a password.</h2>
          <p>You will then be assigned your call sign for this season!</p>
          <form>
            <div className="box">
              {errors[0] &&
                errors.map((error, index) => (
                  <React.Fragment key={index}>
                    <Error message={error.message} />
                    <div className="blank"></div>
                  </React.Fragment>
                ))}
              <LabelledInput
                name="Password"
                type="password"
                id="password"
                onChange={this.onChange}
              />
              <LabelledInput
                name="Password recovery email"
                type="email"
                id="email"
                onChange={this.onChange}
              />
              <div className="blank"></div>
              <Button name="Register" onClick={this.onClick} />
            </div>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    firebaseError: state.auth.error,
    registeredUser: state.auth.registeredUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (password, email) => dispatch(register(password, email)),
    resetError: () => dispatch(resetRegisterError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
