import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCustomReportsToBeVerified } from "../../actions/reportActions";
import CustomReportCheck from "../CustomReportCheck/CustomReportCheck";


export class ReportCheck extends Component {

  constructor(){
    super();
    this.state = {customReport: {}}
  }

  componentDidMount() {
    this.props.getCustomReportsToBeVerified();    
  }

  componentWillReceiveProps(nextProps) {
    const users = Object.keys(nextProps.customReports);
    this.users = users.map(user => (
      <li key = {user} onClick={this.userClicked.bind(this, user)}>{user}</li>
    ))
  }

  // Handle user clicked
  userClicked = (user) => {
    console.log(this.props);
       
    this.setState({customReport: this.props.customReports[user][0]})
  }

  render() {
    return (
      <div>
        <div className="left">
          <p>Отчеты исполнителей</p>
          <ul>
            {this.users}            
          </ul> 
          <CustomReportCheck customReport={this.state.customReport} />         
        </div>
        <div className="right"></div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.verifingReport.users,
  customReports: state.verifingReport.customReports
});

export default connect(
  mapStateToProps, {getCustomReportsToBeVerified}
)(ReportCheck);
