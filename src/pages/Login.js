import React from "react";

import LabelledInput from "../components/LabelledInput";
import Button from "../components/Button";
import Error from "../components/Error";

import "./Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      callSign: "",
      password: "",
      error: false,
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  onClick = (e) => {
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <div className="page one-column">
        <form>
          <div className="box">
            {this.state.error && (
              <React.Fragment>
                <Error message="Error" />
                <div className="blank"></div>
              </React.Fragment>
            )}
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

export default Login;
