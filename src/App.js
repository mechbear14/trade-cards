import React from "react";

import NavBar from "./components/NavBar";

import Home from "./pages/infoPages/Home";
import HowToPlay from "./pages/infoPages/HowToPlay";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Today from "./pages/Today";
import TodayComplete from "./pages/TodayComplete";
import History from "./pages/History";
import ViewConnection from "./pages/ViewConnection";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/today">
            <Today />
          </Route>
          <Route path="/today-complete">
            <TodayComplete />
          </Route>
          <Route path="/history">
            <History />
          </Route>
          <Route path="/card/:id">
            <ViewConnection />
          </Route>
          <Route path="/how-to-play">
            <HowToPlay />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
