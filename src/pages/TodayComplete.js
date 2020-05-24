import React from "react";

import Connection from "../components/Connection";

import "./TodayComplete.css";
import { connect } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";

function TodayComplete(props) {
  if (!(props.loggedInUser && props.loggedInUser.userId)) {
    return <Redirect to="/" />;
  }
  return (
    <div className="page today-complete">
      <div className="box">
        <div className="column">
          <h2>You have submitted your response.</h2>
          <NavLink to="/history">View all my previous responses</NavLink>
        </div>
        <div className="column">
          <Connection
            card1={props.newConnection.card1}
            card2={props.newConnection.card2}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { loggedInUser: state.auth.loggedInUser };
};

export default connect(mapStateToProps)(TodayComplete);
