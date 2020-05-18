import React from 'react';

import Today from './pages/Today';
import History from './pages/History';

import './App.css';

class App extends React.Component{
  render(){
    return(
      <React.Fragment>
      <Today />
      <History />
      </React.Fragment>
    );
  }
}

export default App;
