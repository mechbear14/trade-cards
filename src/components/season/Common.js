import moment from "moment";

export const NOT_STARTED = 0;
export const REGISTER_OPEN = 1;
export const REGISTER_CLOSED = 2;
export const SEASON_STARTED = 3;
export const SEASON_ENDED = 4;
export const UNKNOWN_ERROR = -1;

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

export function getSeasonStatusId(season, todayLocal) {
  let today = moment(todayLocal);
  let registerStartTime = moment(season.registerStartTime);
  let registerEndTime = moment(season.registerEndTime);
  let seasonStartDate = moment(season.seasonStartDate);
  let seasonEndDate = moment(season.seasonEndDate);

  let notOpen = today.isBefore(registerStartTime);
  let registerOpen =
    today.isAfter(registerStartTime) && today.isBefore(registerEndTime);
  let registerClosed =
    today.isAfter(registerEndTime) && today.isBefore(seasonStartDate);
  let seasonStarted =
    today.isAfter(seasonStartDate) && today.isBefore(seasonEndDate);
  let seasonEnded = today.isAfter(seasonEndDate);

  let statusId = UNKNOWN_ERROR;
  if (notOpen) statusId = NOT_STARTED;
  else if (registerOpen) statusId = REGISTER_OPEN;
  else if (registerClosed) statusId = REGISTER_CLOSED;
  else if (seasonStarted) statusId = SEASON_STARTED;
  else if (seasonEnded) statusId = SEASON_ENDED;
  else statusId = UNKNOWN_ERROR;

  return statusId;
}
