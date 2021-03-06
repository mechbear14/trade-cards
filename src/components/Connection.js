import React from "react";

import "./Connection.css";

import Card from "./card/Card";

class Connection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      card1: {
        kind: "white",
        text: "Boost.Asio",
      },
      card2: {
        kind: "red",
        text: "Network programming",
      },
    };
  }
  render() {
    return (
      <div className="connection">
        <Card kind={this.props.card1.kind} text={this.props.card1.text} />
        <Card kind={this.props.card2.kind} text={this.props.card2.text} />
      </div>
    );
  }
}

export default Connection;
