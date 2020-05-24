import React from "react";

import Card from "../components/card/Card";
import InputCard from "../components/card/InputCard";
import Button from "../components/Button";
import Choice from "../components/Choice";
import Error from "../components/Error";

import "./Today.css";
import { connect } from "react-redux";
import { respond } from "../store/actions/CardActions";

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
      nextKind: "blue",
      nextText: "",
      errors: [],
    };
  }

  onClick = () => {
    let errors = [];
    if (this.state.nextText.length === 0) {
      errors.push({ message: "Your response cannot be blank" });
    }
    if (errors.length === 0) {
      let card = {
        kind: this.state.nextKind,
        text: this.state.nextText,
      };
      this.props.respond(card);
    } else {
      this.setState({
        errors,
      });
    }
    console.log(this.state);
  };

  onSelect = (e) => {
    this.setState({
      nextKind: e.target.value,
    });
  };

  getText = (text) => {
    if (this.state.errors.length > 0) {
      this.setState({
        errors: [],
      });
    }
    this.setState({
      nextText: text,
    });
  };

  render() {
    let errors = this.state.errors.slice();
    if (this.props.fetchCardError) errors.push(this.props.fetchCardError);
    if (this.props.respondError) errors.push(this.props.respondError);
    return (
      <div className="page today">
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
            <InputCard kind={this.state.nextKind} getText={this.getText} />
            {errors[0] &&
              errors.map((error, index) => (
                <React.Fragment key={index}>
                  <div className="blank"></div>
                  <Error message={error.message} />
                </React.Fragment>
              ))}
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
  return {
    loggedInUser: state.auth.loggedInUser,
    fetchError: state.card.fetchCardError,
    respondError: state.card.respondError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    respond: (card) => dispatch(respond(card)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Today);
