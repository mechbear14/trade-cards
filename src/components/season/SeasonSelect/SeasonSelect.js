import React, { useState } from "react";

import "./SeasonSelect.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";

/**
 * @param {*} seasons A list of seasons to select from
 * @param {*} selected The selected season
 * @param {*} onSelect Function to fire when a selection is made
 */

export default function SeasonSelect(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const onClick = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const onSelect = (season) => {
    setDropdownOpen(false);
    props.onSelect(season);
  };

  return (
    <div className="season-select">
      <div
        className={`select-box ${props.seasons.length < 1 ? "disabled" : ""}`}
      >
        <div className="selected">
          {props.selected ? (
            <React.Fragment>
              <div className="selected-label">{props.selected.label}</div>
              <div className="selected-title">{props.selected.title}</div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="selected-label"></div>
              <div className="selected-title">No season available</div>
            </React.Fragment>
          )}
        </div>
        <button
          className="dropdown-button"
          data-testid="dropdown-button"
          onClick={onClick}
          disabled={props.seasons.length < 1}
        >
          <FontAwesomeIcon icon={faChevronCircleDown} />
        </button>
      </div>
      {dropdownOpen && (
        <div className="dropdown">
          {props.seasons.map((season) => (
            <div
              className="dropdown-list-item"
              key={season.label}
              onClick={() => onSelect(season)}
            >
              <div className="dropdown-label">{season.label}</div>
              <div className="dropdown-title">{season.title}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
