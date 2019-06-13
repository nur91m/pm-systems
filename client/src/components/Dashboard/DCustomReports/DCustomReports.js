import React, { Component } from "react";
import './DCustomReports.css'

export class DCustomReports extends Component {
  constructor() {
    super();

    this.state = {
      groupBy: ["дата"],
      groupList: ["исполнитель", "раздел"]
    };
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

  render() {
    return (
      <div className="container dcustomreports-comp">
        <div className="row">
          <div className="col-xs-1 mr-3">Группировать по:</div>
          {this.state.groupBy.map((group, index) => (
            <select
              key={group}
              className="col-xs-1 mr-3"
              name={"group" + index}
              value={group}
              onChange={this.onSelectChange.bind(this, index)}
              disabled={this.state.groupBy.length-1===index ? false : true }
            >
              <option value="раздел">раздел</option>
              <option value="дата">дата</option>
              <option value="исполнитель">исполнитель</option>
            </select>
          ))}
          {this.state.groupBy.length > 1 && 
            <div className="minus-btn" onClick={this.removeGroup.bind(this)}>
              <i className="fas fa-minus-circle" />
            </div>
          }
          {this.state.groupBy.length !== 3 &&
          <div className="plus-btn" onClick={this.addGroup.bind(this)}>
            <i className="fas fa-plus-circle" />
          </div>
          }
        </div>
      </div>
    );
  }
}

export default DCustomReports;
