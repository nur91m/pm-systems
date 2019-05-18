import React, { Component } from "react";
import "../CustomReportCheck/CustomReportCheck.css";

export default class CustomReportCheck extends Component {
  constructor(props) {
    super(props);

    this.state = { projects: [], visible: false };
  }

  componentWillReceiveProps(props) {
    const projects = props.customReport.projects;
    if (projects) {
      this.setState({projects, visible:true});      
    }
  }

  render() {

    const tableData = this.state.projects.map(project => {
        const orderNumber = project.project;
        const participationPersentage = project.participationPersentage;
        const rowSpan = project.tasks.length;

        let firstRow = [
          <td rowSpan={rowSpan}>{orderNumber}</td>,
          <td rowSpan={rowSpan}>{participationPersentage}</td>
        ];
        let nextRows = [];
        project.tasks.forEach((task, index) => {
          if (index == 0) {
            firstRow = [...firstRow,
              <td>{task.description}</td>,
              <td>{task.sheetCount}</td>,
              <td>{task.sheetSize}</td>,
              <td>{task.progress}</td>,
              <td>{task.comments}</td>
            ];
          } else {
          nextRows.push(
            <tr>
            <td>{task.description}</td>
            <td>{task.sheetCount}</td>
            <td>{task.sheetSize}</td>
            <td>{task.progress}</td>
            <td>{task.comments}</td>
            </tr>
          );}
        });
        return (
            [
                <tr>{firstRow}</tr>,
                nextRows.map(row=>row)
            ]
        )
      });

      const table = this.state.visible ? (<table>
      <tbody>
        <tr>
          <th style={{ width: "136px" }}>Номер заказа</th>
          <th style={{ width: "66px" }}>Процент участия в проекте</th>
          <th style={{ width: "346px" }}>
            {
              "Вид проделанной работы (разработка; корректировка; оформление; перевод; адаптация; проверка; расчет; предоставление комментариев (писем); изучение и сбор исходных материалов)"
            }
          </th>
          <th style={{ width: "63px" }}>Кол-во листов</th>
          <th style={{ width: "59px" }}>Формат листа</th>
          <th style={{ width: "62px" }}>Процент завер-я</th>
          <th style={{ width: "140px" }}>Примечания</th>
        </tr>
        {tableData}
      </tbody>
    </table>) : ''

    return (
      <div>
        {table}
      </div>
    );
  }
}
