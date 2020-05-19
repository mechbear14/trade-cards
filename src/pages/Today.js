import React from "react";

import Card from "../components/card/Card";
import InputCard from "../components/card/InputCard";
import Button from "../components/Button";
import Choice from "../components/Choice";

import "./Today.css";

class Today extends React.Component{
  choices = [
    {
      name: "blue",
      text: "Application (blue card)",
      value: "blue"
    },
    {
      name: "red",
      text: "Concept (red card)",
      value: "red"
    },
    {
      name: "white",
      text: "Library (white card)",
      value: "white"
    }
  ];

  constructor(props){
    super(props);
    this.state = {
      assignedCard: {
        kind: "blue",
        text: "Distributed messaging system"
      },
      nextKind: "blue"
    }
  }

  onClick() {
    alert("Roar! You've found me!")
  }

  onSelect = (e) => {
    this.setState({
      nextKind: e.target.value
    });
  }
  
  render() {
    return(
      <div className="page">
        <div className="box">
        <div className="column">
          <p className="section-title">Your card today</p>
          <Card kind={this.state.assignedCard.kind} text={this.state.assignedCard.text} />
        </div>
        <div className="column">
          <p className="section-title">Your response</p>
          <p className="text">Select a colour for the card, then click the card to respond.</p>
          <Choice choices={this.choices} name="nextKind" onSelect={this.onSelect}/>
          <div className="blank"> </div>
          <p className="caption no-margin">Write no more than 30 characters.</p>
          <p className="caption no-margin">You cannot change your response once submitted.</p>
          <div className="blank"> </div>
          <InputCard kind={this.state.nextKind} />
          <p className="caption">How to respond</p>
          <Button className="grid-item" name="Submit" onClick={this.onClick}/>
        </div>
        </div>
      </div>
    );
  }
}

export default Today;
