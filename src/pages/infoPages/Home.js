import React from "react";

import { NavLink } from "react-router-dom";
import Button from "../../components/Button";

import "../BasePage.css";

export default function Home() {
  return (
    <div className="page">
      <h2>Discover the wonderful world of programming, with cards</h2>
      <NavLink to="/register">
        <Button name="Register now" />
      </NavLink>
    </div>
  );
}
