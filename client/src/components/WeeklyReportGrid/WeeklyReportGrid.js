import React from 'react';
import propTypes from 'prop-types'
import axios from 'axios';
import './codebase/dhtmlxgrid.css'
import './WeeklyReportGrid.css'
import reportHandler from './weeklyReportHandler'
import { connect } from 'react-redux';
import { createWeeklyReport } from '../../actions/reportActions';


class WeeklyReportGrid extends React.Component {
  constructor(props) {
    super(props);
    this.projectId = this.props.location.projectId;
    console.log(this.projectId);
    
    
		
  }
  componentWillReceiveProps() {
    this.projectId = this.props.location.projectId;
    console.log(this.projectId);
  }

  componentDidMount() {
    this.grid = reportHandler.initWeeklyReport()
    
    
    const data={
      rows:[
          { id:1, data: ["100",
          "A Time to Kill",
          "John Grisham",
          "12.99",
          "1",
          "05/01/1998"]},
          { id:2, data: ["1000",
          "Blood and Smoke",
          "Stephen King",
          "0",
          "1",
          "01/01/2000"]},
          { id:3, data: ["-200",
          "The Rainmaker",
          "John Grisham",
          "7.99",
          "0",
          "12/01/2001"]}
      ]
  };
  this.grid.parse(data,"json")
    
    
    
  }
  


  addRowAbove = () => {
    const id = this.grid.getRowIndex(this.grid.getSelectedRowId())
    
    this.grid.addRow(this.grid.uid(),[],id)
  }
  addRowBelow = () => {
    const id = this.grid.getRowIndex(this.grid.getSelectedRowId())+1
    
    this.grid.addRow(this.grid.uid(),[],id)
  }
  deleteRow = () => {
    const id = this.grid.getSelectedRowId();    
    this.grid.deleteRow(id);
  }
  submit = () => {
    const tasks = reportHandler.getJsonData(this.grid);

    

    tasks.date = this.getDate();
    console.log(tasks);

    this.props.createWeeklyReport(tasks);

  }

  // Generate current date
  getDate() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today;
  }
  
  
  render() {
    return <div>   
      <p>{this.projectId}</p>  
      <button onClick={this.addRowAbove.bind(this)}>Добавить сверху</button>
      <button onClick={this.addRowBelow.bind(this)}>Добавить снизу</button>
      <button onClick={this.deleteRow.bind(this)}>Удалить строку</button>
      <button onClick={this.submit.bind(this)}>Отправить</button>
      <div id={"gridbox"} style={{width:'auto',overflow:'auto'}}></div>
		
    </div>
  }
}

const mapStateToProps = (state) => ({
  weeklyReport: state.weeklyReport
});


export default connect(mapStateToProps, {createWeeklyReport})(WeeklyReportGrid);