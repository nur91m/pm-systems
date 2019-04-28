 import isEmpty from '../../validation/is-empty'

 export const initCustomReport = (gridId, isHeaderVisible, onCellClicked) => {    
    
    // Grid configurations
    let colAccess = 'ed,ed,ed,ed,ed,ed,ed';    
    let colWidth = '136,66,346,63,59,62,140';
    let headerTitles ='Номер заказа,Процент участия в проекте,Вид проделанной работы (разработка; корректировка; оформление; перевод; адаптация; проверка; расчет; предоставление комментариев (писем); изучение и сбор исходных материалов), Кол-во листов, Формат листа, Процент завер-я, Примечания';  
    

    // Create Grid object
    const grid = new window.dhtmlXGridObject(gridId);
    grid.setImagePath('/codebase/imgs/');
  
    grid.setHeader(headerTitles);
    grid.setNoHeader(!isHeaderVisible);
    grid.setInitWidths(colWidth);
    grid.setColTypes(colAccess);
  
    // Setting Validators
    // grid.setNumberFormat('0', 8, '', '');
    // grid.enableValidation(true);
    // grid.setColValidators(colValidators);
  
    //grid.setColSorting('int');
    
    grid.enableAutoHeight(true);
    grid.enableAutoWidth(true);
    grid.enableMultiline(true);
    grid.init();

    // Hide first and second columns in project rows
    if(!isHeaderVisible) {
      grid.setColumnHidden(0,true);
      grid.setColumnHidden(1,true);      
    }
    
    grid.enableAlterCss('even', 'uneven');
    grid.attachEvent("onRowSelect", () => onCellClicked(grid));

    // Edit on single click
    grid.enableEditEvents(true,false,true);
    return grid;
  };
  
  export const parse = (grid,jsonData)=>{
    const gridData = grid;    
    gridData.parse(jsonData, "json");     
  }
  
  export const getJsonData = grid => {
    
    grid.setCSVDelimiter('\t');
    const tasks = [];
  
    const str = grid.serializeToCSV();
  
    const lines = str.split('\n');    
    lines.forEach(line => {
      const cols = line.split('\t');      
      const task = {
        description: isEmpty(cols[2]) ? '' : cols[2],
        sheetCount: isEmpty(cols[3]) ? '' : cols[3],
        sheetSize: isEmpty(cols[4]) ? '' : cols[4],
        progress: isEmpty(cols[5]) ? '' : cols[5],
        comments: isEmpty(cols[6]) ? '' : cols[6]       
      };      
      tasks.push(task);
    });
    return tasks;
  };

  export const convertToJson = tasks => {
    const data = tasks.map(task => {
      const row = {
        id: task._id,
        data: [
          Number(task.order),
          String(task.activityID),
          String(task.description),
          String(task.drawingNumber),
          Number(task.budgetHours),
          Number(task.actualHours),
          Number(task.earnedHours),
          Number(task.remainingHours),
          Number(task.progress),
          new Date(task.changedDate),
          String(task.comments),
          Number(task.docCount),
          Number(task.totalHours),
          isEmpty(String(task.drawn1)) ? '' : String(task.drawn1),
          isEmpty(String(task.drawn2)) ? '' : String(task.drawn2),
          isEmpty(String(task.drawn3)) ? '' : String(task.drawn3)
        ]
      };
      return row;
    });    
    return { rows: data};
  }
  
  // module.exports = {
  //   getJsonData,
  //   initWeeklyReport
    
  // };
  