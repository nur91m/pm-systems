import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import WeeklyReportGrid from './components/WeeklyReportGrid/WeeklyReportGrid';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <Route path="/weekly/" component={WeeklyReportGrid} />
        </div>
      </Router>
    );
  }
}

export default App;
