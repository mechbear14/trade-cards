import React from "react";

import Connection from "../components/Connection";

import "./History.css";

function History(props) {
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

export default History;
