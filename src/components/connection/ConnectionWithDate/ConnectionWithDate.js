import React from "react";
import moment from "moment";

import Connection from "../Connection/Connection";

import "./ConnectionWithDate.css";

export const ConnectionWithDate = (props) => {
  return (
    <div className="connection-with-date">
      <div className="datetime">
        <div className="time">
          {moment(props.connection.createdAt).format("HHmm")}
        </div>
        <div className="date">
          {moment(props.connection.createdAt).format("DDMMMYY").toUpperCase()}
        </div>
      </div>
      <Connection
        connection={props.connection}
        small={true}
        cardClickable={props.cardClickable}
        onClickCard={props.cardClickable && props.onClickCard}
      />
    </div>
  );
};
