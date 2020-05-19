import React from 'react';

import NavBar from "./components/NavBar";
// import ViewConnection from "./pages/ViewConnection";
// import Login from "./pages/Login";
import Register from "./pages/Register";

import './App.css';

class App extends React.Component{
  render(){
    return(
      <React.Fragment>
      <NavBar name="ThunderBear"/>
      <Register />
      </React.Fragment>
    );
  }
}

export default App;
