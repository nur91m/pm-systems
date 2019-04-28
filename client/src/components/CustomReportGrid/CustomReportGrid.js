import React from "react";
import "../../utils/codebase/dhtmlxgrid.css";
import "./CustomReportGrid.css";
import * as gridHandler from "./customReportHandler";
import { connect } from "react-redux";
import { createCustomReport, getLastCustomReport } from "../../actions/reportActions";
import { getProjects } from "../../actions/projectActions";
import isEmpty from "../../validation/is-empty";
import Spinner from "../common/Spinner";

const uuidv1 = require("uuid/v1");

class CustomReportGrid extends React.Component {
  constructor() {
    super();

    this.projectIds = [];
    this.projectRows = [];
    this.projectsValue = {};
    this.isProjectRowAdded = false;
  }

  componentDidMount() {

    this.props.getProjects();
    this.props.getLastCustomReport();

    
    gridHandler.initCustomReport("gridbox", true);
  }

  componentDidUpdate() {
    // Add DOM element for new project row
    if (this.isProjectRowAdded) {
      const id = this.projectIds[this.projectIds.length - 1];
      const grid = gridHandler.initCustomReport(id, false, this.onCellClicked);
      this.projectRows.push(grid);

      const rowUid = grid.uid();
      grid.addRow(rowUid, [], 0);
      this.isProjectRowAdded = false;
    }
  }

  componentWillReceiveProps(props) {

    const projects = props.projects;

    if (!this.projectsList && !isEmpty(projects)) {
      this.projectsList = projects.map(project => (
        <option value={project.orderNumber}>
          {project.orderNumber + " " + project.name}
        </option>
      ));
      const firstItem = <option value="" selected disabled hidden>Выберите проект</option>;
      this.projectsList.unshift(firstItem);
    }
  }

  moveUp = () => {
    this.grid.moveRow(this.grid.getSelectedId(), "up");
  };
  moveDown = () => {
    this.grid.moveRow(this.grid.getSelectedId(), "down");
  };

  addRow = () => {
    if (isEmpty(this.grid)) {
      this.grid = this.projectRows[this.projectRows.length - 1];
    }
    const id = this.grid.getRowIndex(this.grid.getSelectedRowId()) + 1;
    const rowUid = this.grid.uid();
    this.grid.addRow(rowUid, [], id);
  };

  addProjectRow = () => {
    this.isProjectRowAdded = true;
    const id = uuidv1();
    this.projectIds.push(id);
    this.forceUpdate();
  };

  deleteRow = () => {
    const id = this.grid.getSelectedRowId();
    this.grid.deleteRow(id);

    if (this.grid.getRowsNum() < 1) {
      this.projectRows = this.projectRows.filter((item, index, arr) => {
        if (item !== this.grid) {
          return true;
        } else {
          this.projectIds.splice(index, 1);
          this.grid.destructor();
          return false;
        }
      }, this);
      this.forceUpdate();
    }
  };

  onCellClicked = (grid, id, index) => {
    this.grid = grid;
    this.projectRows.forEach(item => {
      if (item !== grid) {
        item.clearSelection();
      }
    });
  };

  validatePercentage = event => {
    if (event.target.value > 100) {
      event.target.value = 100;
    }
    // Save percentage for this project
    this.projectsValue[event.target.name] = {
      ...this.projectsValue[event.target.name],
      percentage: event.target.value
    };
  };

  projectSelected = event => {
    // Save percentage for this project
    this.projectsValue[event.target.name] = {
      ...this.projectsValue[event.target.name],
      project: event.target.value
    };
  };

  // Send filled report to DB
  submit = () => {

    const report = {        
      user: this.props.user.id,
      discipline: this.props.user.discipline,
      date: this.getDate(),
      projects:[]
    }

    this.projectRows.forEach(grid => {
      const id = grid.entBox.id;
      const tasks = gridHandler.getJsonData(grid);      
      const projects = {
        participationPersentage:this.projectsValue[id].percentage,
        project: this.projectsValue[id].project,
        tasks
      }
      report.projects.push(projects);
    })

    this.props.createCustomReport(report);
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

    let gridContent;
    gridContent = this.projectIds.map(item => (
      <div className={item} style={{ display: "flex" }}>
        <div
          className="firstcolumn"
          style={{ borderWidth: "1px 0px 1px 1px", borderStyle: "solid" }}
        >
          <select
            name={item}
            defaultValue=""
            onChange={this.projectSelected.bind(this)}
            style={{
              height: "100%",
              width: "136px",
              display: "table-cell",
              border: "none"
            }}
          >
            {this.projectsList}
          </select>
          <input
            name={item}
            type="number"
            onChange={this.validatePercentage.bind(this)}
            style={{
              display: "table-cell",
              height: "100%",
              width: "66px",
              border: "none",
              borderLeft: "1px solid"
            }}
          />
        </div>
        <div key={item} id={item} style={{ width: "auto", overflow: "none" }} />
      </div>
    ));

    return (
      <div>
        <div className="gridEditBtns">
          <button onClick={this.moveUp.bind(this)}>Вверх</button>
          <button onClick={this.moveDown.bind(this)}>Вниз</button>
          <button onClick={this.addRow.bind(this)}>Добавить чертеж</button>
          <button onClick={this.addProjectRow.bind(this)}>
            Добавить проект
          </button>
          {/* <button onClick={this.addRow.bind(this)}>Добавить снизу</button> */}
          <button onClick={this.deleteRow.bind(this)}>Удалить строку</button>
          <button onClick={this.submit.bind(this)}>Отправить</button>
        </div>
        <div id={"gridbox"} style={{ width: "auto", overflow: "none" }} />
        <div id="grid-container">{gridContent}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  weeklyReport: state.weeklyReport,
  user: state.auth.user,
  projects: state.project
});

export default connect(
  mapStateToProps,
  { createCustomReport, getLastCustomReport, getProjects }
)(CustomReportGrid);
