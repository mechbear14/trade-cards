import React from "react";

import ConnectionWithLink from "../components/ConnectionWithLink";
import Error from "../components/Error";

import "./History.css";
import { connect } from "react-redux";
import { getHistory } from "../store/actions/HistoryActions";
import { Redirect } from "react-router-dom";
import { viewConnection } from "../store/actions/ViewActions";
import Loading from "../components/Loading";

class History extends React.Component {
  componentDidMount = () => {
    if (!(this.props.loggedInUser && this.props.loggedInUser.userId)) {
      this.props.history.push("/");
    } else {
      if (!this.props.loaded) {
        this.props.getHistory();
      }
    }
  };

  render() {
    let loaded = this.props.loaded;
    let connectionContent =
      this.props.connections.length > 0 ? (
        this.props.connections.map((connection, index) => (
          <ConnectionWithLink
            key={index}
            card1={connection.card1}
            card2={connection.card2}
            onClick={this.props.viewConnection}
          />
        ))
      ) : (
        <p>You haven't responded to any card yet.</p>
      );
    return (
      <div className="page">
        {this.props.viewingCard ? <Redirect to="/card" /> : ""}
        <h2>My previous cards</h2>
        <div className="history">
          {this.props.error ? <Error message={this.props.error.message} /> : ""}
          {loaded ? connectionContent : <Loading />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.auth.loggedInUser,
    loaded: state.history.loaded,
    connections: state.history.connections,
    error: state.history.error,
    viewingCard: state.view.viewingCard,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHistory: () => dispatch(getHistory()),
    viewConnection: (card) => dispatch(viewConnection(card)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
