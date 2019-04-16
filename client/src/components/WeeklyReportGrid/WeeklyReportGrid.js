import React from "react";
import "./codebase/dhtmlxgrid.css";
import "./WeeklyReportGrid.css";
import reportHandler from "./weeklyReportHandler";
import { connect } from "react-redux";
import { createWeeklyReport, getLastReport } from "../../actions/reportActions";
import Role from "../Auth/Roles";

class WeeklyReportGrid extends React.Component {
  constructor() {
    super();
    this.state = {
      canEdit: false,
      projectId: this.props.location.projectId
    };
  }

  componentDidMount() {
    const projectId = this.props.location.projectId;

    // Initialize data grid
    this.grid = reportHandler.initWeeklyReport();

    // Get user role and set canEdit property
    // Employee can only edit progress column. Can'r add, remove rows.
    const role = this.props.user.role;
    if (role !== Role.Employee) {
      this.setState({ canEdit: true });
    }

    // Get last WeeklyReport from DB
    const req = { projectId, discipline: this.props.user.discipline };
    this.props.getLastReport(req);

  }

  componentWillReceiveProps(props) {
    const tasks = props.weeklyReport.tasks;
    const dat = tasks.map(task => {
      const row = {
        id: task._id,
        data: [
          String(task.order),
          String(task.activityID),
          String(task.description),
          String(task.drawingNumber),
          String(task.budgetHours),
          String(task.actualHours),
          String(task.earnedHours),
          String(task.remainingHours),
          String(task.progress),
          String(task.changedDate),
          String(task.comments),
          String(task.docCount),
          String(task.totalHours),
          String(task.drawn1),
          String(task.drawn2),
          String(task.drawn3)
        ]
      };
      return row;
    });
    
    const jsonData = { rows: dat };
    console.log(jsonData);
    this.grid.parse(jsonData, "json");
  }

  addRowAbove = () => {
    const id = this.grid.getRowIndex(this.grid.getSelectedRowId());

    this.grid.addRow(this.grid.uid(), [], id);
  };
  addRowBelow = () => {
    const id = this.grid.getRowIndex(this.grid.getSelectedRowId()) + 1;

    this.grid.addRow(this.grid.uid(), [], id);
  };
  deleteRow = () => {
    const id = this.grid.getSelectedRowId();
    this.grid.deleteRow(id);
  };
  submit = () => {
    const tasks = reportHandler.getJsonData(this.grid);

    tasks.date = this.getDate();

    const report = {
      project: this.props.location.projectId,
      user: this.props.user.id,
      discipline: this.props.user.discipline,
      date: tasks.date,
      tasks: tasks.tasks
    };

    this.props.createWeeklyReport(report);
  };

  // Generate current date
  getDate() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    return today;
  }

  render() {
    return (
      <div>
        <p>{this.projectId}</p>
        <p>You are {this.props.user.name}</p>
        <button onClick={this.addRowAbove.bind(this)}>Добавить сверху</button>
        <button onClick={this.addRowBelow.bind(this)}>Добавить снизу</button>
        <button onClick={this.deleteRow.bind(this)}>Удалить строку</button>
        <button onClick={this.submit.bind(this)}>Отправить</button>
        <div id={"gridbox"} style={{ width: "auto", overflow: "auto" }} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  weeklyReport: state.weeklyReport,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { createWeeklyReport, getLastReport }
)(WeeklyReportGrid);
