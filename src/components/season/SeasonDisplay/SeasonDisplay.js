import React from "react";
import moment from "moment";

import "./SeasonDisplay.css";

export function datesToMsg(startDate, endDate) {
  return `${moment(startDate).format("DDMMMYY")}-${moment(endDate).format(
    "DDMMMYY"
  )}`.toUpperCase();
}

/**
 * @param {*} startTime
 * @param {*} endTime
 */
export function timesToMsg(startTime, endTime) {
  let sameDay =
    moment(startTime).dayOfYear() === moment(endTime).dayOfYear() &&
    moment(startTime).year() === moment(endTime).year();
  if (sameDay) {
    return `${moment(startTime).format("HHmm")}-${moment(endTime).format(
      "HHmm"
    )} ${moment(startTime).format("DDMMMYY")}`.toUpperCase();
  } else {
    return `${moment(startTime).format("HHmm DDMMMYY")}-${moment(
      endTime
    ).format("HHmm DDMMMYY")}`.toUpperCase();
  }
}

/**
 * @param {*} today Date and time of now in local time
 * @param {*} season Season to display
 */
export default function SeasonDisplay(props) {
  let registerEnded = moment(props.today).isAfter(
    moment(props.season.registerEndTime)
  );
  let status = registerEnded
    ? datesToMsg(props.season.seasonStartDate, props.season.seasonEndDate)
    : `Register opens ${timesToMsg(
        props.season.registerStartTime,
        props.season.registerEndTime
      )}`;
  return (
    <div className="display">
      <div className="left">
        <span
          className="title"
          data-testid="season-title"
          data-content={props.season.title}
        >
          {props.season.title}
        </span>
        <span
          className="dates"
          data-testid="season-dates"
          data-content={status}
        >
          {status}
        </span>
      </div>
      <div className="right">
        <span
          className="label"
          data-testid="season-label"
          data-content={props.season.label}
        >
          {props.season.label}
        </span>
      </div>
    </div>
  );
}
