import React from "react";

import Spinner from "../Spinner/Spinner";

import "./Loading.css";

export default function Loading() {
  return (
    <div className="loading">
      <Spinner fontSize={"2rem"} /> Loading
    </div>
  );
}
