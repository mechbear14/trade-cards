import React from "react";

import Connection from "../components/Connection";

import "./TodayComplete.css";

function TodayComplete(props){
  return (
    <div className="page">
      <div className="box">
        <div className="column">
          <p className="section-title">You have submitted your response.</p>
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
