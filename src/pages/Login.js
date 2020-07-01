import React from "react";

import LabelledInput from "../components/input/LabelledInput/LabelledInput";
import Button from "../components/input/Button/Button";
import ErrorBox from "../components/decorations/ErrorBox/ErrorBox";

import { login, resetLoginError } from "../store/actions/AuthActions";

import "./Login.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      callSign: "",
      password: "",
      errors: [],
    };
  }

  onChange = (e) => {
    this.props.resetError();
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
    if (this.state.callSign.length === 0) {
      errors.push({ message: "Call sign cannot be blank" });
    }
    if (this.state.password.length === 0) {
      errors.push({ message: "Password cannot be blank" });
    }
    if (errors.length === 0) {
      this.props.login(this.state.callSign, this.state.password);
    } else {
      this.setState({
        errors,
      });
    }
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
    return (
      <div className="page one-column">
        <form>
          <div className="box">
            {/* {errors[0] &&
              errors.map((error, index) => (
                <React.Fragment key={index}>
                  <ErrorBox message={error.message} />
                  <div className="blank"></div>
                </React.Fragment>
              ))} */}
            {errors[0] && <ErrorBox error={errors} />}
            <LabelledInput
              text="Your call sign"
              type="text"
              propName="callSign"
              value={this.state.callSign}
              onChange={this.onChange}
            />
            <LabelledInput
              text="Password"
              type="password"
              propName="password"
              value={this.state.password}
              onChange={this.onChange}
            />
            <div className="blank"></div>
            <Button
              text="Log in"
              onButtonClick={this.onClick}
              disabled={this.props.requestStarted}
            />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    firebaseError: state.auth.loginError,
    loggedInUser: state.auth.loggedInUser,
    requestStarted: state.auth.requestStarted,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (callSign, password) => dispatch(login(callSign, password)),
    resetError: () => dispatch(resetLoginError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
