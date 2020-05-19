import React from "react";

import Connection from "../components/Connection";

import "./TodayComplete.css";

function TodayComplete(props){
  return (
    <div className="page">
      <div className="box">
        <div className="column">
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

export default TodayComplete;
