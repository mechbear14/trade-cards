import React from "react";

import Card from "../components/card/Card";
import InputCard from "../components/card/InputCard";

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
            <Card className="grid-item" kind={this.state.assignedCard.kind} text={this.state.assignedCard.text} />
            <p className="section-title grid-item">Your response</p>
                        <p className="text grid-item">Click the card below to respond. Write no more than 30 characters.</p>
            <InputCard className="grid-item" kind={this.state.nextKind} />
            <p className="caption grid-item">How to respond</p>
        </div>
      </div>
    );
  }
}

export default Today;
