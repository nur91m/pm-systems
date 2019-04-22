 import isEmpty from '../../validation/is-empty'

 export const initCustomReport = canEdit => {    
    
    // Grid configurations
    let colAccess = 'edn,coro,ed,ed,ed,ed,ed,ed';
    
    const colWidth = '28,134,66,347,63,59,62,140';
    const headerTitles =
      '#,Номер заказа, Процент участия в проекте, Вид проделанной работы (разработка; корректировка; оформление; перевод; адаптация; проверка; расчет; предоставление комментариев (писем); изучение и сбор исходных материалов), Кол-во листов, Формат листа, Процент завер-я, Примечания';
  
    // Create Grid object
    const grid = new window.dhtmlXGridObject('gridbox');
    grid.setImagePath('/codebase/imgs/');
  
    grid.setHeader(headerTitles);
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

    
    grid.enableAlterCss('even', 'uneven');

    

    
    // Setup sorting logic 
  //   let cellChangedEvent = grid.attachEvent("onCellChanged", onCellChanged); 

  //   grid.attachEvent("onAfterSorting", function(){
  //      cellChangedEvent = grid.attachEvent("onCellChanged", onCellChanged);
  //   });

  //   grid.attachEvent("onBeforeSorting", function(x,y,z){      
  //     grid.detachEvent(cellChangedEvent);
  //   });
    
  //   function onCellChanged(rId,cInd,nValue) {      
  //     if(cInd===0) {
  //       grid.sortRows(0,"int","asc");
  //     }
  // }

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
        order: isEmpty(cols[0]) ? '' : cols[0],
        activityID: isEmpty(cols[1]) ? '' : cols[1],
        description: isEmpty(cols[2]) ? '' : cols[2],
        drawingNumber: isEmpty(cols[3]) ? '' : cols[3],
        budgetHours: isEmpty(cols[4]) ? '' : cols[4],
        actualHours: isEmpty(cols[5]) ? '' : cols[5],
        earnedHours: isEmpty(cols[6]) ? '' : cols[6],
        remainingHours: isEmpty(cols[7]) ? '' : cols[7],
        progress: isEmpty(cols[8]) ? '' : cols[8],
        changedDate: isEmpty(cols[9]) ? '' : cols[9],
        comments: isEmpty(cols[10]) ? '' : cols[10],
        docCount: isEmpty(cols[11]) ? '' : cols[11],
        totalHours: isEmpty(cols[12]) ? '' : cols[12],
        drawn1: isEmpty(cols[13]) ? '' : cols[13],
        drawn2: isEmpty(cols[14]) ? '' : cols[14],
        drawn3: isEmpty(cols[15]) ? '' : cols[15],
      };
      
      tasks.push(task);
    });
    return { tasks };
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
  