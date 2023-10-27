/********************************************************************************
 *  Source: ../JS/edit_element.js
 * 
 *        CONTROLLS THE EDITING AND UPDATING OF THE CANVAS ELEMENTS
 *          - Main Modal window for Updating
*********************************************************************************/

//preload HTML Content for faster response time
let htmlContent = {};
let sourcePath = 'https://raw.githubusercontent.com/derethan/RoastCard/main/html/';

function preloadHTMLContent() {
  const originElements = document.querySelectorAll('.origin-element')
  const elementTypes = []; // Array of element types to preload
  for (element of originElements) {
    elementTypes.push(element.id);
  }

  elementTypes.forEach((elementType) => {
    fetch(sourcePath + `${elementType}.html`)
      .then(response => response.text())
      .then(data => {
        htmlContent[elementType] = data;
      });
  });
}

// Call preloadHTMLContent() when the page loads
window.addEventListener('load', preloadHTMLContent);


/********************************************************************************
*   Function to open and load the modal content for the selected element
*     - editElement() opens the modal window and loads the content
*     - loadModal() updates the content in the modal window
*********************************************************************************/

function editElement(canvasElementID, elementType) {

  // Store the type and id of the element that was double clicked
  sessionStorage.setItem('selectedElement', canvasElementID);
  sessionStorage.setItem('elementType', elementType);

  //debug
  console.log('Edit Element window Open for Element: ' + canvasElementID);
  console.log('Element Type: ' + elementType);

  //Determine what Modal Window to display
  const originElements = document.querySelectorAll('.origin-element')
  for (element of originElements) {
    if (elementType === element.id) {
      let modalWindow = document.getElementById('edit-element');
      sessionStorage.setItem('modalWindow', 'edit-element');

      loadModal(elementType);
      modalWindow.style.display = "flex";
    }
  }
}

//function to load the modal window with the correct element type
async function loadModal(elementType) {
  let data = await htmlContent[elementType];
  document.getElementById("edit-element").innerHTML = data;

  let functionName = 'get' + elementType + 'Data';
  functionName = functionName.replace('-element', '');
  
  try {
    window[functionName]();
  }
  catch (err) {
    console.log('Function: ' + functionName + '() does not exist');
  }
}

/********************************************************************************
*   Function to Close the modal Window and delete the element
*********************************************************************************/
function closeModal() {
  //get Session Data
  let modalWindow = document.getElementById(sessionStorage.getItem('modalWindow'));
  modalWindow.style.display = "none";
}

function deleteElement() {
  //get Session Data
  let selectedElement = sessionStorage.getItem('selectedElement');
  let canvasElement = document.getElementById(selectedElement);

  // Remove the element from the canvas and close the modal window
  canvasElement.remove();
  closeModal();
}


/********************************************************************************
*   GET FUNCTIONS:      
      - Functions to update the modal window content based on the corresponding element
*********************************************************************************/
function gettitleData() {
  //get Session Data
  let selectedElement = sessionStorage.getItem('selectedElement');

  let title = document.getElementById(selectedElement).getElementsByTagName('h1')[0].innerHTML;
  document.getElementById('new-title').value = title;
}

function getdateData () {
  const dateLabel = document.getElementById('currentDateLabel');
  dateLabel.textContent = getCurrentDate();
}

function getlogData() {
  //get Session Data
  let selectedElement = sessionStorage.getItem('selectedElement');
  let canvasElement = document.getElementById(selectedElement);

  // Load Table Content from the selectedElement Log Table
  let logTable = canvasElement.querySelector('.log-table');

  // Insert Table Content into the modal window Log Table
  let modalTable = document.getElementById('log-table');
  modalTable.innerHTML = logTable.innerHTML;


  // Get the number of TH elements in the table
  let columnCount = modalTable.rows[0].cells.length;

  // for each TH Element, store the text of the TH
  let columnHeaders = [];
  for (let i = 0; i < columnCount; i++) {
    columnHeaders.push(modalTable.rows[0].cells[i].innerHTML); //store the text of the TH
  }

  //replace the text of the TH with an input field
  for (let i = 0; i < columnCount; i++) {
    modalTable.rows[0].cells[i].innerHTML = '<input type="text" value="' + columnHeaders[i] + '" maxlength="10">';
  }
}

function getnoteData() {
  //get Session Data
  let selectedElement = sessionStorage.getItem('selectedElement');
  let canvasElement = document.getElementById(selectedElement);

  //load the note content for the modal window
  let canvasNotePad = canvasElement.querySelector('.mainElementContainer').innerHTML;

  // Insert notePad into the modal window
  modalNote = document.getElementById('note-content');
  modalNote.innerHTML = canvasNotePad;
}


function getbatchData () {
  //get Session Data
  let selectedElement = sessionStorage.getItem('selectedElement');
  let canvasElement = document.getElementById(selectedElement);

  // Load Content from the selectedElement
  let batchContent = canvasElement.querySelector('.mainElementContainer').innerHTML;

  // Insert Content into the modal window
  modalBatch = document.getElementById('batch-content');
  modalBatch.innerHTML = batchContent;
}
/********************************************************************************
*   UPDATE FUNCTIONS:    
      - Functions for Updating Each element are Below
*********************************************************************************/

// This function is called when the user clicks the Apply Button
function updateTitle() {

  //get Session Data
  let selectedElement = sessionStorage.getItem('selectedElement');
  let canvasElement = document.getElementById(selectedElement);

  // Get the text from the text box in your modal
  let newText = document.getElementById('new-title').value;
  let fontSize = document.getElementById('font-size').value;
  let fontColor = document.getElementById('font-color').value;

  // Update the text of the selected element
  canvasElement.getElementsByTagName('h1')[0].innerHTML = newText;
  canvasElement.getElementsByTagName('h1')[0].style.color = fontColor;

  switch (fontSize) {
    case 'smallest':
      canvasElement.getElementsByTagName('h1')[0].style.fontSize = '12px'
      break;
    case 'smaller':
      canvasElement.getElementsByTagName('h1')[0].style.fontSize = '18px'
      break;
    case 'small':
      canvasElement.getElementsByTagName('h1')[0].style.fontSize = '24px'
      break;
    case 'medium':
      canvasElement.getElementsByTagName('h1')[0].style.fontSize = '36px'
      break;
    case "large":
      canvasElement.getElementsByTagName('h1')[0].style.fontSize = '48px'
      break;
    case "larger":
      canvasElement.getElementsByTagName('h1')[0].style.fontSize = '60px'
      break;
    case "largest":
      canvasElement.getElementsByTagName('h1')[0].style.fontSize = '72px'
  }
}


function updateDate() {

  //get Session Data
  let selectedElement = sessionStorage.getItem('selectedElement');
  let canvasElement = document.getElementById(selectedElement);
  let selectedOption = selectedDateItem();
  let selectedDate = document.getElementById('dateSelector').value;

  switch (selectedOption) {
    case 'defaultDate':
      canvasElement.getElementsByTagName('h3')[0].innerHTML = 'Roast Date:';
      break;
    case 'currentDate':
      canvasElement.getElementsByTagName('h3')[0].innerHTML = 'Roast Date: ' + getCurrentDate();
      break;
    case 'customDate':
      canvasElement.getElementsByTagName('h3')[0].innerHTML = 'Roast Date: ' + selectedDate;

  }
}

function updateLog() {

  //get Session Data
  let selectedElement = sessionStorage.getItem('selectedElement');
  let canvasElement = document.getElementById(selectedElement);

  // Get the log-Table from the modal window
  let modalTable = document.getElementById('log-table');
  canvasElement.querySelector('.log-table').innerHTML = modalTable.innerHTML;

  // Get the number of TH elements in the table
  let columnCount = modalTable.rows[0].cells.length;

  // for each TH Element, store the content of the TH input field
  let columnHeaders = [];
  for (let i = 0; i < columnCount; i++) {
    columnHeaders.push(modalTable.rows[0].cells[i].getElementsByTagName('input')[0].value); //store the text of the TH
    canvasElement.querySelector('.log-table').rows[0].cells[i].innerHTML = columnHeaders[i];
  }

}

function updateNote() {
  //get Session Data
  let selectedElement = sessionStorage.getItem('selectedElement');
  let canvasElement = document.getElementById(selectedElement);

  // Get the notePad from the modal window
  modalNote = document.getElementById('note-content');
  canvasElement.querySelector('.mainElementContainer').innerHTML = modalNote.innerHTML;
}

/********************************************************************************
*             Functions to add and remove content from the elements
*********************************************************************************/


// ToDo: Add Functionality to update the headings based on the user input
//      Update the Time cells (first cell of each column), 
//      should be a timestamp  based on the user set time intervals (30s, 1min, etc)

function addColumn() {

  //Stores the Table Element
  let logTable = document.getElementById('log-table');

  //Stores the number of columns in the table
  let columnCount = logTable.rows[0].cells.length;

  //If number of columns is not greater then X, add a column
  if (columnCount < 8) {

    for (let i = 0; i < logTable.rows.length; i++) {

      //if its the first row add a table Header
      if (i === 0) {
        const header = document.createElement('th');
        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = '10';
        input.placeholder = 'New Header';
        header.appendChild(input);
        logTable.rows[i].appendChild(header);
      } else {
        const cell = logTable.rows[i].insertCell(-1);
        cell.innerHTML = " ";
      }
    }
  }

}

function removeColumn() {
  //Remove the last column from the table
  let logTable = document.getElementById('log-table');
  let columnCount = logTable.rows[0].cells.length;

  if (columnCount > 2) {
    for (let i = 0; i < logTable.rows.length; i++) {
      logTable.rows[i].deleteCell(-1);
    }
  }

}

function addRow() {
  let table = document.getElementById("log-table");
  let row = table.insertRow(-1);

  // Loop through each column and add a new cell
  for (let i = 0; i < table.rows[0].cells.length; i++) {
    const cell = row.insertCell(-1);
    cell.innerHTML = " ";
  }
}

function removeRow() {
  let table = document.getElementById("log-table");

  if (table.rows.length > 2) {
    table.deleteRow(-1);
  }
}

//Add a new line to the notePad
function addLine() {
  //get the Body of the Modal NotePad
  modalNoteBody = document.getElementById('note-content').querySelector('.element-content');

  // Create a new div element with the class "note-line"
  const newLine = document.createElement('div');
  newLine.classList.add('note-line');

  // Append the new div element to the modalNoteBody
  modalNoteBody.appendChild(newLine);
}

function removeLine() {
  //get the Body of the Modal NotePad
  modalNoteBody = document.getElementById('note-content').querySelector('.element-content');

  // Determine how many lines there are
  let lineCount = modalNoteBody.childElementCount;

  // If there is more then one line, remove the last line
  if (lineCount > 1) {

    // Remove the last line of the modalNoteBody
    modalNoteBody.removeChild(modalNoteBody.lastElementChild);
  }
}


/********************************************************************************
* Function to get the selected date item from the radio buttons
* Function to get the current date
*********************************************************************************/
function selectedDateItem() {
  // Get all the radio buttons with name 'dateOptions'
  let radios = document.getElementsByName('dateOptions');
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return radios[i].value; // return the value of the selected radio button
    }
  }
}

function getCurrentDate() {
  let currentDate = new Date();
  let dateString = currentDate.toDateString();
  return dateString;
}