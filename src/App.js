import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      message: "Roar! You've found me!"
    };
  }
  render(){
    return(
      <h1>{this.props.name} says {this.state.message}</h1>
    );
  }
}

export default App;
