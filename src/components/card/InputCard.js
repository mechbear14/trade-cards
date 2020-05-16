import React from 'react';
import './InputCard.css';

class InputCard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      text: ""
    }
  }

  onChange = e => {
    let textContent = e.target.textContent;
    if(textContent.length > 30) {
      e.target.textContent = this.state.text;
    } else {
      this.setState({
        text: textContent
      });
    }
  }

  render(){
    return (
      <div className={`card ${this.props.kind}`}>
        <span className="response" contentEditable onInput={this.onChange}></span>
      </div>
    );
  }
}

export default InputCard;
