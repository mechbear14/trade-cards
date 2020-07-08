import React from "react";
import { connect } from "react-redux";

import { ConnectionWithDate } from "../../components/connection/ConnectionWithDate/ConnectionWithDate";
import Loading from "../../components/decorations/Loading/Loading";

import "./History.css";

export const History = (props) => {
  return (
    <div className="page">
      <h2>My connections</h2>
      <div className="history">
        {props.knowHistory &&
          props.history.length > 0 &&
          props.history.map((connection) => (
            <ConnectionWithDate key={connection.id} connection={connection} />
          ))}
      </div>
      {props.knowHistory && props.history.length === 0 && (
        <h2>You have not responded to any card yet.</h2>
      )}
      {!props.knowHistory && <Loading />}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(History);
