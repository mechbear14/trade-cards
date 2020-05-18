import React from "react";

import Card from "../components/card/Card";
import InputCard from "../components/card/InputCard";
import Button from "../components/Button";

import "./Today.css";

class Today extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      assignedCard: {
        kind: "red",
        text: "Distributed messaging system"
      },
      nextKind: "white"
    }
  }

  onClick() {
    alert("Roar! You've found me!")
  }

  render() {
    return(
      <div className="page">
        <div className="box">
        <div className="column">
          <p className="section-title">Your card today</p>
          <p className="text">Name one library/framework that does this</p>
            <Card kind={this.state.assignedCard.kind} text={this.state.assignedCard.text} />
        </div>
        <div className="column">
          <p className="section-title">Your response</p>
          <p className="text">Click the card below to respond.</p>
          <p className="caption no-margin">Write no more than 30 characters.</p>
          <p className="caption no-margin">You cannot change your response once submitted.</p>
          <InputCard kind={this.state.nextKind} />
          <p className="caption">How to respond</p>
          <Button className="grid-item" name="Roar!" onClick={this.onClick}/>
        </div>
        </div>
      </div>
    );
  }
}

export default Today;
