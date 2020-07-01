import React, { useRef, useState } from "react";

import "./CardInput.css";

export default function CardInput(props) {
  const hiddenBox = useRef(null);
  const [height, setHeight] = useState(0);
  const [top, setTop] = useState(0);
  const onChange = (event) => {
    props.onChange(event);
    setHeight(hiddenBox.current.offsetHeight);
    setTop(Math.max(0, (120 - height) / 2));
  };
  return (
    <div className="card-input">
      <label htmlFor="card-text">
        <div className={`card ${props.card.kind}`}>
          <textarea
            id="card-text"
            name={props.propName}
            className={`textarea ${props.card.kind}`}
            onChange={onChange}
            placeholder="Card text"
            data-testid="card-input"
            value={props.card.text}
            style={{ height, top }}
          ></textarea>
        </div>
        <div className="card hidden">
          <span className="sample" ref={hiddenBox}>
            A{props.card.text}
          </span>
        </div>
      </label>
    </div>
  );
}
