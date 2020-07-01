import React from "react";

import "./ScrollPage.css";

/**
 * @param {pages} props pages to scroll
 * @param {currentPageNumber} props page number to show
 */

export default function ScrollPage(props) {
  let boxStyle = {
    width: `calc(${props.pages.length} * 100%)`,
    transform: `translateX(calc(-${props.currentPageNumber} / ${props.pages.length} * 100%))`,
  };
  let pageStyle = {
    width: `calc(100% / ${props.pages.length})`,
  };
  return (
    <div className="scroll-page">
      <div className="scroll-page-box" style={boxStyle}>
        {props.pages &&
          props.pages.map((page, index) => (
            <div className="mini-page" key={index} style={pageStyle}>
              {page}
            </div>
          ))}
      </div>
    </div>
  );
}
