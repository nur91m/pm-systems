import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import WeeklyReportGrid from './components/WeeklyReportGrid/WeeklyReportGrid';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Projects from './components/Projects/Projects';
import Login from './components/Auth/Login';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';
import jwt_decode from 'jwt-decode';


//Check for token
if(localStorage.jwtToken){
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  console.log(decoded);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <div className="container">
              <Route exact path="/" component={Login}/>
              <Route exact path="/projects" component={Projects}/>
              <Route exact path="/weekly/:projectNumber" component={WeeklyReportGrid} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
