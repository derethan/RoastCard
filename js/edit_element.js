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

      //Lock the body and html elements to prevent scrolling
      document.body.classList.add('modal-open');
      document.documentElement.classList.add('modal-open');

    }
  }
}

//function to load the modal window for the selected element type
async function loadModal(elementType) {
  let data = await htmlContent[elementType];
  document.getElementById("edit-element").innerHTML = data;

  let functionName = 'get' + elementType + 'Data';
  functionName = functionName.replace('-element', '');
  
  let elementTypeCapitalized = elementType.charAt(0).toUpperCase() + elementType.slice(1);
  let updateFunction = 'update' + elementTypeCapitalized + '()';
  updateFunction = updateFunction.replace('-element', '');

  // If the user is not on a mobile device (screen width more than 768px), make the modal window movable
  if (window.innerWidth > 768) {
    let modalContent = document.querySelector('.modal-content');
    modalContent.classList.add('movable');
  }

  try {
    window[functionName]();

    const applyButton = document.getElementById('applyButton');

    //remove the onclick atributte from the apply button
    applyButton.removeAttribute('onclick');
    applyButton.setAttribute('onclick', updateFunction);
  }
  catch (err) {
    console.log('Error Loading Function: ' + functionName);
    console.log(err);
  }
}

//Loads the Canvas Element Content into the Modal Window
function loadElementContent () {
  //get Session Data
  let selectedElement = sessionStorage.getItem('selectedElement');
  let canvasElement = document.getElementById(selectedElement);

  //load the content for the modal window
  let elementContent = canvasElement.querySelector('.mainElementContainer').innerHTML;

   // Insert Content into the modal window
  modelContent = document.querySelector ('.modal-body').querySelector('.mainElementContainer');
  modelContent.style.display = 'block';
  modelContent.innerHTML = elementContent;
}

/********************************************************************************
*   Function to Close the modal Window and delete the element
*********************************************************************************/
function closeModal() {
  
  //get Session Data
  let modalWindow = document.getElementById(sessionStorage.getItem('modalWindow'));

  // Close the modal window
  modalWindow.style.display = "none";

  //Unlock the body and html elements to allow scrolling
  document.body.classList.remove('modal-open');
  document.documentElement.classList.remove('modal-open'); // Add this line
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

/******MAY REPLACE WITH SINGLE FUNCTION FOR STATIC CONTENT*******/
function getnoteData() {
  //loads the data from the canvas element into the modal window
  loadElementContent ();
}

function getbatchData () {
  //loads the data from the canvas element into the modal window
  loadElementContent ();
}

function getbeanData () {
  //loads the data from the canvas element into the modal window
  loadElementContent ();
}

function getweightData () {
  //loads the data from the canvas element into the modal window
  loadElementContent ();
}

function getblendData () {
  //loads the data from the canvas element into the modal window
  loadElementContent ();

  //get Session Data
  let selectedElement = sessionStorage.getItem('selectedElement');
  let canvasElement = document.getElementById(selectedElement);

  // Get the blend from the modal window
  modalBlend = document.querySelector('.modal-body').querySelector('.mainElementContainer');

  let componentCount = canvasElement.querySelectorAll('.component').length; 

  //If there is a component, replace the divs with input boxes
  if (componentCount > 0) {
    for (let i = 0; i < componentCount; i++) {

      //Store the name, weight, and ratio of each component
      let blendNames = canvasElement.querySelectorAll('.component') [i].getElementsByTagName('div')[0].innerHTML;
      let blendWeight = canvasElement.querySelectorAll('.component') [i].getElementsByTagName('div')[1].innerHTML;
      let blendRatio = canvasElement.querySelectorAll('.component') [i].getElementsByTagName('div')[2].innerHTML;

      //Convert the Component Names to input boxes in the Modal Window
      modalBlend.querySelectorAll('.component') [i].childNodes[0].innerHTML = '<input type="text" class="input-box" value="' + blendNames + '" maxlength="20">';
      modalBlend.querySelectorAll('.component') [i].childNodes[0].classList.remove ('input-box');
      modalBlend.querySelectorAll('.component') [i].childNodes[1].innerHTML = '<input type="number" class="input-box" value="' + blendWeight + '" max="9999">';
      modalBlend.querySelectorAll('.component') [i].childNodes[1].classList.remove ('input-box');
      modalBlend.querySelectorAll('.component') [i].childNodes[2].innerHTML = '<input type="number" class="input-box" value="' + blendRatio + '" min="0" max="100" step="1">';
      modalBlend.querySelectorAll('.component') [i].childNodes[2].classList.remove ('input-box');
    }
  }
}

async function gettempData () {
    //loads the data from the canvas element into the modal window
    loadElementContent ();
    getSelectionData();
}

async function gettimingData () {
    //loads the data from the canvas element into the modal window
    loadElementContent ();
    getSelectionData();
}

function getSelectionData () {
  //Get session Data
  let selectedElement = sessionStorage.getItem('elementType');

  const selectionContainer = document.querySelector('.modal-body').querySelector('.selection-content');
  const mainElementContainer = document.querySelector('.modal-body').querySelector('.mainElementContainer').querySelector('.element-content');

  //Store the names of the current items in the canvas element
  const selectedItems = mainElementContainer.querySelectorAll('.element-line');

    //add minus button to the mainElementContainer items
    selectedItems.forEach ((item) => {
      const minusButton = document.createElement ('button');
      minusButton.classList.add('minus-button');
      minusButton.innerHTML = '-';
      minusButton.addEventListener('click', removeItem);  
      item.appendChild(minusButton);
    })

  //Store an array of selectible temperatures
  const tempArray = ['Ambient Temp:', 'Humidity:',"Yellowing Temp:", "Browing Temp:", "First Crack Temp:", "Second Crack Temp:", "Drop Temp:"];
  const timingArray = ['Roast Start Time:', 'Roast End Time:', 'Roast Duration:', 'Yellowing Start Time:', 'Brown Start Time:', 'Maillard reaction Start Time:',
  'First Crack Start Time:', 'First Crack End Time:', 'First Crack Duration:','Second Crack Start Time:', 'Second Crack End Time:', 'Second Crack Duration:', 
  'Development time:', 'Development Ratio:'];


  if (selectedElement === 'temp-element') {
    tempArray.forEach((temp) => {
      populateContent(temp);
    })
  } else if (selectedElement === 'timing-element') {
    timingArray.forEach((temp) => {
      populateContent(temp);
    })
  }

  async function populateContent (temp) {
    
    //Check to see if the Item in TempArray matches an item from selectedItems
    let itemExists = false;
    for (let i = 0; i < selectedItems.length; i++) {
      if (temp === selectedItems[i].firstChild.innerHTML) {
        itemExists = true;
      }
    }

    //If the item does not exist, create a new item
    if (itemExists === false) {

    //Creates a new Div Element with the class "selection-line"
    const selectableItem = document.createElement('div');
    selectableItem.classList.add('selection-line');

    // Adds the Text to the new Div Element
    const text = document.createElement ('p');
    text.innerHTML = temp;
    selectableItem.appendChild(text);

    //Adds the plus Button to the new Div Element
    const plusButton = document.createElement ('button');
    plusButton.classList.add('plus-button');
    plusButton.innerHTML = '+';
    plusButton.addEventListener('click', addItem);
    selectableItem.appendChild(plusButton);

    selectionContainer.appendChild(selectableItem);
    }
  }
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

  closeModal();
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

  closeModal();

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

    if (columnHeaders[i] === 'Notes' || columnHeaders[i] === 'notes') {
      canvasElement.querySelector('.log-table').rows[0].cells[i].style.width = '150px';
    }
  }
  closeModal();
}

function updateNote() {
  //get Session Data
  let selectedElement = sessionStorage.getItem('selectedElement');
  let canvasElement = document.getElementById(selectedElement);

  // Get the notePad from the modal window
  modalNote = document.querySelector('.modal-body').querySelector('.mainElementContainer');
  canvasElement.querySelector('.mainElementContainer').innerHTML = modalNote.innerHTML;

  closeModal();
}

function updateBlend() {
  //get Session Data
  let selectedElement = sessionStorage.getItem('selectedElement');
  let canvasElement = document.getElementById(selectedElement);

  // Get the blend from the modal window
  modalBlend = document.querySelector('.modal-body').querySelector('.mainElementContainer');

  //Get the number of components in the blend
  let componentCount = modalBlend.querySelectorAll('.component').length; 

  //for each component, replacde the input boxes with divs
  for (let i = 0; i < componentCount; i++) {

    //Store the name, weight, and ratio of each component
    let blendNames = modalBlend.querySelectorAll('.component') [i].getElementsByTagName('input')[0].value;
    let blendWeight = modalBlend.querySelectorAll('.component') [i].getElementsByTagName('input')[1].value;
    let blendRatio = modalBlend.querySelectorAll('.component') [i].getElementsByTagName('input')[2].value;


    //Convert the input boxes to divs
    modalBlend.querySelectorAll('.component') [i].childNodes[0].innerHTML = blendNames;
    modalBlend.querySelectorAll('.component') [i].childNodes[0].classList.add ('input-box');
    modalBlend.querySelectorAll('.component') [i].childNodes[1].innerHTML = blendWeight;
    modalBlend.querySelectorAll('.component') [i].childNodes[1].classList.add ('input-box');
    modalBlend.querySelectorAll('.component') [i].childNodes[2].innerHTML = blendRatio;
    modalBlend.querySelectorAll('.component') [i].childNodes[2].classList.add ('input-box');
  }

  //Update the canvas element with the new blend
  canvasElement.querySelector('.mainElementContainer').innerHTML = modalBlend.innerHTML;

  closeModal();
}

function updateTemp () {
  populateElement();
  closeModal();
}

function updateTiming () {
  populateElement();
  closeModal();
}
/********************************************************************************
*             Functions to add and remove content from the elements
*********************************************************************************/


// ToDo: Add Functionality to update the headings based on the user input
//      Update the Time cells (first cell of each column), 
//      should be a timestamp  based on the user set time intervals (30s, 1min, etc)

function addColumn(tableName) {

  //Stores the Table Element
  let logTable = document.getElementById(tableName);

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

function removeColumn(tableName) {
  //Remove the last column from the table
  let logTable = document.getElementById(tableName);
  let columnCount = logTable.rows[0].cells.length;

  if (columnCount > 2) {
    for (let i = 0; i < logTable.rows.length; i++) {
      logTable.rows[i].deleteCell(-1);
    }
  }

}

let newTime = 0;

function addRow(tableName) {
  let table = document.getElementById(tableName);
  let row = table.insertRow(-1);

  const timeInterval = parseInt(document.getElementById('timeInterval').value);

  //convert the time value  to minutes and seconds
  let minutes = Math.floor(newTime / 60);
  let seconds = newTime % 60;

  //convert the minutes and seconds to a string
  minutes = minutes.toString();
  seconds = seconds.toString();

  //add a 0 to the front of the seconds if it is less then 10
  if (seconds.length === 1) {
    seconds = '0' + seconds;
  }

  
  // Loop through each column and add a new cell
  for (let i = 0; i < table.rows[0].cells.length; i++) {
    const cell = row.insertCell(-1);

    //Handle Time Cell
    if (i === 0) {
      const time = document.createElement('h3');
      time.innerHTML = minutes + ':' + seconds;
      cell.innerHTML = time.outerHTML;
    }
     else if (i === 1) {     //Handle Temp Cell
      const input = document.createElement('input');
      input.type = 'number';
      input.maxLength = '4';
      input.min = '0';
      input.max = '500';
      input.step = '1';
      input.value = '0';
      input.classList.add('input-box');
      cell.innerHTML = input.outerHTML;

     } else {     //Handle other cells

      //Create the Input Field
      const input = document.createElement('input');
      input.type = 'text';
      input.maxLength = '100';
      input.placeholder = '';
      cell.innerHTML = input.outerHTML;

     }
  }
  //Update the newTime variable
  newTime += timeInterval;

}

function removeRow(tableName) {
  let table = document.getElementById(tableName);

  const timeInterval = parseInt(document.getElementById('timeInterval').value);


  if (table.rows.length > 2) {
    table.deleteRow(-1);

    //Update the newTime variable
    newTime -= timeInterval;

  }
}

//Add a new line to the notePad
function addLine() {

  //get the Body of the Modal NotePad
  modalNoteBody = document.querySelector('.modal-body').querySelector('.mainElementContainer');
  modalNoteBody = modalNoteBody.querySelector('.element-content');

  // Create a new div element with the class "note-line"
  const newLine = document.createElement('div');
  newLine.classList.add('note-line');

  // Append the new div element to the modalNoteBody
  modalNoteBody.appendChild(newLine);
}

function removeLine() {
  //get the Body of the Modal NotePad
  //get the Body of the Modal NotePad
  modalNoteBody = document.querySelector('.modal-body').querySelector('.mainElementContainer');
  modalNoteBody = modalNoteBody.querySelector('.element-content');

  // Determine how many lines there are
  let lineCount = modalNoteBody.childElementCount;

  // If there is more then one line, remove the last line
  if (lineCount > 1) {

    // Remove the last line of the modalNoteBody
    modalNoteBody.removeChild(modalNoteBody.lastElementChild);
  }
}

function addComponent () {
  //Get the component container
  const componentContainer = document.querySelector('.modal-body').getElementsByClassName ('element-line') [2];

  //Create a new component div
  const newComponent = document.createElement('div');
  newComponent.classList.add('component');

  //add 3 div inside newComponent
  const componentName = document.createElement('div');
  componentName.style.width = '30%';
  const componentWeight = document.createElement('div');
  componentWeight.style.width = '30%';
  const componentRatio = document.createElement('div');
  componentRatio.style.width = '30%';

  //Create the input fields for each div
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.placeholder = 'Bean name';
  nameInput.maxLength = '20';
  nameInput.classList.add('input-box');

  const weightInput = document.createElement('input');
  weightInput.type = 'number';
  weightInput.placeholder = 'Bean Weight';
  weightInput.max = '9999';
  weightInput.classList.add('input-box');

  const ratioInput = document.createElement('input');
  ratioInput.type = 'number';
  ratioInput.placeholder = 'Bean Ratio';
  ratioInput.min = '0';
  ratioInput.max = '100';
  ratioInput.step = '1';
  ratioInput.classList.add('input-box');

  //Append the input fields to the divs
  componentName.appendChild(nameInput);
  componentWeight.appendChild(weightInput);
  componentRatio.appendChild(ratioInput);

  //Append the divs to the newComponent
  newComponent.appendChild(componentName);
  newComponent.appendChild(componentWeight);
  newComponent.appendChild(componentRatio);


  //Append the newComponent to the componentContainer 
  componentContainer.appendChild(newComponent);
}

function removeComponent () {
  //Get the component container
  const componentContainer = document.querySelector('.modal-body').getElementsByClassName ('element-line') [2];

  //Determine how many components there are
  let componentCount = componentContainer.childElementCount;

  //If there is more then one component, remove the last component
  if (componentCount > 1) {
    componentContainer.removeChild(componentContainer.lastElementChild);
  }
}

function addItem (event) {

  const selectedItem = event.target.parentElement;
  const mainElementContainer = document.querySelector('.modal-body').querySelector('.mainElementContainer').querySelector('.element-content');

  //Remove the selected Item from the selection container
  event.target.parentElement.remove();

  //Change the CSS Classes
  selectedItem.classList.remove('selection-line');
  selectedItem.classList.add('element-line');

  //Remove the plus button from the new element line
  selectedItem.removeChild(selectedItem.lastChild);

  //Add the minus button to the new element line
  const minusButton = document.createElement ('button');
  minusButton.classList.add('minus-button');
  minusButton.innerHTML = '-';
  minusButton.addEventListener('click', removeItem);  
  selectedItem.appendChild(minusButton);

  //Add the new element line to the mainElementContainer
  mainElementContainer.appendChild(selectedItem);
}

function removeItem (event) {

  const deletedItem = event.target.parentElement;
  const selectionContainer = document.querySelector('.modal-body').querySelector('.selection-content');

  //remove the item from the mainElementContainer
  event.target.parentElement.remove();

  //Change the CSS classes
  deletedItem.classList.remove('element-line');
  deletedItem.classList.add('selection-line');

  //remove the minus button from the item
  deletedItem.removeChild(deletedItem.lastChild);

  //add the plus button to the item
  const plusButton = document.createElement ('button');
  plusButton.classList.add('plus-button');
  plusButton.innerHTML = '+';
  plusButton.addEventListener('click', addItem);
  deletedItem.appendChild(plusButton);
  
  //add the Item back to the selection container
  selectionContainer.appendChild(deletedItem);
}


function populateElement () {
  //get Session Data
  let selectedElement = sessionStorage.getItem('selectedElement');
  let canvasElement = document.getElementById(selectedElement);

  const mainElementContainer = document.querySelector('.modal-body').querySelector('.mainElementContainer').querySelector('.element-content');

  //clear the canvas element
  canvasElement.querySelector('.mainElementContainer').querySelector('.element-content').innerHTML = '';

  //Store the names of the current items in the canvas element
  const selectedItems = mainElementContainer.querySelectorAll('.element-line');

  //for each item in the mainElementContainer, add it to the canvas element
  selectedItems.forEach ((item) => {
    tempItem = item.cloneNode(true);
    tempItem.removeChild(tempItem.lastChild);

    canvasElement.querySelector('.mainElementContainer').querySelector('.element-content').appendChild(tempItem);
  })
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