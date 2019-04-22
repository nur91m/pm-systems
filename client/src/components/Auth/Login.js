import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import './Login.css';
import logo from './img/Logo.svg'

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: []
    };
  }

  componentWillReceiveProps(props) {
    if (props.auth.isAuthenticated) {
      window.location.href = "/";
    }
  }

  login = () => {
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="Login">
        <div className="Login__left">
          <h3>Авторизация</h3>
          <div className="Login__txt">
            Lorem Ipsum - это текст-"рыба", часто используемый в печати и
            вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на
            латинице с начала XVI века. В то время некий безымянный печатник
            создал большую коллекцию размеров и форм шрифтов, используя
          </div>
        </div>
        <div className="Login__right">
          <div className="Login__img">
            <img src={logo} alt="" />
          </div>
          <div className="Login__inputs">
            
              <input
                className="Login__input"
                name="email"
                placeholder="Пользователь"
                onChange={this.onChange.bind(this)}
                value={this.state.email}
              />
              <input
                className="Login__input"
                name="password"
                placeholder="Пароль"
                onChange={this.onChange.bind(this)}
                value={this.password}
              />
              <div className="Login__btns">
                <button
                  className="Login__btn btn"
                  onClick={this.login.bind(this)}
                >
                  Войти
                </button>
                <a href="#">Забыли пароль?</a>
              </div>
            
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
