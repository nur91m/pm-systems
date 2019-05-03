import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import "./Home.css";

class Home extends Component {
  render() {
    const { user } = this.props.auth;

    return (
      <div className="container report">
        <div className="row">
          <div className="col-lg-10 report__title">
            <h3>Выберите отчет для заполнения</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 report-box monthly-report-box">
            <div>
              <Link
                to="/custom"
                className="btn report__btn monthly-report__btn"
              >
                ЕЖЕМЕСЯЧНЫЙ ОТЧЕТ О ПРОДЕЛАННОЙ РАБОТЕ
              </Link>
            </div>
          </div>
          <div className="col-lg-6 report-box weekly-report-box">
            <div>
              <Link
                to="/projects"
                className="btn report__btn weekly-report__btn"
              >
                ЕЖЕНЕДЕЛЬНЫЙ ОТЧЕТ ПО ПРОЕКТАМ
              </Link>
            </div>
          </div>
        </div>
        {user.role !== "Employee" && (
          <div>
            <div className="row">
              <div className="col-lg-10 report__title">
                <h3>Проверка отчета исполнителей</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 report-box confirm-report-box">
                <div>
                  <Link to="#" className="btn report__btn confirm-report__btn">
                    ПРОВЕРКА И ПОДТВЕРЖЕНИЕ ОТЧЕТА ИСПОЛНИТЕЛЯ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Home);
