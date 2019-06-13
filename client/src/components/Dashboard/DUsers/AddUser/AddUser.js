import React, { Component } from "react";
import Popup from "reactjs-popup";
import "./AddUser.css";
import isEmpty from "../../../../validation/is-empty";

export default class AddUser extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      lastName: "",
      email: "",
      password: "",
      position: "",
      role: "",
      discipline: "",
      avatar: ""
    };
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  modalOpen = () => {
    this.setState({
      id: this.props.userData._id,
      name: this.props.userData.name,
      lastName: this.props.userData.lastName,
      email: this.props.userData.email,
      password: this.props.userData.password,
      position: this.props.userData.position,
      role: this.props.userData.role,
      discipline: this.props.userData.discipline,
      avatar: this.props.userData.avatar,
      open: true
    });
  };

  modalClose = () => {
    this.setState({ ...this.state, open: false });
  };

  close = () => {
    this.setState({ ...this.state, open: false });
  };

  submit = () => {
    let userData = this.state;
    delete userData.open;
    this.props.updateUser(userData);
    this.close();
  };

  render() {
    return (
      <Popup
        trigger={
          <button>
            <i className="fas fa-pencil-alt text-success" />
          </button>
        }
        contentStyle={{ width: "400px" }}
        onOpen={this.modalOpen.bind(this)}
        onClose={this.modalClose.bind(this)}
        open={this.state.open}
        modal
        closeOnDocumentClick
      >
        <div className="add-user-content">
          <div className="container p-3">
            <div className="row">
              <div className="col-sm-3 d-flex justify-content-start align-self-center">
                <div>Фамилия</div>
              </div>
              <div className="col-sm-9 d-flex justify-content-start">
                <input
                  className="form-control"
                  autoComplete="off"
                  type="text"
                  name="lastName"
                  onChange={this.onInputChange.bind(this)}
                  value={this.state.lastName}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3 d-flex justify-content-start align-self-center">
                <div>Имя</div>
              </div>
              <div className="col-sm-9 d-flex justify-content-start">
                <input
                  className="form-control"
                  autoComplete="off"
                  type="text"
                  name="name"
                  onChange={this.onInputChange.bind(this)}
                  value={this.state.name}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3 d-flex justify-content-start align-self-center">
                <div>Должность</div>
              </div>
              <div className="col-sm-9 d-flex justify-content-start">
                <textarea
                  className="form-control"
                  autoComplete="off"
                  type="text"
                  name="position"
                  onChange={this.onInputChange.bind(this)}
                  value={this.state.position}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3 d-flex justify-content-start align-self-center">
                <div>Раздел</div>
              </div>
              <div className="col-sm-9 d-flex justify-content-start">
                <input
                  className="form-control"
                  autoComplete="off"
                  type="text"
                  name="discipline"
                  onChange={this.onInputChange.bind(this)}
                  value={this.state.discipline}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3 d-flex justify-content-start align-self-center">
                <div>Роль</div>
              </div>
              <div className="col-sm-9 d-flex justify-content-start">
                <select
                  className="form-control"
                  name = "role"
                  onChange={this.onInputChange.bind(this)}                  
                  value={this.state.role}
                >
                  <option value="PmManager">Менеджер УП</option>
                  <option value="Chief">Главный специалист</option>
                  <option value="Employee">Исполнитель</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3 d-flex justify-content-start align-self-center">
                <div>Почта</div>
              </div>
              <div className="col-sm-9 d-flex justify-content-start">
                <input
                  className="form-control"
                  autoComplete="off"
                  type="text"
                  name="email"
                  onChange={this.onInputChange.bind(this)}
                  value={this.state.email}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3 d-flex justify-content-start align-self-center">
                <div>Пароль</div>
              </div>
              <div className="col-sm-9 d-flex justify-content-start">
                <input
                  className="form-control"
                  autoComplete="off"
                  type="text"
                  name="password"
                  onChange={this.onInputChange.bind(this)}
                  value={this.state.password}
                />
              </div>
            </div>
            <div className="row justify-content-center mt-3">
              <button
                className="mx-3 btn btn-primary"
                onClick={this.submit.bind(this)}
              >
                Применить
              </button>
              <button
                className="mx-3 btn btn-danger"
                onClick={this.close.bind(this)}
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
