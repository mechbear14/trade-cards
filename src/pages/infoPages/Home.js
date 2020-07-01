import React from "react";

import { NavLink } from "react-router-dom";
import Button from "../../components/input/Button/Button";

import "../BasePage.css";

export default function Home() {
  return (
    <div className="page">
      <h2>Discover the wonderful world of programming, with cards</h2>
      <NavLink to="/register">
        <Button text="Register now" />
      </NavLink>
    </div>
  );
}
