import React, { Component } from "react";
import Popup from "reactjs-popup";
import "./AddProject.css";
import isEmpty from "../../../validation/is-empty";
import disciplineModule from "./disciplines";

export default class AddProject extends Component {
  constructor() {
    super();

    this.state = {
      orderNumber: "",
      projectName: "",
      disciplines: disciplineModule(),
      isOpen: false,
      error: { orderNumber: false, projectName: false }
    };
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    if (
      this.state.error[e.target.name] &&
      isEmpty(this.state[[e.target.name]])
    ) {
      this.setState({ error: { ...this.state.error, [e.target.name]: false } });
    }
  };

  onSubmit = () => {
    if (isEmpty(this.state.orderNumber) || isEmpty(this.state.projectName)) {
      this.setState({
        error: {
          orderNumber: isEmpty(this.state.orderNumber),
          projectName: isEmpty(this.state.projectName)
        }
      });
      return;
    }

    const disciplines = [];
    this.state.disciplines.forEach(discipline => {
      if (discipline.isSelected) {
        disciplines.push(discipline.name);
      }
    });
    this.props.addProject({
      orderNumber: this.state.orderNumber,
      projectName: this.state.projectName,
      disciplines: disciplines
    });

    this.modalClose();
  };
  modalOpen = () => {
    this.setState({
      disciplines: disciplineModule(),
      plorderNumber: "",
      projectName: "",
      error: { orderNumber: false, projectName: false },
      isOpen: true
    });
  };

  modalClose = () => {
    this.setState({ isOpen: false });
  };

  onSelect = disciplineIndex => {
    var disciplines = this.state.disciplines;
    disciplines[disciplineIndex].isSelected = !disciplines[disciplineIndex]
      .isSelected;
    this.setState({ disciplines: disciplines });
  };

  render() {
    return (
      <Popup
        trigger={
          <div className="project col-md-3 p-2 d-table">
            <div className="btn px-1 w-100 h-100 btn-add d-table-cell align-middle">
              <div className="add-icon">
                <h1>
                  <i class="fas fa-plus-circle" />
                </h1>
              </div>
            </div>
          </div>
        }
        contentStyle={{ width: "600px" }}
        open={this.state.isOpen}
        onOpen={this.modalOpen.bind(this)}
        onClose={this.modalClose.bind(this)}
        closeOnDocumentClick
        modal
      >
        <div className="add-project-content">
          
            <div className="d-table" style={{ height: "50px", width: "100%",background: "#11539D", fontSize:"20px" }}>
              <span className="text-white d-table-cell align-middle">
               Добавить проект
              </span>
            </div>
          

          <div className="container">
            <div className="row mt-3">
              <div className="col-sm-4 d-flex justify-content-start">
                <p>Номер заказа</p>
              </div>
              <div className="col-sm-3 d-flex justify-content-start">
                <input
                  autoComplete="off"
                  className={
                    !this.state.error.orderNumber
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  type="text"
                  name="orderNumber"
                  onChange={this.onInputChange.bind(this)}
                  value={this.state.orderNumber}
                />
              </div>
            </div>

            <div className="row my-2">
              <div className="col-sm-4 d-flex justify-content-start">
                <p>Название проекта</p>
              </div>
              <div className="col-sm-8 d-flex justify-content-start w-350">
                <textarea
                  autoComplete="off"
                  className={
                    !this.state.error.projectName
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  rows="10"
                  type="text"
                  name="projectName"
                  onChange={this.onInputChange.bind(this)}
                  value={this.state.projectName}
                />
              </div>
            </div>
            <div className="row my-4">
              <div className="col-sm-4 d-flex justify-content-start">
                <p>Разделы</p>
              </div>
              <div className="col-sm-8 d-flex justify-content-start">
                <div className="row">
                  {this.state.disciplines.map((discipline, index) => {
                    return (
                      <div className="discipline col-sm-6 d-flex justify-content-start">
                        <div
                          className="discipline-icon mx-2"
                          onClick={this.onSelect.bind(this, index)}
                        >
                          <div
                            className={
                              !discipline.isSelected
                                ? "checked"
                                : "checked visible text-success"
                            }
                          >
                            <i className="fas fa-check" />
                          </div>
                          <div
                            className={
                              discipline.isSelected
                                ? "unchecked"
                                : "unchecked visible text-danger"
                            }
                          >
                            <i className="fas fa-times" />
                          </div>
                        </div>

                        <div
                          className="discipline-name"
                          onClick={this.onSelect.bind(this, index)}
                        >
                          {discipline.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="row justify-content-center mb-3">
              <button
                className="mx-3 btn btn-primary"
                onClick={this.onSubmit.bind(this)}
              >
                Добавить
              </button>
              <button
                className="mx-3 btn btn-danger"
                onClick={this.modalClose.bind(this)}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      </Popup>
    );
  }
}
