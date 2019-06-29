import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllCustomReports } from "../../../actions/reportActions";
import "./DCustomReports.css";
import moment from "moment";
import _ from "underscore";
import isEmpty from "../../../validation/is-empty";
import { getUsers } from "../../../actions/authActions";
export class DCustomReports extends Component {
  constructor() {
    super();

    this.state = {
      groupBy: ["date"],
      groupList: ["discipline"],
      allReports: [],
      grouped: {},
      users: {}
    };
  }

  componentDidMount() {
    this.props.getAllCustomReports();
    this.props.getUsers();
  }

  componentWillReceiveProps(props) {
    if (isEmpty(this.state.allReports)) {
      this.setState({ ...this.state, allReports: props.allReports }, () =>
        this.groupHandler()
      );
    }
    if (isEmpty(this.state.users) && !isEmpty(props.users)) {
      const users = Object.assign(
        ...props.users.map(user => {
          return { [user._id]: user.lastName + " " + user.name };
        })
      );
      this.setState({ ...this.state, users: users }, () => this.groupHandler());
    }
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
    this.groupHandler();
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
    this.groupHandler();
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
    this.groupHandler();
  };

  groupHandler = () => {
    if (!isEmpty(this.state.users) && !isEmpty(this.state.allReports)) {
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
    }
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
          {Object.keys(this.state.grouped).map(key => {
            return (
              <div className="group1">
                <div className="group1-key">{key}</div>
                <div className="group1-values">
                  {Array.isArray(this.state.grouped[key])
                    ? this.state.grouped[key].map(user => (
                        <div className="report-owner">
                          {this.state.users[user.user]}
                        </div>
                      ))
                    : Object.keys(this.state.grouped[key]).map(key2 => {
                        return (
                          <div className="group2">
                            <div className="group2-key">{key2}</div>
                            <div className="group2-values">
                              {this.state.grouped[key][key2].map(user => (
                                <div className="report-owner">
                                  {this.state.users[user.user]}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allReports: state.customReport.allReports,
  users: state.auth.allUsers
});

export default connect(
  mapStateToProps,
  { getAllCustomReports, getUsers }
)(DCustomReports);
