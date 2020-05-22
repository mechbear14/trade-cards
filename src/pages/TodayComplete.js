import React from "react";

import Connection from "../components/Connection";

import "./TodayComplete.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

function TodayComplete(props) {
  if (!(props.loggedInUser && props.loggedInUser.userId)) {
    return <Redirect to="/" />;
  }
  return (
    <div className="page today-complete">
      <div className="box">
        <div className="column">
          <h1>Welcome, {this.props.loggedInUser.callSign}</h1>
          <h2>You have submitted your response.</h2>
          <p className="text">View all my previous responses</p>
        </div>
        <div className="column">
          <Connection />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { loggedInUser: state.auth.loggedInUser };
};

export default connect(mapStateToProps)(TodayComplete);
