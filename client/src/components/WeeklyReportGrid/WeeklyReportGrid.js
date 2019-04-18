import React from "react";
import "./codebase/dhtmlxgrid.css";
import "./WeeklyReportGrid.css";
import * as gridHandler from "./weeklyReportHandler";
import { connect } from "react-redux";
import { createWeeklyReport, getLastReport } from "../../actions/reportActions";
import Role from "../Auth/Roles";
import isEmpty from "../../validation/is-empty";
import Spinner from '../common/Spinner';

class WeeklyReportGrid extends React.Component {
  
  componentWillMount(){
    const projectNumber = this.props.match.params.projectNumber;

    // Get last WeeklyReport from DB
    const req = { projectNumber, discipline: this.props.user.discipline };
    this.props.getLastReport(req);
  }
  
  componentDidUpdate() {  
    if (this.props.weeklyReport.isExist) {
      // Initialize data grid
      this.grid = gridHandler.initWeeklyReport(this.props.user.canEdit);

      if (!isEmpty(this.props.weeklyReport.tasks)) {
        // Convert array of tasks to json data to render in the grid
        const jsonData = gridHandler.convertToJson(this.props.weeklyReport.tasks);
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
    const { weeklyReport } = this.props;
    const { user } = this.props;
    console.log(user);

    let gridContent;

    if (weeklyReport.loading) {
      gridContent = <Spinner />;
    } else 
    if (weeklyReport.isExist) {
      gridContent = (
        <div>
          {user.canEdit && (
            <div className="gridEditBtns">
              <button onClick={this.addRowAbove.bind(this)}>Добавить сверху</button>
              <button onClick={this.addRowBelow.bind(this)}>Добавить снизу</button>
              <button onClick={this.deleteRow.bind(this)}>Удалить строку</button>
            </div>
          )}
          <button onClick={this.submit.bind(this)}>Отправить</button>
          <div id={"gridbox"} style={{ width: "auto", overflow: "auto" }} />
        </div>
      );
    } else {
      gridContent = <p>There's no report</p>
    }

    return (
      <div>
      {gridContent}
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
