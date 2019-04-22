import React from "react";
import "../../utils/codebase/dhtmlxgrid.css";
import "./CustomReportGrid.css";
import * as gridHandler from "./customReportHandler";
import { connect } from "react-redux";
import { createWeeklyReport, getLastReport } from "../../actions/reportActions";
import isEmpty from "../../validation/is-empty";
import Spinner from '../common/Spinner';

class CustomReportGrid extends React.Component {
  constructor() {
    super();
    this.gridRef = React.createRef();
  }
  
  componentWillMount(){
    // const projectNumber = this.props.match.params.projectNumber;

    // // Get last WeeklyReport from DB
    // const req = { projectNumber, discipline: this.props.user.discipline };
    // this.props.getLastReport(req);
  }


  componentDidMount(){
    this.grid = gridHandler.initCustomReport(this.props.user.canEdit);
  }

  componentDidUpdate() {
    
         
    
    
    
  }

  componentWillReceiveProps(props) {  
    // this.updateGridData(props);    
  }


  updateGridData = (props = this.props)=> {    
    if (props.weeklyReport.isExist) {  
      if (!isEmpty(this.grid) && isEmpty(this.gridDataUpdated) && !isEmpty(props.weeklyReport.tasks)) {
        this.gridDataUpdated = true;
        // Convert array of tasks to json data to render in the grid
        const jsonData = gridHandler.convertToJson(props.weeklyReport.tasks);
        gridHandler.parse(this.grid, jsonData);          
      }
    }    
  }


  moveUp =() => {
    this.grid.moveRow(this.grid.getSelectedId(),"up")
  }
  moveDown =() => {
    this.grid.moveRow(this.grid.getSelectedId(),"down")
  }

  setRowSpan = () => {
    
  }

  addRowAbove = () => {
    const id = this.grid.getRowIndex(this.grid.getSelectedRowId());
    this.grid.addRow(this.grid.uid(), [], id);
  };
  addRowBelow = () => {
    const id = this.grid.getRowIndex(this.grid.getSelectedRowId()) + 1;
    const rowUid = this.grid.uid();
    this.grid.addRow(rowUid, [], id);
    return rowUid;
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

    let gridContent;

    if (weeklyReport.loading) {
      gridContent = <Spinner />;
    } else 
    if (weeklyReport.isExist || user.canEdit) {
      gridContent = (
        <div>          
            <div className="gridEditBtns">
              <button onClick={this.moveUp.bind(this)}>Вверх</button>
              <button onClick={this.moveDown.bind(this)}>Вниз</button>
              <button onClick={this.addRowBelow.bind(this)}>Добавить чертеж</button>              
              {/* <button onClick={this.addRowAbove.bind(this)}>Добавить сверху</button> */}
              {/* <button onClick={this.addRowBelow.bind(this)}>Добавить снизу</button> */}
              <button onClick={this.deleteRow.bind(this)}>Удалить строку</button>
            </div>          
          <button onClick={this.setRowSpan.bind(this)}>Отправить</button>          
          <div id={"gridbox"} ref={this.gridRef} style={{ width: "auto", overflow: "none" }} />
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
)(CustomReportGrid);
