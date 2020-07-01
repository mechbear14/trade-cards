import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

import "./ErrorBox.css";

export default function ErrorBox(props) {
  let manyErrors = props.error.hasOwnProperty("length");
  if (manyErrors) {
    return (
      <div className="error">
        <div className="icon">
          <FontAwesomeIcon icon={faExclamationCircle} />
        </div>
        <ul>
          <h3 className="title">There are many errors</h3>
          {props.error.map((error, index) => (
            <li className="message" key={index}>
              {error.message}
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    if (props.error.hasOwnProperty("details")) {
      return (
        <div className="error">
          <div className="icon">
            <FontAwesomeIcon icon={faExclamationCircle} />
          </div>
          <div>
            <h3 className="title">{props.error.message}</h3>
            <p className="message">{props.error.details}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="error">
          <div className="icon">
            <FontAwesomeIcon icon={faExclamationCircle} />
          </div>
          <p className="message">{props.error.message}</p>
        </div>
      );
    }
  }
}
