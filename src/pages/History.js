import React from "react";

import Connection from "../components/Connection";

import "./History.css";

function History(props){
  return(
    <div className="page">
    <p className="section-title">My cards</p>
      <div className="history">
        <Connection />
        <Connection />
        <Connection />
        <Connection />
      </div>
    </div>
  )
}

export default History;
