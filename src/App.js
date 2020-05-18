import React from 'react';

import NavBar from "./components/NavBar";
import ViewConnection from "./pages/ViewConnection";
import './App.css';

class App extends React.Component{
  render(){
    return(
      <React.Fragment>
      <NavBar name="ThunderBear"/>
      <ViewConnection />
      </React.Fragment>
    );
  }
}

export default App;
