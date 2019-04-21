import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProjects } from "../../actions/projectActions";
import WeeklyReportGrid from "../WeeklyReportGrid/WeeklyReportGrid";
import CustomReportGrid from "../CustomReportGrid/CustomReportGrid";

export class Projects extends Component {
  componentDidMount() {
    this.props.getProjects();    
  }

  componentWillReceiveProps(nextProps) {

    // Create project items based on data from DB
    this.projectList = nextProps.project.map(project => (
      <li key={project.name}>
        <Link to={`/weekly/${project.orderNumber}`}>
          {project.name}
        </Link>
      </li>
    ));
  }

  render() {
    return (
      <div>
        <ul>{this.projectList}</ul> 
        <CustomReportGrid /> 
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
