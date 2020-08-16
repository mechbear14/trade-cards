import React, { useState } from "react";

import { datesToMsg, timesToMsg, getSeasonStatusId } from "../Common";
import {
  NOT_STARTED,
  REGISTER_OPEN,
  REGISTER_CLOSED,
  SEASON_ENDED,
  SEASON_STARTED,
} from "../Common";

import "./SeasonListItem.css";

export default function SeasonListItem(props) {
  const statusTexts = [
    "Not open yet",
    "Register open",
    "Register closed",
    "Season started",
    "Season ended",
    "Error",
  ];

  // Discuss this
  const canEdit = [];
  const canEndRegister = [];
  const canEndSeason = [];
  const canDelete = [];

  const registerTimes = timesToMsg(
    props.season.registerStartTime,
    props.season.registerEndTime
  );

  const dates = datesToMsg(
    props.season.seasonStartDate,
    props.season.seasonEndDate
  );

  const statusId = getSeasonStatusId(props.season, props.today);
  const status = statusTexts[statusId];

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
          {statusId < 2 && !props.season.published && (
            <button className="normal">Publish</button>
          )}
          {statusId === 2 && props.season.published && (
            <button className="danger">End register</button>
          )}
          {statusId === 4 && props.season.published && (
            <button className="danger">End season</button>
          )}
          {statusId < 4 && props.season.published && (
            <button className="danger">Delete season</button>
          )}
        </div>
      </div>
    </div>
  );
}
