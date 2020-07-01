import React, { useState } from "react";
import moment from "moment";

import { datesToMsg, timesToMsg } from "../SeasonDisplay/SeasonDisplay";

import "./SeasonListItem.css";

/**
 * TODO: Add "Publish" option
 */

export default function SeasonListItem(props) {
  const statusTexts = [
    "Loading",
    "Not open yet",
    "Register open",
    "Register closed",
    "Season started",
    "Season ended",
    "Error",
  ];

  let today = moment(props.today);
  let registerStartTime = moment(props.season.registerStartTime);
  let registerEndTime = moment(props.season.registerEndTime);
  let seasonStartDate = moment(props.season.seasonStartDate);
  let seasonEndDate = moment(props.season.seasonEndDate);

  let notOpen = today.isBefore(registerStartTime);
  let registerOpen =
    today.isAfter(registerStartTime) && today.isBefore(registerEndTime);
  let registerClosed =
    today.isAfter(registerEndTime) && today.isBefore(seasonStartDate);
  let seasonStarted =
    today.isAfter(seasonStartDate) && today.isBefore(seasonEndDate);
  let seasonEnded = today.isAfter(seasonEndDate);

  let statusId = 0;
  if (notOpen) statusId = 1;
  else if (registerOpen) statusId = 2;
  else if (registerClosed) statusId = 3;
  else if (seasonStarted) statusId = 4;
  else if (seasonEnded) statusId = 5;
  else statusId = 6;

  let status = statusTexts[statusId];

  let registerTimes = timesToMsg(
    props.season.registerStartTime,
    props.season.registerEndTime
  );

  let dates = datesToMsg(
    props.season.seasonStartDate,
    props.season.seasonEndDate
  );

  const [detailBoxClass, setDetailBoxClass] = useState("detail-box hide");
  const toggleShowHide = () => {
    if (detailBoxClass === "detail-box") {
      setDetailBoxClass("detail-box hide");
    } else {
      setDetailBoxClass("detail-box");
    }
  };

  return (
    <div className="season-list-item">
      <div
        className="title-box"
        data-testid="title-box"
        onClick={toggleShowHide}
      >
        <span className="label" data-testid="label">
          {props.season.label}
        </span>
        <span className="title" data-testid="title">
          {props.season.title}
        </span>
        <span className="status" data-testid="status">
          {status}
        </span>
      </div>
      <div className={detailBoxClass} data-testid="detail-box">
        <div className="detail-item">
          <span>Date: </span>
          <span className="dates" data-testid="dates">
            {dates}
          </span>
        </div>
        <div className="detail-item">
          <span>Register open: </span>
          <span className="register-times" data-testid="register-times">
            {registerTimes}
          </span>
        </div>
        <div className="detail-item button-box">
          {statusId < 2 && <button className="normal">Edit</button>}
          {statusId < 2 && !props.published && (
            <button className="normal">Publish</button>
          )}
          {statusId === 2 && props.published && (
            <button className="danger">End register</button>
          )}
          {statusId === 4 && props.published && (
            <button className="danger">End season</button>
          )}
          {statusId < 4 && props.published && (
            <button className="danger">Delete season</button>
          )}
        </div>
      </div>
    </div>
  );
}
