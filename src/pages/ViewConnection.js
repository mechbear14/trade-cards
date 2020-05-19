import React from "react";

import Card from "../components/card/Card";
import CardWithCount from "../components/card/CardWithCount";

import "./ViewConnection.css";

class ViewConnection extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      viewing: {
        kind: "white",
        text: "Angular"
      },
      connectedTo: [
        {
          kind: "red",
          text: "Web framework",
          count: 13
        },
        {
          kind: "red",
          text: "Web development",
          count: 22
        },
        {
          kind: "red",
          text: "Full stack web",
          count: 9
        }
      ]
    };
  }

  onLeave = (index, event) => {
    console.log(index);
  };

  render(){
    let connectedTo = this.state.connectedTo
        .sort((a, b) => b.count - a.count)
        .map((card, index) => <CardWithCount kind={card.kind} text={card.text} count={card.count} key={index}
        onClick={() => this.onLeave(index)}/>);
    return (
      <div className="page">
        <div className="box">
          <div className="column">
            <h2>All connections to</h2>
            <Card kind={this.state.viewing.kind} text={this.state.viewing.text}/>
          </div>
          <div className="column">
            {connectedTo}
          </div>
        </div>
      </div>
    );
  }
}

export default ViewConnection;
