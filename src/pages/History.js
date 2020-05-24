import React from "react";

import ConnectionWithLink from "../components/ConnectionWithLink";

import "./History.css";
import { connect } from "react-redux";
import { viewByCreator } from "../store/actions/ConnectionActions";

class History extends React.Component {
  componentDidMount = () => {
    if (!(this.props.loggedInUser && this.props.loggedInUser.userId)) {
      this.props.history.push("/");
    } else {
      if (!this.props.knowConnections) {
        this.props.getConnectionHistory();
      }
    }
  };

  render() {
    return (
      <div className="page">
        <h2>My previous cards</h2>
        <div className="history">
          {this.props.connections &&
            this.props.connections.map((connection, index) => (
              <ConnectionWithLink
                key={index}
                card1={connection.card1}
                card2={connection.card2}
              />
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.auth.loggedInUser,
    connections: state.connection.connections,
    knowConnections: state.connection.knowConnections,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getConnectionHistory: () => dispatch(viewByCreator()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
