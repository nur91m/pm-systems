import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProjects } from "../../actions/projectActions";
import WeeklyReportGrid from "../WeeklyReportGrid/WeeklyReportGrid";
import CustomReportGrid from "../CustomReportGrid/CustomReportGrid";

export class CustomReportList extends Component {
  componentDidMount() {
    this.props.getProjects();    
  }

  render() {
    return (
      <div>
        <Link to="/custom">Ежемесячные отчеты</Link>        
      </div>
    );
  }
}

const mapStateToProps = state => ({
  project: state.project
});

export default connect(
  mapStateToProps,
  { getProjects }
)(Projects);
