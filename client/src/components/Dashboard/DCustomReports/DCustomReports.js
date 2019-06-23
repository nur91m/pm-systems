import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllCustomReports } from "../../../actions/reportActions";
import "./DCustomReports.css";
import moment from "moment";
import _ from "underscore";

export class DCustomReports extends Component {
  constructor() {
    super();

    this.state = {
      groupBy: ["date"],
      groupList: ["discipline"],
      allReports: [],
      grouped: {}
    };
  }

  componentDidMount() {
    this.props.getAllCustomReports();
  }
  
  

  componentWillReceiveProps(props) {
    this.setState({ ...this.state, allReports: props.allReports});    
  }

  addGroup = () => {
    const groupBy = this.state.groupBy;
    const groupList = this.state.groupList;

    if (groupList.length > 0) {
      groupBy.push(groupList[0]);
      groupList.shift();

      this.setState({
        ...this.state,
        groupBy,
        groupList
      });      
    }
  };

  removeGroup = () => {
    const groupBy = this.state.groupBy;
    const groupList = this.state.groupList;

    if (groupBy.length > 1) {
      const item = groupBy.pop();
      groupList.push(item);
      groupList.sort();
      this.setState({
        ...this.state,
        groupBy,
        groupList
      });     
    }
  };

  onSelectChange = (index, e) => {
    let groupBy = this.state.groupBy;
    let groupList = this.state.groupList;
    const group = e.target.value;
    if (index === groupBy.length - 1 && !groupBy.includes(group)) {
      groupList[groupList.indexOf(group)] = groupBy[index];
      groupBy[index] = group;
      this.setState({
        ...this.state,
        groupBy,
        groupList
      });      
    }
  };

  groupHandler = () => {
    const group1 = this.state.groupBy[0];
    const groupByDate = data =>
      _.groupBy(data, report =>
        moment(report.date)
          .locale("ru")
          .format("MMMM YYYY")
      );

    const groupByDiscipline = data =>
      _.groupBy(data, report => report.discipline);

    let firstGroup = {};
    let secondGroup = {};

    if (group1 === "date") {
      firstGroup = groupByDate(this.state.allReports);
      if (this.state.groupBy.length === 2) {
        for (let key in firstGroup) {
          secondGroup[key] = groupByDiscipline(firstGroup[key]);
        }
      } else {
        secondGroup = firstGroup;
      }
    } else {
      firstGroup = groupByDiscipline(this.state.allReports);
      if (this.state.groupBy.length === 2) {
        for (let key in firstGroup) {
          secondGroup[key] = groupByDate(firstGroup[key]);
        }
      } else {
        secondGroup = firstGroup;
      }
    }
    this.setState({ ...this.state, grouped: secondGroup });
    console.log(secondGroup);
  };

  render() {
    return (
      <div className="container dcustomreports-comp">
        <div className="row group-criteria">
          <div className="col-xs-1 mr-3">Группировать по:</div>
          {this.state.groupBy.map((group, index) => (
            <select
              key={group}
              className="col-xs-1 mr-3"
              name={"group" + index}
              value={group}
              onChange={this.onSelectChange.bind(this, index)}
              disabled={this.state.groupBy.length - 1 === index ? false : true}              
            >
              <option value="discipline">раздел</option>
              <option value="date">дата</option>
            </select>
          ))}
          {this.state.groupBy.length > 1 && (
            <div className="minus-btn" onClick={this.removeGroup.bind(this)}>
              <i className="fas fa-minus-circle" />
            </div>
          )}
          {this.state.groupBy.length !== 2 && (
            <div className="plus-btn" onClick={this.addGroup.bind(this)}>
              <i className="fas fa-plus-circle" />
            </div>
          )}
        </div>
        <div className="row group-content">
          {    
            Object.keys(this.state.grouped).map(key => {
              return <div>{key}</div>
            })        
            

          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allReports: state.customReport.allReports
});

export default connect(
  mapStateToProps,
  { getAllCustomReports }
)(DCustomReports);
