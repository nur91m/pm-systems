const initWeeklyReport = colAccess => {
    // Grid configurations
    colAccess = 'ro,ro,ro,ro,ro,ro,ro,ro,edn,ro,ro,ro,ro,ro,ro,ro';
    const colWidth = '40,100,440,80,65,90,90,90,80,100,90,50,65,190,190,190';
    const headerTitles =
      '#,Activity ID, Deliverable Description, Drawing Number, Budget hours, Actual Hours, Earned Hours, Remaining Hours, Progress, Дата внесение изменении, Comments, № of docs,Total hours,Исполнитель / Drawn,Исполнитель / Drawn,Исполнитель / Drawn';
  
    const colValidators = new Array(16);
    colValidators[8] = 'Percentage';
  
    // Create Grid object
    const grid = new window.dhtmlXGridObject('gridbox');
    grid.setImagePath('/codebase/imgs/');
  
    grid.setHeader(headerTitles);
    grid.setInitWidths(colWidth);
    grid.setColTypes(colAccess);
  
    // Setting Validators
    grid.setNumberFormat('0', 8, '', '');
    grid.enableValidation(true);
    grid.setColValidators(colValidators);
  
    grid.setColSorting('int');
    grid.enableAutoHeight(true);
    grid.enableAutoWidth(true);
    grid.init();
    grid.enableAlterCss('even', 'uneven');
    return grid;
  };
  
  window.dhtmlxValidation.isPercentage = function(a) {
    return a >= 0 && a <= 100;
  };
  
  const getJsonData = grid => {
    grid.setCSVDelimiter('\t');
    const tasks = [];
  
    const str = grid.serializeToCSV();
  
    const lines = str.split('\n');
    lines.forEach(line => {
      const cols = line.split('\t');
  
      const task = {
        order: cols[0],
        activityID: cols[1],
        description: cols[2],
        drawingNumber: cols[3],
        budgetHours: cols[4],
        actualHours: cols[5],
        earnedHours: cols[6],
        remainingHours: cols[7],
        progress: cols[8],
        changedDate: cols[9],
        comments: cols[10],
        docCount: cols[11],
        totalHours: cols[12],
        drawn1: cols[13],
        drawn2: cols[14],
        drawn3: cols[15]
      };
      tasks.push(task);
    });
    return { tasks };
  };
  
  module.exports = {
    initWeeklyReport,
    getJsonData
  };
  