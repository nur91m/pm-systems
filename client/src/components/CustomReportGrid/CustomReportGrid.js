import React from "react";
import "../../utils/codebase/dhtmlxgrid.css";
import "./CustomReportGrid.css";
import * as gridHandler from "./customReportHandler";
import { connect } from "react-redux";
import {
  createCustomReport,
  getLastCustomReport
} from "../../actions/reportActions";
import { getProjects } from "../../actions/projectActions";
import isEmpty from "../../validation/is-empty";
import Spinner from "../common/Spinner";
import moment from "moment"
import 'moment/locale/ru'

const uuidv1 = require("uuid/v1");

class CustomReportGrid extends React.Component {
  constructor() {
    super();

    this.gridContainerRef = React.createRef();

    this.projectIds = [];
    this.projectRows = [];
    this.projectsValue = {};
    this.isProjectRowAdded = false;
  }

  componentDidMount() {
    this.props.getProjects();
    this.props.getLastCustomReport();
  }

  componentDidUpdate() {

    if(!isEmpty(this.gridContainerRef.current)) {
      gridHandler.initCustomReport("gridHeader", true);
    }

    // Add DOM element for new project row
    if (this.isProjectRowAdded && !isEmpty(this.gridContainerRef.current)) {
      if (this.projectIds.length - this.projectRows.length > 1) {
        this.projectIds.forEach(id => {
          const grid = gridHandler.initCustomReport(
            id,
            false,
            this.onCellClicked
          );
          this.projectRows.push(grid);
        }, this);
      } else {
        const id = this.projectIds[this.projectIds.length - 1];
        const grid = gridHandler.initCustomReport(
          id,
          false,
          this.onCellClicked
        );
        this.projectRows.push(grid);
        const rowUid = grid.uid();
        grid.addRow(rowUid, [], 0);
      }

      this.isProjectRowAdded = false;
      let customReport = this.props.customReport;

      if (!isEmpty(this.loadedCustomReport)) {
        customReport = this.loadedCustomReport;
      }
      if (!isEmpty(customReport) && !isEmpty(customReport.projects)) {
        this.projectRows.forEach((grid, index) => {
          grid.clearAll();
          this.loadedCustomReport = { ...customReport };
          const project = this.loadedCustomReport.projects[index];
          const jsonData = gridHandler.convertToJson(project.tasks);
          gridHandler.parse(grid, jsonData);
          const id = grid.entBox.id;
          this.projectsValue[id] = {
            percentage: project.participationPersentage,
            project: project.project
          };

          document.getElementsByName("S" + id)[0].value = project.project;
          document.getElementsByName("I" + id)[0].value =
            project.participationPersentage;
        }, this);
        this.loadedCustomReport.projects = [];
      }
    }
  }

  componentWillReceiveProps(props) {
    const projects = props.projects;
    const customReport = props.customReport;

    // Load tasks
    if (
      !isEmpty(customReport) &&
      !isEmpty(customReport.projects) &&
      isEmpty(this.projectIds)
    ) {
      customReport.projects.forEach(project => {
        this.addProjectRow(project.project);
      }, this);
    }

    // Load Project List
    if (!this.projectsList && !isEmpty(projects)) {
      this.projectsList = projects.map(project => (
        <option key={uuidv1()} value={project.orderNumber}>
          {project.orderNumber + " " + project.name}
        </option>
      ));
      const firstItem = (
        <option key={uuidv1()} value="" selected disabled hidden>
          Выберите проект
        </option>
      );
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

          const element = document.getElementsByClassName(item.entBox.id)[0];
          element.parentNode.removeChild(element);

          this.grid.destructor();
          return false;
        }
      }, this);
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

    const name = event.target.name.substring(1);
    // Save percentage for this project
    this.projectsValue[name] = {
      ...this.projectsValue[name],
      percentage: event.target.value
    };
  };

  projectSelected = event => {
    const name = event.target.name.substring(1);
    // Save project name for this project
    this.projectsValue[name] = {
      ...this.projectsValue[name],
      project: event.target.value
    };
  };

  // Send filled report to DB
  submit = () => {
    const report = {
      user: this.props.user.id,
      discipline: this.props.user.discipline,
      date: moment(),
      projects: []
    };

    this.projectRows.forEach(grid => {
      const id = grid.entBox.id;
      const tasks = gridHandler.getJsonData(grid);
      const projects = {
        participationPersentage: this.projectsValue[id].percentage,
        project: this.projectsValue[id].project,
        tasks
      };
      report.projects.push(projects);
    }, this);

    // Edit if report has been created in this month
    if(this.props.customReport.isExist) {
      this.props.editCustomReport(report);
    } 
    // Else create new report for this month
    else {
      this.props.createCustomReport(report);
    }
    
  };

  // Generate current date
  getDate(isNormal) {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();

    const hh = today.getHours();
    const min = today.getSeconds();

    today = isNormal ? (dd + "/" + mm + "/" + yyyy + " " + hh + ":" + min) : 
    (mm + "/" + dd + "/" + yyyy + " " + hh + ":" + min);
    return today;
  }

  render() {

    const { customReport } = this.props;

    let content;
    let gridContent;
    gridContent = this.projectIds.map(item => (
      <div key={item + 1} className={item} style={{ display: "flex" }}>
        <div
          key={item + 2}
          className="firstcolumn"
          style={{ borderWidth: "1px 0px 1px 1px", borderStyle: "solid" }}
        >
          <select
            key={item + 3}
            name={"S" + item}
            onChange={this.projectSelected.bind(this)}
            style={{
              height: "100%",
              width: "136px",
              display: "table-cell",
              border: "none",
              textAlign: "center"
            }}
          >
            {this.projectsList}
          </select>
          <input
            key={item + 4}
            name={"I" + item}
            type="number"
            onChange={this.validatePercentage.bind(this)}
            style={{
              display: "table-cell",
              height: "100%",
              width: "66px",
              border: "none",
              borderLeft: "1px solid",
              textAlign: "center"
            }}
          />
        </div>
        <div
          key={item + 5}
          id={item}
          style={{ width: "auto", overflow: "none" }}
        />
      </div>
    ));

    if(customReport.loading) {
      content = <Spinner />
    } else {
      content = (
        <div ref={this.gridContainerRef} >
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
          <div id={"gridHeader"} style={{ width: "auto", overflow: "none" }} />
          <div id="grid-container">{gridContent}</div>
        </div>
      );
    }

    return (
      <div>
        <h3>
          
          Ежемесячный отчет за {moment().locale('ru').format("ll")}
        </h3>
        {content}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  customReport: state.customReport,
  user: state.auth.user,
  projects: state.project.projects
});

export default connect(
  mapStateToProps,
  { createCustomReport, getLastCustomReport, getProjects }
)(CustomReportGrid);
