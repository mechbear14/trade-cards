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
      <div className="button">
        <button onClick={this.props.onClick}>{this.props.name}</button>
      </div>
    );
  }
}

export default Button;
