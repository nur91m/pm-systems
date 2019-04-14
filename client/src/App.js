import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import WeeklyReportGrid from './components/WeeklyReportGrid/WeeklyReportGrid';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Projects from './components/Projects/Projects';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <div className="container">
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
