import React, { useState } from "react";

import LabelledInput from "../../input/LabelledInput/LabelledInput";
import Button from "../../input/Button/Button";

import "./PopupMessage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

/**
 * @param {*} message Content of popup message
 * @param {*} onValidate Function returning a boolean to test whether the action is allowed
 * @param {*} validateLabel Label of the input for validation
 * @param {*} onConfirm Function to fire when confirm button is clicked
 * @param {*} onAbort Function to fire when close button is clicked or when clicking outside message
 */

export default function PopupMessage(props) {
  const [valid, setValid] = useState(false);
  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
    setValid(props.onValidate(e.target.value));
  };

  return (
    <div className="popup-message">
      <div
        className="message-background"
        data-testid="message-background"
        onClick={props.onAbort}
      ></div>
      <div className="message-box">
        <div className="message-heading">
          <span className="message-title">Confirm action</span>
          <button
            className="message-close"
            data-testid="message-close"
            onClick={props.onAbort}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="message-body">
          <span className="message-text">{props.message}</span>
          {props.onValidate && (
            <React.Fragment>
              <div className="blank" data-testid="message-input"></div>
              <LabelledInput
                labelText={props.validateLabel}
                onChange={onChange}
                value={value}
                propName="message-validate"
                type="text"
              />
            </React.Fragment>
          )}
          <div className="blank"> </div>
          <Button
            disabled={!valid}
            text="Confirm action"
            onButtonClick={props.onConfirm}
          />
        </div>
      </div>
    </div>
  );
}
