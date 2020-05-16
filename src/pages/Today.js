import React from "react";

import Card from "../components/card/Card";
import InputCard from "../components/card/InputCard";
import Button from "../components/Button";
import Connection from "../components/Connection";

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
          <p className="text grid-item">Click the card below to respond. Write no more than 30 characters.</p>
          <div className="grid-item">
            <InputCard kind={this.state.nextKind} />
          </div>
          <p className="caption grid-item">How to respond</p>
          <div className="grid-item">
            <Button className="grid-item" name="Roar!"/>
          </div>
          <div className="grid-item">
            <Connection className="grid-item" />
          </div>
        </div>
      </div>
    );
  }
}

export default Today;
