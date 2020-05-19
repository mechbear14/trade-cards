import React from "react";

import LabelledInput from "../components/LabelledInput";
import Button from "../components/Button";

import "./Login.css";

class Register extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      callSign: "",
      password: ""
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  onClick =  (e) => {
    e.preventDefault();
    console.log(this.state);
  }

  render(){
    return (
      <div className="page">
      <p className="section-title">Select a password.</p>
      <p className="text">You will then be assigned your call sign!</p>
      <form>
        <div className="box">
            <LabelledInput name="Password" type="password" id="password" onChange={this.onChange} />
            <div className="blank"></div>
            <Button name="Register" onClick={this.onClick} />
        </div>
        </form>
      </div>
    );
  }
}

export default Register
