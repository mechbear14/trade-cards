import React from "react";

import "./Button.css";

class Button extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      submitted: false
    };
  }
  render(){
    return(
      <button onClick={this.props.onClick}>{this.props.name}</button>
    );
  }
}

export default Button;
