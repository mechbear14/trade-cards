import React from "react";

import Connection from "../../components/connection/Connection/Connection";

import "./Complete.css";

export const Complete = (props) => {
  return (
    <div className="page today-complete">
      <div className="box">
        <div className="column">
          <h2>You have responded to your card today</h2>
          {/* <NavLink to="/history" className="link">
            View all my previous responses
          </NavLink> */}
        </div>
        <div className="column">
          <Connection connection={props.connection} />
        </div>
      </div>
    </div>
  );
};
