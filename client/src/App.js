import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import WeeklyReportGrid from './components/WeeklyReportGrid/WeeklyReportGrid';
import './App.css';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import store from './store';




class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
        <div className="App">
        <Route path="/weekly/" component={WeeklyReportGrid} />
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
