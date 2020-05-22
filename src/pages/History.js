import React from "react";

import Connection from "../components/Connection";

import "./History.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

function History(props) {
  if (!(props.loggedInUser && props.loggedInUser.userId)) {
    return <Redirect to="/" />;
  }
  return (
    <div className="page">
      <h2>My previous cards</h2>
      <div className="history">
        <Connection />
        <Connection />
        <Connection />
        <Connection />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { loggedInUser: state.auth.loggedInUser };
};

export default connect(mapStateToProps)(History);
