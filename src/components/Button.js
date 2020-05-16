import React from "react";

class Button extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      submitted: false
    };
  }
  render(){
    return(
      <h1>{this.props.name}</h1>
    );
  }
}

export default Button;
