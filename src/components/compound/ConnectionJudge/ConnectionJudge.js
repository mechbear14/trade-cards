import React from "react";
import {
  faCheckCircle,
  faQuestionCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import Connection from "../../connection/Connection/Connection";
import IconOption from "../../input/IconOption/IconOption";

import "./ConnectionJudge.css";

/**
 * Props:
 * connection: The connection to judge, with id and both cards
 * onChange: Function that fires when selection changes
 */

export default function ConnectionJudge(props) {
  return (
    <div className="connection-judge">
      <div className="connection">
        <Connection connection={props.connection} small={true} />
      </div>
      <div className="option-box">
        <IconOption
          icon={faCheckCircle}
          selectName={props.connection.id}
          optionName="approve"
          optionLabel="Approve"
          onChange={props.onChange}
          testid="approve"
        />
        <IconOption
          icon={faQuestionCircle}
          selectName={props.connection.id}
          optionName="needsCheck"
          optionLabel="Needs verification"
          onChange={props.onChange}
          testid="needsCheck"
        />
        <IconOption
          icon={faExclamationCircle}
          selectName={props.connection.id}
          optionName="inappropriate"
          optionLabel="Inappropriate response"
          onChange={props.onChange}
          testid="inappropriate"
        />
      </div>
    </div>
  );
}
