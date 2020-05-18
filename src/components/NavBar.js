import React from "react";

function NavBar(props){
  return(
    <nav>
      <button className="menu-btn"></button>
      <span>{props.name}</span>
      <ul>
        <li><a>Today</a></li>
        <li><a>My cards</a></li>
        <li><a>Log out</a></li>
      </ul>
    </nav>
  );
}

export default NavBar;
