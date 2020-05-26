import React from "react";

import Card from "../components/card/Card";
import CardWithCount from "../components/card/CardWithCount";
import Error from "../components/Error";

import "./ViewConnection.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { viewConnection, resetViewing } from "../store/actions/ViewActions";

class ViewConnection extends React.Component {
  componentWillUnmount = () => {
    this.props.resetViewing();
  };

  render() {
    if (!(this.props.loggedInUser && this.props.loggedInUser.userId)) {
      return <Redirect to="/" />;
    }
    let connectedTo = this.props.connected.map((connection, index) => (
      <CardWithCount
        kind={connection.card.kind}
        text={connection.card.text}
        count={connection.count}
        cardId={connection.card.id}
        key={index}
        onClick={() => this.props.viewConnection(connection.card)}
      />
    ));
    let pageContent = "";
    if (this.props.loaded) {
      if (this.props.error) {
        pageContent = <Error message={this.props.error.message} />;
      } else {
        pageContent = connectedTo;
      }
    } else {
      pageContent = <p>Loading</p>;
    }

    return (
      <div className="page view-connection">
        {this.props.viewingCard ? (
          <div className="box">
            <div className="column">
              <h2>All connections to</h2>
              <Card
                kind={this.props.viewingCard.kind}
                text={this.props.viewingCard.text}
              />
            </div>
            <div className="column">{pageContent}</div>
          </div>
        ) : (
          <Redirect to="/history" />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.auth.loggedInUser,
    viewingCard: state.view.viewingCard,
    loaded: state.view.loaded,
    connected: state.view.connectedCards,
    error: state.view.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    viewConnection: (card) => dispatch(viewConnection(card)),
    resetViewing: () => dispatch(resetViewing()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewConnection);
