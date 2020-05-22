import React from "react";

import { NavLink, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

import "./NavBar.css";
import { connect } from "react-redux";
import { logout } from "../store/actions/AuthActions";

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

  onLogout = (e) => {
    e.preventDefault();
    this.props.logout();
    this.props.history.push("/");
  };

  render() {
    let icon = this.state.menuOpened ? faTimes : faBars;
    let navItems =
      this.props.loggedInUser && this.props.loggedInUser.userId ? (
        <React.Fragment>
          <li>
            <NavLink to="/today">Today</NavLink>
          </li>
          <li>
            <NavLink to="/history">My cards</NavLink>
          </li>
          <li>
            <a href="/" onClick={this.onLogout}>
              Log out
            </a>
          </li>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <li>
            <NavLink to="/login">Log in</NavLink>
          </li>
        </React.Fragment>
      );
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
            {navItems}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return { loggedInUser: state.auth.loggedInUser };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
