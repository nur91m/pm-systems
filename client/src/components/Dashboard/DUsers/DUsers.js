import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getUsers,
  clearUsersFromStore,
  removeUser
} from "../../../actions/authActions";

export class DUsers extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentWillMount() {
    this.props.getUsers();
  }

  componentWillReceiveProps(props) {
    const users = props.users.sort((a, b) => {
      if (a.lastName < b.lastName) {
        return -1;
      } else if (a.lastName === b.lastName) {
        return 0;
      }
      return 1;
    });

    this.setState({ ...this.state, users });
  }

  componentWillUnmount() {
    this.props.clearUsersFromStore();
  }

  editUser = id => {

  };
  removeUser = id => {
    this.props.removeUser(id);
    const users = this.state.users.filter(user => {
        if(user._id === id) {
            return false;
        } 
        return true;
    })
    this.setState({...this.state, users});    
  };

  render() {
    return (
      <div className="container" style={{minWidth: "1000px"}}>
        <div className="row justify-content-center my-3">
          <h3>Список пользователей</h3>
        </div>
        <div className="row justify-content-center">
          <table>
            <tbody>
              {this.state.users.length > 0 ? (
                <tr>
                  <th>Фамилия</th>
                  <th>Имя</th>
                  <th>Должность</th>
                  <th>Раздел</th>
                  <th>Роль</th>
                  <th>Почта</th>
                  <th>Пароль</th>
                  <th>Редактировать</th>
                </tr>
              ) : (
                <tr />
              )}
              {this.state.users.map(user => (
                <tr key={user._id}>
                  <td>{user.lastName}</td>
                  <td>{user.name}</td>
                  <td>{user.position}</td>
                  <td>{user.discipline}</td>
                  <td>{user.role}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>
                    <button onClick={this.editUser.bind(this, user._id)}>
                      Edit
                    </button>
                    <button onClick={this.removeUser.bind(this, user._id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.auth.allUsers
});

export default connect(
  mapStateToProps,
  { getUsers, clearUsersFromStore, removeUser }
)(DUsers);
