import React from "react";

import Home from "./pages/infoPages/Home";
// import Home from "./pages/auth/Home";
import HowToPlay from "./pages/infoPages/HowToPlay";

import Login from "./pages/Login";
import Register from "./pages/Register";
import History from "./pages/History";
import ViewConnection from "./pages/ViewConnection";
import TodayBoard from "./pages/TodayBoard";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import TempNavBar from "./pages/TempNavBar";

class App extends React.Component {
  render() {
    return (
      <Router>
        <TempNavBar />
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/today" component={TodayBoard} />
          <Route path="/history" component={History} />
          <Route path="/card" component={ViewConnection} />
          <Route path="/how-to-play" component={HowToPlay} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
