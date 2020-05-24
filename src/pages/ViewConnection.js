import React from "react";

import Card from "../components/card/Card";
import CardWithCount from "../components/card/CardWithCount";

import "./ViewConnection.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { viewByCard } from "../store/actions/ConnectionActions";

class ViewConnection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewing: {
        kind: "white",
        text: "Angular",
      },
      connectedTo: [
        {
          kind: "red",
          text: "Web framework",
          count: 13,
        },
        {
          kind: "red",
          text: "Web development",
          count: 22,
        },
        {
          kind: "red",
          text: "Full stack web",
          count: 9,
        },
      ],
    };
  }

  componentDidMount = () => {
    let { id } = this.props.match.params;
    this.props.viewByCard(id);
  };

  onLeave = (index, event) => {
    console.log(index);
  };

  render() {
    if (!(this.props.loggedInUser && this.props.loggedInUser.userId)) {
      return <Redirect to="/" />;
    }
    let connectedTo = this.props.connections
      .sort((a, b) => b.count - a.count)
      .map((connection, index) => (
        <CardWithCount
          kind={connection.card.kind}
          text={connection.card.text}
          count={connection.count}
          cardId={connection.card.id}
          key={index}
          onClick={() => this.onLeave(index)}
        />
      ));
    return (
      <div className="page view-connection">
        {this.props.viewingCard && (
          <div className="box">
            <div className="column">
              <h2>All connections to</h2>
              <Card
                kind={this.props.viewingCard.kind}
                text={this.props.viewingCard.text}
              />
            </div>
            <div className="column">{connectedTo}</div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.auth.loggedInUser,
    viewingCard: state.connection.viewingCard,
    connections: state.connection.connectionsWithCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    viewByCard: (id) => dispatch(viewByCard(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewConnection);
