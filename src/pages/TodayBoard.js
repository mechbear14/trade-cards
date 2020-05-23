import React from "react";

import "./TodayBoard.css";

import Today from "./Today";
import TodayComplete from "./TodayComplete";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getCardToday } from "../store/actions/CardActions";

class TodayBoard extends React.Component {
  componentDidMount = () => {
    if (!(this.props.loggedInUser && this.props.loggedInUser.userId)) {
      this.props.history.push("/");
    } else if (!this.props.knowCompleted) {
      this.props.getCardInfo(this.props.loggedInUser.userId);
    }
  };

  render() {
    let pageToLoad = "";
    if (!(this.props.loggedInUser && this.props.loggedInUser.userId)) {
      return <Redirect to="/" />;
    } else if (this.props.knowCompleted) {
      if (this.props.completed) {
        pageToLoad = <TodayComplete newConnection={this.props.newConnection} />;
      } else {
        pageToLoad = <Today assignedCard={this.props.cardToday} />;
      }
    }
    return (
      <div className="page">
        <h1>Welcome, {this.props.loggedInUser.callSign}</h1>
        {pageToLoad}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.auth.loggedInUser,
    knowCompleted: state.card.knowCompleted,
    cardToday: state.card.cardToday,
    completed: state.card.completed,
    newConnection: state.card.newConnection,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCardInfo: (userId) => dispatch(getCardToday(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodayBoard);
