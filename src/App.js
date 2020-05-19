import React from 'react';

import NavBar from "./components/NavBar";
import Today from "./pages/Today";

import './App.css';

class App extends React.Component{
  render(){
    return(
      <React.Fragment>
      <NavBar name="ThunderBear"/>
      <Today />
      </React.Fragment>
    );
  }
}

export default App;
