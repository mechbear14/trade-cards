import React from "react";
import { connect } from "react-redux";

import Card from "../../components/card/Card/Card";
import ErrorBox from "../../components/decorations/ErrorBox/ErrorBox";
import Loading from "../../components/decorations/Loading/Loading";
import { CardWithCount } from "../../components/card/CardWithCount/CardWithCount";

import "./ViewConnection.css";

export const ViewConnection = (props) => {
  return (
    <div className="page view-connection">
      <div className="box">
        <div className="column">
          <h2>All connections to</h2>
          <Card card={props.current} />
        </div>
        <div className="column">
          {props.loadError && <ErrorBox error={props.loadError} />}
          {!props.knowResult && <Loading />}
          {props.knowResult &&
            props.connected &&
            props.connected.map((connected) => (
              <CardWithCount
                key={connected.id}
                card={connected}
                count={connected.count}
                onClick={props.onViewCard}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ViewConnection);
