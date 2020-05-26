import React from "react";

import "./TodayBoard.css";

import Today from "./Today";
import TodayComplete from "./TodayComplete";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { loadToday } from "../store/actions/TodayActions";
import Error from "../components/Error";

class TodayBoard extends React.Component {
  componentDidMount = () => {
    if (!(this.props.loggedInUser && this.props.loggedInUser.userId)) {
      this.props.history.push("/");
    } else {
      if (!this.props.loadCompleted) {
        this.props.loadToday();
      }
    }
  };

  render() {
    let pageToLoad = "";
    if (!(this.props.loggedInUser && this.props.loggedInUser.userId)) {
      return <Redirect to="/" />;
    } else {
      if (this.props.loadCompleted) {
        if (this.props.respondCompleted) {
          pageToLoad = (
            <TodayComplete newConnection={this.props.connectionToday} />
          );
        } else {
          pageToLoad = <Today assignedCard={this.props.cardToday} />;
        }
      } else {
        if (this.props.todayLoadError) {
          pageToLoad = <Error message={this.props.todayLoadError.message} />;
        } else {
          pageToLoad = <p>Loading</p>;
        }
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
    loadCompleted: state.today.loadCompleted,
    respondCompleted: state.today.respondCompleted,
    cardToday: state.today.cardToday,
    connectionToday: state.today.connectionToday,
    todayLoadError: state.today.todayLoadError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadToday: () => dispatch(loadToday()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodayBoard);
