import React, { Component } from "react";
import Popup from "reactjs-popup";
import "./Projects.css";

class Projects extends Component {
    constructor() {
        super();
        this.state = {
            orderNumber: "",
            projectName: "",
            disciplines: []            
          };
    }
    

    onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const Modal = () => (
      <Popup
        trigger={
          <div className="project">
            <div className="btn project__btn second">
              <div className="project-number">6829-2018</div>
              <div className="project-desc">Добавить проект</div>
            </div>
          </div>
        }
        modal
        closeOnDocumentClick
      >
        <div>
          <p>Номер заказа</p>
          <input type="text" name="orderNumber" onChange={this.onInputChange.bind(this)} value={this.state.orderNumber} />
          <p>Название проекта</p>
          <input type="text" name="projectName" onChange={this.onInputChange.bind(this)} value={this.state.projectName} />
          <p>Разделы</p>
          <div>
            <div className="discipline">
              <div className="discipline-icon" />
              <div className="discipline-name">MasterPlan</div>
            </div>
            <div className="discipline">
              <div className="discipline-icon" />
              <div className="discipline-name">АР</div>
            </div>
            <div className="discipline">
              <div className="discipline-icon" />
              <div className="discipline-name">КЖиКМ</div>
            </div>
            <div className="discipline">
              <div className="discipline-icon" />
              <div className="discipline-name">ТХ</div>
            </div>
            <div className="discipline">
              <div className="discipline-icon" />
              <div className="discipline-name">ОВиК</div>
            </div>
          </div>
          <button>Применить</button>
          <button>Отмена</button>
        </div>
      </Popup>
    );

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
            <Modal />
          </div>
        </div>
      </div>
    );
  }
}

export default Projects;
