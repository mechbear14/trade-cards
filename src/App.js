import React from 'react';

import NavBar from "./components/NavBar";
// import Today from "./pages/Today";
// import TodayComplete from "./pages/TodayComplete";
// import ViewConnection from "./pages/ViewConnection";
import HowToPlay from "./pages/infoPages/HowToPlay";

import './App.css';

class App extends React.Component{
  render(){
    return(
      <React.Fragment>
      <NavBar/>
      <HowToPlay />
      </React.Fragment>
    );
  }
}

export default App;
