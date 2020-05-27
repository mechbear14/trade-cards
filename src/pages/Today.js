// TODO: Prevent double submission

import React from "react";

import Card from "../components/card/Card";
import InputCard from "../components/card/InputCard";
import Button from "../components/Button";
import Choice from "../components/Choice";
import Error from "../components/Error";

import "./Today.css";
import { connect } from "react-redux";
import {
  validateError,
  resetError,
  respondWith,
} from "../store/actions/TodayActions";

class Today extends React.Component {
  choices = [
    {
      name: "red",
      text: "Concept (red card)",
      value: "red",
    },
    {
      name: "white",
      text: "Library (white card)",
      value: "white",
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      nextKind: "red",
      nextText: "",
    };
  }

  onClick = () => {
    if (this.state.nextText.length === 0) {
      this.props.validateError("Your response cannot be blank");
    } else {
      this.props.respondWith(this.state.nextKind, this.state.nextText);
    }
  };

  onSelect = (e) => {
    this.setState({
      nextKind: e.target.value,
    });
  };

  getText = (text) => {
    this.props.resetError();
    this.setState({
      nextText: text,
    });
  };

  render() {
    return (
      <div className="page today">
        {this.props.assignedCard ? (
          <div className="box">
            <div className="column">
              <h2>Your card today</h2>
              <Card
                kind={this.props.assignedCard.kind}
                text={this.props.assignedCard.text}
              />
            </div>
            <div className="column">
              <h2>Your response</h2>
              <p>
                Select a colour for the card, then click the card to respond.
              </p>
              <Choice
                choices={this.choices}
                name="nextKind"
                onSelect={this.onSelect}
              />
              <div className="blank"> </div>
              <p className="caption no-margin">
                Write no more than 30 characters.
              </p>
              <p className="caption no-margin">
                You cannot change your response once submitted.
              </p>
              <div className="blank"> </div>
              <InputCard kind={this.state.nextKind} getText={this.getText} />
              {this.props.respondError && (
                <React.Fragment>
                  <div className="blank"></div>
                  <Error message={this.props.respondError.message} />
                </React.Fragment>
              )}
              <p className="caption link">How to respond</p>
              <Button
                className="grid-item"
                name="Submit"
                onClick={this.onClick}
                disabled={this.props.respondStarted}
              />
            </div>
          </div>
        ) : (
          <p>There's no card for you today yet</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.auth.loggedInUser,
    respondError: state.today.respondError,
    respondStarted: state.today.respondStarted,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    validateError: (errorMsg) => dispatch(validateError(errorMsg)),
    resetError: () => dispatch(resetError()),
    respondWith: (kind, text) => dispatch(respondWith(kind, text)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Today);
