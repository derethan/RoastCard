    /********************************************************************************
     *  Source: ../JS/edit_element.js
     * 
     *        CONTROLLS THE EDITING AND UPDATING OF THE CANVAS ELEMENTS
     *          - Main Modal window for Updating
    *********************************************************************************/

function editElement (canvasElementID, elementType){

    // Store the type and id of the element that was double clicked
    sessionStorage.setItem('selectedElement', canvasElementID);
    sessionStorage.setItem('elementType', elementType);

    //debug
    console.log('Edit Element window Open for Element: ' + canvasElementID);
    console.log('Element Type: ' + elementType);

    //Determine what Modal Window to display
    const originElements = document.querySelectorAll ('.origin-element')

    for (element of originElements)
    { 
      if (elementType === element.id)
      {
      let modalName = 'edit-' + elementType
      let modalWindow = document.getElementById (modalName);
      sessionStorage.setItem ('modalWindow', modalName);

      setModalData ();
      modalWindow.style.display = "block";
      }
    }
}


  /********************************************************************************
  *   Function to Close the modal Window
  *********************************************************************************/
function closeModal () {
  //get Session Data
  let modalWindow = document.getElementById(sessionStorage.getItem ('modalWindow'));
  modalWindow.style.display = "none";
}



  /********************************************************************************
  *   Updated the Modal window content when the Modal is opened
  *     - Updated Elements that are populated with Javascript
  *     - Updated Selections with Current Element Info (Existing title's added to textfields, etc)
  *********************************************************************************/
function setModalData (){

  //get Session Data
  let selectedElement = sessionStorage.getItem ('selectedElement');
  let elementType = sessionStorage.getItem ('elementType');

  if (elementType === 'title-element'){
    let title = document.getElementById(selectedElement).getElementsByTagName('h1')[0].innerHTML;
    document.getElementById('new-title').value = title;
  }
  else if (elementType === 'date-element'){
    const dateLabel = document.getElementById ('currentDateLabel');
    dateLabel.textContent = getCurrentDate ();
  }
}



  /********************************************************************************
  * Function to get the selected date item
  *********************************************************************************/
function selectedDateItem () {
  // Get all the radio buttons with name 'dateOptions'
  let radios = document.getElementsByName('dateOptions');
  
      for(let i = 0; i < radios.length; i++) {
          if(radios[i].checked) {
              return radios[i].value; // return the value of the selected radio button
          }
      }

  } 
  
  
  /********************************************************************************
  *   Function to Set the current date for the Edit Date element Modal
  *********************************************************************************/
  function getCurrentDate(){
    let currentDate = new Date();
    let dateString = currentDate.toDateString ();
    return dateString;
  }

  /********************************************************************************
  *             Functions for Updating Each element are Below
  *********************************************************************************/

// This function is called when the user clicks the Apply Button
function updateTitle () {

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
    case 'small': canvasElement.getElementsByTagName('h1')[0].style.fontSize = '24px'
    break;
    case 'medium': canvasElement.getElementsByTagName('h1')[0].style.fontSize = '32px'
    break;
    case "large": canvasElement.getElementsByTagName('h1')[0].style.fontSize = '38px'
  }
}


function updateDate (){

  //get Session Data
  let selectedElement = sessionStorage.getItem('selectedElement');
  let canvasElement = document.getElementById(selectedElement);
  let selectedOption = selectedDateItem ();
  let selectedDate = document.getElementById ('dateSelector').value;

  switch (selectedOption) {
    case 'defaultDate': canvasElement.getElementsByTagName('h3')[0].innerHTML = 'Roast Date:';
    break;
    case 'currentDate': canvasElement.getElementsByTagName('h3')[0].innerHTML = 'Roast Date: '+ getCurrentDate ();
    break;
    case 'customDate': canvasElement.getElementsByTagName('h3')[0].innerHTML = 'Roast Date: '+ selectedDate;
      
  }
}

function updateRoastChart () {


  
}

// ToDo: Add Functionality to update the headings based on the user input
//      Update the Time cells (first cell of each column), 
//      should be a timestamp  based on the user set time intervals (30s, 1min, etc)

function addColumn () {

//Stores the Table Element
let logTable = document.getElementById ('log-table');

//Stores the number of columns in the table
let columnCount = logTable.rows[0].cells.length;

//If number of columns is not greater then X, add a column
if (columnCount < 8) {

  for (let i = 0; i < logTable.rows.length; i++) {

    //if its the first row add a table Header
    if (i === 0) {
      const header = document.createElement('th');
      header.innerHTML = "New Header";
      logTable.rows[i].appendChild(header);
    }
    else {
    const cell = logTable.rows[i].insertCell(-1); 
    cell.innerHTML = "New Cell";
    }
  }
}

}

function removeColumn () {
  //Remove the last column from the table
  let logTable = document.getElementById ('log-table');
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
    cell.innerHTML = "New Cell";
  }
}
function removeRow () {
  let table = document.getElementById("log-table");

  if (table.rows.length > 2) {
    table.deleteRow(-1);
  }  
}
/***********
 * 
 *  Edit Element Process
 * 
 *    - DBL Click element to open edit window modal 
 *      - TODO: (Add isEditable tag to Origin Elements and only open edit window accordingly)
 *    - Pass Element ID & Type to the Modal Window
 *    - Determine What Element window to display
 *      - Search element ID, if ID contains element X then display info in editWindow accordingly
 *    - Store information from user input fields (Text, Font size, number of columns, etc)
 *    - Update Canvas Element Data with Stored Information based on the element being edited

ToDo: (Blocked Locally with CORS 
  - Will Impliment for final release to clean up HTML Content
  - Replace the Each Modal window with a single edit-Element Modal.
  - Load the file containing the corresponding modal content to the selected element)

Example:

async function getHTML(path) {
  let response = await fetch(path);
  let data = await response.text();
  document.getElementById("edit-element").innerHTML = data;
}
*/



