import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import jwt_decode from "jwt-decode";

import Header from "./components/layouts/Header/Header";
import Projects from "./components/Projects/Projects"
import Login from "./components/Auth/Login";
import PrivateRoute from "./components/common/PrivateRoute";
import CustomReportGrid from "./components/CustomReportGrid/CustomReportGrid";

import WeeklyReportGrid from "./components/WeeklyReportGrid/WeeklyReportGrid";
import Home from "./components/Home/Home";
import ReportCheck from "./components/ReportCheck/ReportCheck";

//Check for token
if (localStorage.jwtToken) {
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <div className="app-context"> 
              <Route path="/" component={Header}/>
              <Switch>
                <PrivateRoute exact path="/" component={Home}/>
              </Switch>
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/projects" component={Projects} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/weekly/:projectNumber" component={WeeklyReportGrid}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/custom" component={CustomReportGrid}/>
              </Switch>
              <Switch>
              <PrivateRoute exact path="/check-report" component={ReportCheck}/>
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
