import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCustomReportsToBeVerified } from "../../actions/reportActions";
import CustomReportCheck from "../CustomReportCheck/CustomReportCheck";
import TreeView from "react-treeview";
import moment from "moment";
import "./ReportCheck.css"
const uuidv1 = require("uuid/v1");

export class ReportCheck extends Component {
  constructor() {
    super();
    this.state = { customReport: {}, treeData: [] };
  }

  componentDidMount() {
    this.props.getCustomReportsToBeVerified();
  }

  componentWillReceiveProps(nextProps) {
    const treeData = Object.keys(nextProps.customReports).map((user, index) => {
      const reports = nextProps.customReports[user];
      const dateNodes = reports.map((report, index) =>
          ({
            key: report._id,
            label: moment(report.date).locale("ru").format("ll"),
            selected: false            
          }));
      return {
        label: user,    
        nodes: dateNodes, 
        selected: false,
        collapsed: false
      };
    });
    this.setState({ treeData });
    console.log(treeData);
  }

  // Handle user clicked
  userClicked = props => {
    if (props.level === 1) {
      const id = props.key;
      const customReport = this.props.customReports[props.parent].filter(
        report => report._id === id
      )[0];

      const treeData = this.state.treeData.map((user,index)=> {
        if(user.label===props.parent) {
          const userData = user.nodes.map(date => {
            if(date.key === id){
              return {...date, selected: !date.selected}
            } else {
              return {...date, selected: false}
            }
          })
          return {...user, selected: false, nodes: userData};
        } else {
          return ({...user, nodes: user.nodes.map(date => ({...date, selected: false}))})
        }
      })
      this.setState({treeData});
      this.setState({ customReport });
    } else {
      this.state.treeData.forEach((user,index) => {
        if(user.label === props.label) {
          const treeData = this.state.treeData.map((user2,index2)=>{
            if(index===index2) {
              return {...this.state.treeData[index], collapsed: !this.state.treeData[index].collapsed}
            } else {
              return ({...user2, nodes: user2.nodes.map(date => ({...date, selected: false}))})
            }
          })
          this.setState({treeData});          
        }
      },this)
      
      this.setState({ customReport: {} });
    }
  };

 

  render() {

    
    

    return (
      <div>
        <div className="left">
          <p>Отчеты исполнителей</p>
          <div>
            {this.state.treeData.map(user => {
              const label = <span key={uuidv1()} className={user.selected ? "node selected" : "node"} onClick={this.userClicked.bind(this, {label: user.label, level: 0})}>{user.label}</span>;
              return (
                <TreeView key={uuidv1()} nodeLabel={label} collapsed={!user.collapsed}>
                  {user.nodes.map(date => (
                      <div key={uuidv1()} className={date.selected ? "info selected" : "info"} onClick={this.userClicked.bind(this, {key:date.key, level: 1, parent: user.label})}>{date.label}</div>
                    ))
                    }
                </TreeView>
              );
            })}
          </div>
        </div>
        <div className="right">
          <CustomReportCheck customReport={this.state.customReport} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.verifingReport.users,
  customReports: state.verifingReport.customReports
});

export default connect(
  mapStateToProps,
  { getCustomReportsToBeVerified }
)(ReportCheck);
