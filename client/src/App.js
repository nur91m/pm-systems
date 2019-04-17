import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import WeeklyReportGrid from './components/WeeklyReportGrid/WeeklyReportGrid';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Projects from './components/Projects/Projects';
import Login from './components/Auth/Login';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import jwt_decode from 'jwt-decode';


//Check for token
if(localStorage.jwtToken){
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
    window.location.href = '/';
  }
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
