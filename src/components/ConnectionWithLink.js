import React from "react";

import "./Connection.css";

import CardWithLink from "./card/CardWithLink";

class ConnectionWithLink extends React.Component {
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
        <CardWithLink
          kind={this.props.card1.kind}
          text={this.props.card1.text}
          cardId={this.props.card1.id}
        />
        <CardWithLink
          kind={this.props.card2.kind}
          text={this.props.card2.text}
          cardId={this.props.card2.id}
        />
      </div>
    );
  }
}

export default ConnectionWithLink;
