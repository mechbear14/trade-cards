import React from "react";

import { ConnectionWithDate } from "../../../components/connection/ConnectionWithDate/ConnectionWithDate";

export const AccountClosed = (props) => {
  return (
    <div className="page one-column">
      <h2>
        Your account has been closed because of your following three
        inappropriate responses
      </h2>
      <div>
        {props.connections.map((response) => (
          <React.Fragment>
            <ConnectionWithDate connection={response} key={response.id} />
            <div className="blank"></div>
          </React.Fragment>
        ))}
      </div>
      <p>You cannot appeal to this decision</p>
      <p>Please wait for next season to register</p>
    </div>
  );
};
