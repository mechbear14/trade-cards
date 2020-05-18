import React from 'react';

import NavBar from "./components/NavBar";
import TodayComplete from './pages/TodayComplete';

import './App.css';

class App extends React.Component{
  render(){
    return(
      <React.Fragment>
      <NavBar name="ThunderBear"/>
      <TodayComplete />
      </React.Fragment>
    );
  }
}

export default App;
