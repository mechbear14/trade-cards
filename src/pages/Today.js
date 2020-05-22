import React from "react";

import Card from "../components/card/Card";
import InputCard from "../components/card/InputCard";
import Button from "../components/Button";
import Choice from "../components/Choice";
import Error from "../components/Error";

import "./Today.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Today extends React.Component {
  choices = [
    {
      name: "blue",
      text: "Application (blue card)",
      value: "blue",
    },
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
      assignedCard: {
        kind: "blue",
        text: "Distributed messaging system",
      },
      nextKind: "blue",
      error: false,
    };
  }

  onClick() {
    alert("Roar! You've found me!");
  }

  onSelect = (e) => {
    this.setState({
      nextKind: e.target.value,
    });
  };

  render() {
    if (!(this.props.loggedInUser && this.props.loggedInUser.userId)) {
      return <Redirect to="/" />;
    }
    return (
      <div className="page today">
        <div className="box">
          <div className="column">
            <h1>Welcome, {this.props.loggedInUser.callSign}</h1>
            <h2>Your card today</h2>
            <Card
              kind={this.state.assignedCard.kind}
              text={this.state.assignedCard.text}
            />
          </div>
          <div className="column">
            <h2>Your response</h2>
            <p>Select a colour for the card, then click the card to respond.</p>
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
            <InputCard kind={this.state.nextKind} />
            {this.state.error && (
              <React.Fragment>
                <div className="blank"></div>
                <Error message="Error" />
              </React.Fragment>
            )}
            <p className="caption link">How to respond</p>
            <Button
              className="grid-item"
              name="Submit"
              onClick={this.onClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { loggedInUser: state.auth.loggedInUser };
};

export default connect(mapStateToProps)(Today);
