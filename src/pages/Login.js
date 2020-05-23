import React from "react";

import LabelledInput from "../components/LabelledInput";
import Button from "../components/Button";
import Error from "../components/Error";

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
            {errors[0] &&
              errors.map((error, index) => (
                <React.Fragment key={index}>
                  <Error message={error.message} />
                  <div className="blank"></div>
                </React.Fragment>
              ))}
            <LabelledInput
              name="Your call sign"
              type="text"
              id="callSign"
              onChange={this.onChange}
            />
            <LabelledInput
              name="Password"
              type="password"
              id="password"
              onChange={this.onChange}
            />
            <div className="blank"></div>
            <Button name="Log in" onClick={this.onClick} />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (callSign, password) => dispatch(login(callSign, password)),
    resetError: () => dispatch(resetLoginError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
