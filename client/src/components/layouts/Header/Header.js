import React, { Component } from 'react';
import { connect } from "react-redux";
import './Header.css'
import logo from './img/Logo.svg'
import avatar from './img/Avatar.svg'

class Header extends Component {
    render() {
        const {user} = this.props.auth
        
            
            
      return (
          
        <header className="header">  
                <nav className="navbar navbar-expand-lg">
                    <a className="navbar-brand" href="#">
                        <img src={logo}/>
                    </a>
                    <div className="container" aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Главная</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Раздел</li>
                        </ol>
                    </div>
                    <div className="header__user">
                        
                            <a><img src={avatar}/>{user.name + ' ' + user.lastName}</a> 
                            
                    </div>
                </nav>
            </header>
      );
    }
  }
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(mapStateToProps,null)(Header);
  