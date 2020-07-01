import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./SearchBox.css";

/**
 * @param propName variable name in an external state to set
 * @param value current value in the search box
 * @param onChange function that fires when the search content changes
 */

export default function SearchBox(props) {
  const [barClass, setBarClass] = useState("top-bar");
  const onFocus = () => {
    setBarClass("top-bar typing");
  };
  const onBlur = () => {
    setBarClass("top-bar");
  };
  const onSearch = () => {
    if (props.value) {
      props.onSearch();
    }
  };
  return (
    <div className="search-box">
      <input
        type="text"
        id={props.propName}
        value={props.value}
        onChange={props.onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        data-testid="search-box"
      />
      <div className="bottom-bar"></div>
      <div className={barClass} data-testid="search-bar"></div>
      <div
        className="search-button"
        data-testid="search-button"
        onClick={onSearch}
      >
        <FontAwesomeIcon icon={faSearch} />
      </div>
    </div>
  );
}
