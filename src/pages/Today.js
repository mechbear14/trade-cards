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
          <p className="section-title grid-item">Your card today</p>
          <p className="text grid-item">Name one library/framework that does this</p>
          <div className="grid-item">
            <Card kind={this.state.assignedCard.kind} text={this.state.assignedCard.text} />
          </div>
          <p className="section-title grid-item">Your response</p>
          <section className="multi-line grid-item">
            <p className="text">Click the card below to respond.</p>
            <p className="caption">Write no more than 30 characters.</p>
            <p className="caption">You cannot change your response once submitted.</p>
          </section>
          <div className="grid-item">
            <InputCard kind={this.state.nextKind} />
          </div>
          <p className="caption grid-item">How to respond</p>
          <div className="grid-item">
            <Button className="grid-item" name="Roar!" onClick={this.onClick}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Today;
