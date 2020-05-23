import React from "react";

import NavBar from "./components/NavBar";

import Home from "./pages/infoPages/Home";
import HowToPlay from "./pages/infoPages/HowToPlay";

import Login from "./pages/Login";
import Register from "./pages/Register";
import History from "./pages/History";
import ViewConnection from "./pages/ViewConnection";
import TodayBoard from "./pages/TodayBoard";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/today" component={TodayBoard} />
          <Route path="/history" component={History} />
          <Route path="/card/:id" component={ViewConnection} />
          <Route path="/how-to-play" component={HowToPlay} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
