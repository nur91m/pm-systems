import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { connect } from "react-redux";

import "./Dashboard.css";
import ProjectPortfolio from "../ProjectPortfolio/ProjectPortfolio";
import DCustomReports from "../DCustomReports/DCustomReports";
import DUsers from "../DUsers/DUsers";
import DProject from "../DProject/DProject";

export class Dashboard extends Component {
  constructor() {
    super();

    this.isSidebarVisible = true;
  }

  openCloseNav = () => {
    if (this.isSidebarVisible) {
      document.getElementById("mySidebar").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
    } else {
      document.getElementById("mySidebar").style.width = "230px";
      document.getElementById("main").style.marginLeft = "230px";
    }
    this.isSidebarVisible = !this.isSidebarVisible;
  };

  render() {
    return (
      <div>
        <div id="mySidebar" className="sidebar">
          <div className="container">
            <div className="row justify-content-md-center logo my-3">
              <h1 className="text-white">LOGO</h1>
              <hr />
            </div>
            <div className="row justify-content-md-center mt-4">
              <h5
                className="font-weight-bold text-white text-center"
                style={{ whiteSpace: "nowrap" }}
              >
                Панель управления
              </h5>
            </div>
            <div className="row justify-content-md-center mt-5">
              <Link to="/dashboard/project-portfolio">Портфель проектов </Link>
              <hr />
              <Link to="/dashboard/custom-reports">Ежемесячные отчеты</Link>
              <hr />
              <Link to="/dashboard/users">Пользователи системы</Link>
              <hr />
            </div>
            <div className="avatar">
              <div className="row justify-content-around mt-5">
                <hr />
                <div className="profile">
                <img src="/img/avatars/avatar.svg" className="img-circle" />
                {this.props.auth.user.name + ' ' + this.props.auth.user.lastName }
                </div>
                
              </div>
            </div>
          </div>
        </div>

        <div id="main">
          <p className="openbtn" onClick={this.openCloseNav.bind(this)}>
            ☰
          </p>

          <Route
            exact
            path="/dashboard/project-portfolio"
            component={ProjectPortfolio}
          />
          <Route
            exact
            path="/dashboard/custom-reports"
            component={DCustomReports}
          />
          <Route exact path="/dashboard/users" component={DUsers} />
          <Route path="/dashboard/projects/:orderNumber" component={DProject} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(Dashboard);
