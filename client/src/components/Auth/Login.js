import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

export class Login extends Component {
constructor(){
    super()
    this.state ={
        email: '',
        password: '',
        error: []
    }
}

componentWillReceiveProps(props){
    if(props.auth.isAuthenticated) {
        window.location.href = '/projects';
    }
}

    login = () => {
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData);       
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });        
    }


  render() {
    return (
      <div>
        <input name="email" type="text" placeholder="Enter email" onChange={this.onChange.bind(this)} value={this.state.email}/>
        <input name="password" type="password" placeholder="Enter password" onChange={this.onChange.bind(this)} value={this.password}/>
        <button onClick={this.login.bind(this)}>Login</button>
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, {loginUser})(Login)
