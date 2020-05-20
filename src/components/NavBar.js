import React from "react";

import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

import "./NavBar.css";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpened: false,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  onResize = () => {
    if (window.innerWidth > 600) {
      this.setState({
        menuOpened: false,
      });
    }
  };

  onClick = () => {
    this.setState({
      menuOpened: !this.state.menuOpened,
    });
  };

  render() {
    let icon = this.state.menuOpened ? faTimes : faBars;
    return (
      <nav>
        <div className="container">
          <button className="menu-btn" onClick={this.onClick}>
            <FontAwesomeIcon icon={icon} />
          </button>
          <NavLink
            to="/"
            className={`${this.state.menuOpened ? "" : "hide"} span`}
          >
            Trade Cards
          </NavLink>
          <ul className={`${this.state.menuOpened ? "" : "hide"}`}>
            <li>
              <NavLink to="/how-to-play">How to play</NavLink>
            </li>
            <li>
              <NavLink to="/login">Log in</NavLink>
            </li>
            <li>
              <NavLink to="/today">Today</NavLink>
            </li>
            <li>
              <NavLink to="/history">My cards</NavLink>
            </li>
            <li>
              <NavLink to="/">Log out</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
