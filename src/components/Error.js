import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

import "./Error.css";

function Error(props) {
  return (
    <div className="error">
      <div className="icon">
        <FontAwesomeIcon icon={faExclamationCircle} />
      </div>
      <div className="message">{props.message}</div>
    </div>
  );
}

export default Error;
