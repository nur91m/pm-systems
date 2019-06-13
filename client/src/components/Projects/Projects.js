import React, { Component } from "react";
import Popup from "reactjs-popup";
import "./Projects.css";
import AddProject from "./AddProject/AddProject";
import { createProject, getProjects } from "../../actions/projectActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { relative } from "path";

class Projects extends Component {
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

  addProject = props => {
    this.props.createProject(props);
  };


  render() {
    return (
      <div className="content projects-comp">
        <div className="container mt-3">
          <div className="row">
            {this.state.projects.map(project => (
                <div className="project col-md-3 p-2">
                  
                  <Link
                    to={`/weekly/${project.orderNumber}`}
                    className="btn px-1 w-100 h-100 border-2" style={{position:"relative"}}>
                    
                    
                    <div className="project-number font-weight-bold">{project.orderNumber}</div>
                    <div className="project-desc ">{project.name}</div>
                    <div className="line" style={{width: "100%", height:"7px", background: "#66CC66", position: "absolute", bottom: "0", left: "0", boxSizing:"border-box"}}/>
                  </Link>
                  
                </div>
              ))}

            <AddProject addProject={this.addProject.bind(this)} />
          </div>
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
)(Projects);
