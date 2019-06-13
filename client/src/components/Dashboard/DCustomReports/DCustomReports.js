import React, { Component } from "react";

export class DCustomReports extends Component {
  constructor() {
    super();

    this.state = {
      groupList: ["дата"],
      groupBy: ["исполнитель", "раздел"]
    };
  }

  addGroup = () => {
    const groupList = this.state.groupList;
    const groupBy = this.state.groupBy;

    if (groupBy.length > 0) {
      groupList.push(groupBy[0]);
      groupBy.shift();

      this.setState({
        ...this.state,
        groupList,
        groupBy
      });
    }
  };

  onSelectChange = (index,e) =>{
    let groupList = this.state.groupList;
    let groupBy = this.state.groupBy;
    const group = e.target.value;
    groupBy = [...groupBy, groupList.splice(index)]
    groupList.push(group);
    this.setState({
        ...this.state,
        groupList,
        groupBy
      });
  }

  render() {
    return (
      <div className="container dcustomreports-comp">
        <div className="row">
          <div className="col-xs-1 mr-3">Группировать по:</div>
          {this.state.groupList.map((group, index) => (
            <select
              className="col-xs-1 mr-3"
              name={"group" + index}
              value={group}
              onChange={this.onSelectChange.bind(this, index)}
            >
              <option value="раздел">раздел</option>
              <option value="дата">дата</option>
              <option value="исполнитель">исполнитель</option>
            </select>
          ))}
          <div onClick={this.addGroup.bind(this)}>
            <i class="fas fa-plus-circle" />
          </div>
        </div>
      </div>
    );
  }
}

export default DCustomReports;
