import React, { Component } from "react";
import { connect } from "react-redux";
import { createProject, getProjects } from "../../../actions/projectActions";

import "./ProjectPortfolio.css";

export class ProjectPortfolio extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      isModalOpen: false
    };    
  }

  componentDidMount() {
    this.props.getProjects();
  }

  componentWillReceiveProps(props) {
    this.setState({ projects: props.projects });
  }

  projectClicked = (orderNumber, index) => {
    this.props.history.push(`/dashboard/projects/${orderNumber}`, {currentProject: this.state.projects[index]})
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <h4>Портфель проектов</h4>
        </div>

        <div className="row justify-content-start btn-groups">
          <p>Текущие</p>
          <p>Арихивные</p>
        </div>
        <div className="row justify-content-center projects p-2">

        {this.state.projects.map((project,index) => (
            <div
            className="row project h-100 w-100 py-1"
            onClick={this.projectClicked.bind(this,project.orderNumber, index)}
          >
            <div className="col-md-2">
              <p className="orderNumber">{project.orderNumber}</p>
            </div>
            <div className="col-md-10">
              <p className="projectNumber text-left">
                {project.name}
              </p>
            </div>
          </div>
        ))}

          
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.project.projects
});

export default connect(
  mapStateToProps,
  { createProject, getProjects }
)(ProjectPortfolio);
