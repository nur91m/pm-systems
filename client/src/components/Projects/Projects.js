import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProjects } from "../../actions/projectActions";

export class Projects extends Component {
  componentDidMount() {
    this.props.getProjects();
    console.log(this.props.project);
  }

  componentWillReceiveProps(nextProps) {
    this.projectList = nextProps.project.map(project => (
      <li key={project.name}>
        <Link
          to={{
            pathname: `/weekly/${project.orderNumber}`,
            projectId: project._id
          }}
        >
          {project.name}
        </Link>
      </li>
    ));
  }

  render() {
    return (
      <div>
        <ul>{this.projectList}</ul>
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
