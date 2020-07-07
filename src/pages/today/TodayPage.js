import React from "react";
import { connect } from "react-redux";

import { Respond } from "./Respond";
import { Complete } from "./Complete";
import { NoCardToday } from "./NoCardToday";

import "../BasePage.css";

export const TodayPage = (props) => {
  let showRespondPage = props.assignedCard && !props.responded;
  let showCompletePage = props.assignedCard && props.responded;
  let showNoCardPage = !props.assignedCard;
  return (
    <div className="page">
      <h1>Welcome, {props.callSign}</h1>
      {showRespondPage && <Respond cardGiven={props.assignedCard} />}
      {showCompletePage && <Complete connection={props.response} />}
      {showNoCardPage && <NoCardToday />}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TodayPage);
