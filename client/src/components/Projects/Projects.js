import React, { Component } from "react";
import Popup from "reactjs-popup";
import "./Projects.css";
import AddProject from "./AddProject/AddProject";
import {createProject} from "../../actions/projectActions"
import { connect } from "react-redux";

class Projects extends Component {
    constructor() {
        super();
        this.state = {
          orderNumber: "",
          projectName: "",
          disciplines: [],
          isModalOpen: false
        };
    }
    
    addProject = (props) => {
      this.props.createProject(props)
    }
    

  render() {
    

    return (
      <div className="content">
        <div className="container projects">
          <div className="projects-row">
            <div className="project">
              <a href="/weekly/7815" className="btn project__btn first">
                <div className="project-number">7815</div>
                <div className="project-desc">
                  Строительство универсальной школы на 540 мест с центром
                  детского развития на 55 мест в г. Алматы
                </div>
              </a>
            </div>
            <div className="project">
              <a href="/weekly/6829-2018" className="btn project__btn second">
                <div className="project-number">6829-2018</div>
                <div className="project-desc">
                  Строительство универсальной школы на 540 мест с центром
                  детского развития на 55 мест в г. Алматы
                </div>
              </a>
            </div>
            <div className="project">
              <a href="#" className="btn project__btn third">
                <div className="project-number">8754</div>
                <div className="project-desc">
                  Строительство универсальной школы на 540 мест с центром
                  детского развития на 55 мест в г. Алматы
                </div>
              </a>
            </div>
            <div className="project">
              <a href="#" className="btn project__btn fourth">
                <div className="project-number">8754 - 9658</div>
                <div className="project-desc">
                  Строительство универсальной школы на 540 мест с центром
                  детского развития на 55 мест в г. Алматы
                </div>
              </a>
            </div>
            <div className="project">
              <a href="#" className="btn project__btn fifth">
                <div className="project-number">8754</div>
                <div className="project-desc">
                  Строительство универсальной школы на 540 мест с центром
                  детского развития на 55 мест в г. Алматы
                </div>
              </a>
            </div>
            <AddProject addProject={this.addProject.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { createProject }
)(Projects);
