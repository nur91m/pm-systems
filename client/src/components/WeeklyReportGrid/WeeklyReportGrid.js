import React from "react";
import "./codebase/dhtmlxgrid.css";
import "./WeeklyReportGrid.css";
import * as gridHandler from "./weeklyReportHandler";
import { connect } from "react-redux";
import { createWeeklyReport, getLastReport } from "../../actions/reportActions";
import Role from "../Auth/Roles";

class WeeklyReportGrid extends React.Component {
  constructor() {
    super();
    this.canEdit = false;
  }

  componentDidMount() {
    const projectNumber = this.props.match.params.projectNumber;

    // Get user role and set canEdit property
    // Employee can only edit progress column. Can't add, remove rows.
    const role = this.props.user.role;    
    if (role !== Role.Employee) {
      this.canEdit = true;      
    }

    // Get last WeeklyReport from DB
    const req = { projectNumber, discipline: this.props.user.discipline };
    this.props.getLastReport(req);

    // Initialize data grid
    this.grid = gridHandler.initWeeklyReport(this.canEdit);
  }

  componentWillReceiveProps(props) {
    if (props.weeklyReport.isExist) {
      if (props.weeklyReport.tasks !== undefined) {
        // Convert array of tasks to json data to render in the grid        
        const jsonData = gridHandler.convertToJson(props.weeklyReport.tasks);
        this.grid.parse(jsonData, "json");
      }
    }
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

  // Send filled report to DB
  submit = () => {
    const tasks = gridHandler.getJsonData(this.grid);
    tasks.date = this.getDate();

    const report = {
      project: this.props.match.params.projectNumber,
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

    const hh = today.getHours();
    const min = today.getSeconds();

    
    
    today = mm + "/" + dd + "/" + yyyy + " " + hh + ":" + min;
    return today;
  }

  render() {
    const visibility = this.props.weeklyReport.isExist ? "" : "none"

    return (
      <div style={{display: visibility}}>        
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
