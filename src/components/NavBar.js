import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

import "./NavBar.css";

class NavBar extends React.Component{
  constructor(props){
      super(props);
      this.state = {
        menuOpened: false
      }
  }

  componentDidMount(){
    window.addEventListener("resize", this.onResize);
  }

  componentWillUnmount(){
    window.removeEventListener("resize", this.onResize);
  }

  onResize = () => {
    if(window.innerWidth > 600){
      this.setState({
        menuOpened: false
      });
    }
  }

  onClick = () => {
    this.setState({
      menuOpened: !this.state.menuOpened
    });
  }

  render(){
    let icon = this.state.menuOpened ? faTimes : faBars;
    return(
      <nav>
        <div className="container">
          <button className="menu-btn" onClick={this.onClick}>
            <FontAwesomeIcon icon={icon} />
          </button>
          <span className={`${this.state.menuOpened ? "" : "hide"}`}>{this.props.name}</span>
          <ul className={`${this.state.menuOpened ? "" : "hide"}`}>
            <li><a href="https://github.io/mechbear14">Today</a></li>
            <li><a href="https://github.io/mechbear14">My cards</a></li>
            <li><a href="https://github.io/mechbear14">Log out</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
