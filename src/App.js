import React, { useState } from "react";

import { ConfirmEmail } from "./pages/auth/register/ConfirmEmail";
import { RegisterForm } from "./pages/auth/register/RegisterForm";
import { UsePrev } from "./pages/auth/register/UsePrev";
import { Validate } from "./pages/auth/register/Validate";
import { Register } from "./pages/auth/register/Register";

// import Home from "./pages/infoPages/Home";
// import HowToPlay from "./pages/infoPages/HowToPlay";

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import History from "./pages/History";
// import ViewConnection from "./pages/ViewConnection";
// import TodayBoard from "./pages/TodayBoard";

// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import "./pages/BasePage.css";
import TempNavBar from "./pages/TempNavBar";

export default function App() {
  const [knowResult, setKnowResult] = useState(true);
  return (
    <React.Fragment>
      <TempNavBar />
      <ConfirmEmail />
      <RegisterForm />
      <UsePrev
        previousCallSign="ThunderBear"
        onYes={() => {
          alert("You said yes");
          setKnowResult(false);
        }}
        onNo={() => {
          alert("You said no");
          setKnowResult(false);
        }}
        knowResult={knowResult}
      />
      <Validate uid="1234" callSign="RoaringSquirrel" />
      <Register />
    </React.Fragment>
    // <Router>
    //   <TempNavBar />
    //   <Switch>
    //     <Route path="/register" component={Register} />
    //     <Route path="/login" component={Login} />
    //     <Route path="/today" component={TodayBoard} />
    //     <Route path="/history" component={History} />
    //     <Route path="/card" component={ViewConnection} />
    //     <Route path="/how-to-play" component={HowToPlay} />
    //     <Route path="/" component={Home} />
    //   </Switch>
    // </Router>
  );
}
