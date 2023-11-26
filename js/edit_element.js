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
  const elementTypes = [];
  for (element of originElements) {
    elementTypes.push(element.id);
  }

  //For each element type, fetch the html content and store it in the htmlContent object
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
*     - editElement() is called when the user double clicks an element
        - Determines what edit window to open based on the element type

*     - loadModal() loads the html content for the selected element
*     - loadElementContent() updates the content in the modal window
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

//function to load the modal Data for the selected element type
async function loadModal(elementType) {

  //get the html content for the selected element type
  let data = await htmlContent[elementType];

  // Insert Content into the modal window
  let modalContent = document.querySelector('.modal-body');
  modalContent.innerHTML = data;

  const modalTitle = document.getElementById('modalTitle');

  // Create the function name for the update function
  let functionName = 'get' + elementType + 'Data';
  functionName = functionName.replace('-element', '');
  
  let elementTypeCapitalized = elementType.charAt(0).toUpperCase() + elementType.slice(1);
  let updateFunction = 'update' + elementTypeCapitalized + '()';
  updateFunction = updateFunction.replace('-element', '');

  let title = elementTypeCapitalized.replace('-element', '');
  modalTitle.innerHTML = 'Update your ' + title;

  // If the user is not on a mobile device (screen width more than 768px), make the modal window movable
  if (window.innerWidth > 768) {
    let modalContent = document.querySelector('.modal-content');
    modalContent.classList.add('movable');
  } else {
    // let spacer = document.querySelector('.spacer');
    // spacer.style.width = 'auto';
  }

  //try to load the function for the selected element
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
  const selectedElement = sessionStorage.getItem('selectedElement');
  const canvasElement = document.getElementById(selectedElement);

  let title = canvasElement.getElementsByTagName('h1')[0].innerHTML;
  document.getElementById('new-title').value = title;


  let fontSize = canvasElement.getElementsByTagName('h1')[0].style.fontSize;  
  switch (fontSize) {
    case '12px':
      document.getElementById('font-size').selectedIndex = '0';
      break;
    case '18px':
      document.getElementById('font-size').selectedIndex = '1';
      break;
    case '24px':
      document.getElementById('font-size').selectedIndex = '2';
      break;
    case '36px':
      document.getElementById('font-size').selectedIndex = '3';
      break;
    case "48px":
      document.getElementById('font-size').selectedIndex = '4';
      break;
    case "60px":
      document.getElementById('font-size').selectedIndex = '5';
      break;
    case "72px":
      document.getElementById('font-size').selectedIndex = '6';
  }

  //Get the font color and convert to a Hex value
  let fontColor = canvasElement.getElementsByTagName('h1')[0].style.color;
  fontColor = fontColor.replace('rgb(', '');
  fontColor = fontColor.replace(')', '');
  fontColor = fontColor.split(', ');

  // Convert RGB to Hex
  fontColor = rgbToHex(parseInt(fontColor[0]), parseInt(fontColor[1]), parseInt(fontColor[2]));

  //Set the value of the font color input field
  document.getElementById('font-color').value = fontColor;
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
    modalTable.rows[0].cells[i].innerHTML = '<input type="text" value="' + columnHeaders[i] + '" maxlength="10" name="Header">';
  }

  //for each row in the table, store the value of the input fields in the cells
  let rowCount = modalTable.rows.length;

  for (let row = 1; row < rowCount; row++) {
    let cellCount = modalTable.rows[row].cells.length;

    for (let cell = 1; cell < cellCount; cell++) {
      let value = logTable.rows[row].cells[cell].innerHTML;

      if (cell === 1) {
        modalTable.rows[row].cells[cell].innerHTML = '<input type="number" class="input-box" value="' + value + '" maxlength="4" name="Temp">';
      } else if (cell === 2) {
        modalTable.rows[row].cells[cell].innerHTML = '<input type="text" class="input-box" value="' + value + '" maxlength="100" name="Notes">';
      } else {
        modalTable.rows[row].cells[cell].innerHTML = '<input type="text" class="input-box" value="' + value + '" maxlength="25" name="other">';
      }
    }
  }

  //If Rowcount is greater then 1
  if (rowCount > 2) {
    //Get the value of the first cell in row 2 and convert it to an integer
    let timeString = canvasElement.querySelector('.log-table').rows[2].cells[0].firstChild.innerHTML;
    let timeParts = timeString.split(':');
    let hours = parseInt(timeParts[0]);
    let minutes = parseInt(timeParts[1]);
    let timeInterval = (hours * 60) + minutes;

    //Set the value of the time interval input field
    document.getElementById('timeInterval').value = timeInterval;
  }
}

function getnoteData() {
  //get Session Data
  let selectedElement = sessionStorage.getItem('selectedElement');
  let canvasElement = document.getElementById(selectedElement);


  //loads the data from the canvas element into the modal window
  loadElementContent ();


  //modal Content area
  const buttonContainer = document.querySelector('.modal-body').querySelector('.log-button-container');
  buttonContainer.style.display = 'none';
  
  const mainElementContainer = document.querySelector('.modal-body').querySelector('.mainElementContainer');
  const contentArea = mainElementContainer.querySelector('.element-content');


  // Create a text area for the notes
  const textArea = document.createElement('textarea');
  textArea.maxLength = '1000';
  textArea.placeholder = 'Notes';
  textArea.name = 'notePad';
  textArea.classList.add('input-box');
  textArea.style.minWidthidth = '96%';
  textArea.style.maxWidth = '96%';
  textArea.style.minHeight = '150px';
  

  //if a pre element exists
  if (canvasElement.querySelector('.mainElementContainer').querySelector('pre') != null) {
    //Get the text in the text area
    let noteText = canvasElement.querySelector('.mainElementContainer').querySelector('pre').textContent;
    textArea.value = noteText;
  }

  contentArea.innerHTML = '';
  contentArea.appendChild(textArea);
}

function getbatchData () {
  //Get session Data
  let selectedElement = sessionStorage.getItem('selectedElement');
  let canvasElement = document.getElementById(selectedElement);

  //loads the data from the canvas element into the modal window
  loadElementContent ();
}

function getblendData () {
  //loads the data from the canvas element into the modal window
  loadElementContent ();

  //get Session Data
  let selectedElement = sessionStorage.getItem('selectedElement');
  let canvasElement = document.getElementById(selectedElement);

  //Get the number of components in the canvas element
  let componentCount = canvasElement.querySelectorAll('.component').length; 

  //Get the blend name from the canvas element
  let blendName = canvasElement.querySelector('.blend-name').childNodes[1].innerHTML;

  // Get the blend from the modal window
  let modalContent = document.querySelector('.modal-body').querySelector('.mainElementContainer');

  //Create a input box for the blend name
  let blendNameInput = document.createElement('input');
  blendNameInput.type = 'text';
  blendNameInput.name = 'blendName';
  blendNameInput.placeholder = 'Blend Name';
  blendNameInput.maxLength = '20';
  blendNameInput.classList.add('input-box');
  blendNameInput.style.maxWidth = '60%';
  blendNameInput.value = blendName;

  //Get the blend name container
  let nameContainer = modalContent.querySelector('.blend-name');

  //remove the second child of the blend name container and add the input box
  nameContainer.removeChild(nameContainer.childNodes[1]);
  nameContainer.appendChild(blendNameInput);  

      
  //If there is a component, replace the divs with input boxes
  if (componentCount > 0) {

    //For each Blend Component in the canvas element, replace the divs with input boxes
    for (let i = 0; i < componentCount; i++) {

      //Store the name, weight, and ratio of each component
      let blendNames = canvasElement.querySelectorAll('.component') [i].getElementsByTagName('div')[0].innerHTML;
      let blendWeight = canvasElement.querySelectorAll('.component') [i].getElementsByTagName('div')[1].innerHTML;
      blendWeight = blendWeight.replace('g', '');
      let blendRatio = canvasElement.querySelectorAll('.component') [i].getElementsByTagName('div')[2].innerHTML;
      blendRatio = blendRatio.replace('%', '');

      //Convert the Component Names to input boxes in the Modal Window
      modalContent.querySelectorAll('.component') [i].childNodes[0].innerHTML = '<input type="text" class="input-box" value="' + blendNames + '" maxlength="20">';
      modalContent.querySelectorAll('.component') [i].childNodes[0].classList.remove ('input-box');
      modalContent.querySelectorAll('.component') [i].childNodes[1].innerHTML = '<input type="number" class="input-box" value="' + blendWeight + '" max="9999">';
      modalContent.querySelectorAll('.component') [i].childNodes[1].classList.remove ('input-box');
      modalContent.querySelectorAll('.component') [i].childNodes[2].innerHTML = '<input type="number" class="input-box" value="' + blendRatio + '" min="0" max="100" step="1">';
      modalContent.querySelectorAll('.component') [i].childNodes[2].classList.remove ('input-box');
    }
  }
}

function getbeanData () {
  const selectionItems = ['Origin:', 'Farm:', 'Variety:', 'Process:', 'Elevation:', 'Harvest Year:', 'Roast Level:',
   'Green Weight:', 'Roast Weight:', 'Reduction (%):'];

    //loads the data from the canvas element into the modal window
    loadElementContent ();
    getSelectionData(selectionItems);
}

function gettempData () {
    //Store an array of temperature related items
    const selectionItems = ['Ambient Temp:', 'Humidity:',"Yellowing Temp:", "Browing Temp:", "First Crack Temp:", "Second Crack Temp:", "Drop Temp:"];

    //loads the data from the canvas element into the modal window
    loadElementContent ();
    getSelectionData(selectionItems);
}

function gettimingData () {
    //Store an array of timing related items
  const selectionItems = ['Roast Start Time:', 'Roast End Time:', 'Roast Duration:', 'Yellowing Start Time:', 'Brown Start Time:', 'Maillard reaction Start Time:',
  'First Crack Start Time:', 'First Crack End Time:', 'First Crack Duration:','Second Crack Start Time:', 'Second Crack End Time:', 'Second Crack Duration:', 
  'Development time:', 'Development Ratio:'];

    //loads the data from the canvas element into the modal window
    loadElementContent ();
    getSelectionData(selectionItems);
}

function getSelectionData (selectionItems) {
  //Get session Data
  let selectedElement = sessionStorage.getItem('elementType');

  document.querySelector('.modal-body').classList.add('row');
  document.querySelector('.modal-body').classList.add('gap5');


  /******* Handle the Main Element Container********/
  const selectionContainer = document.querySelector('.modal-body').querySelector('.selection-content');
  const mainElementContainer = document.querySelector('.modal-body').querySelector('.mainElementContainer').querySelector('.element-content');

  //Store the items in the element container
  const selectedItems = mainElementContainer.querySelectorAll('.element-line');

    //for each item in the mainElementContainer
    selectedItems.forEach ((item) => {
  
      //Get the data from the item
      let value;
      if (item.querySelector('p') != null) {
      value = item.querySelector('p').innerHTML;

      //remove the text element
      item.removeChild(item.lastChild);
      }
      else {
        value = '';
      }
      //add an input box to the item
      const input = document.createElement('input');
      input.type = 'text';
      input.maxLength = '20';
      input.name = 'item';
      input.classList.add('input-box');
      input.value = value;
      input.style.maxWidth = '50%';
      item.appendChild(input);

      //Add a minus button to the item
      const minusButton = document.createElement ('button');
      minusButton.classList.add('minus-button');
      minusButton.innerHTML = '-';
      minusButton.addEventListener('click', removeItem);  
      item.appendChild(minusButton);
    })


      /******* Handle the selection items Container********/

    selectionItems.forEach((item) => {
      addSelectionItem(item);
    })

  function addSelectionItem (item) {
    
    //Check to see if the Item in TempArray matches an item from selectedItems
    let itemExists = false;
    for (let i = 0; i < selectedItems.length; i++) {
      if (item === selectedItems[i].firstChild.innerHTML) {
        itemExists = true;
      }
    }

    //If the item does not exist, create a new item
    if (itemExists === false) {

    //Creates a new Div Element with the class "selection-line"
    const selectableItem = document.createElement('div');
    selectableItem.classList.add('selection-line');

    // Adds the Text to the new Div Element
    const text = document.createElement ('h4');
    text.innerHTML = item;
    selectableItem.appendChild(text);

    //Adds the plus Button to the new Div Element
    const plusButton = document.createElement ('button');
    plusButton.classList.add('plus-button');
    plusButton.innerHTML = '+';
    plusButton.addEventListener('click', addItem);
    selectableItem.appendChild(plusButton);

    //Append the new Element to the selectionContainer
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

    //update time intervals
    updateTime ('log-table')

  // Get the log-Table from the modal window
  let modalTable = document.getElementById('log-table');
  canvasElement.querySelector('.log-table').innerHTML = modalTable.innerHTML;

  // Get the number of TH elements in the table
  let columnCount = modalTable.rows[0].cells.length;
  let rowCount = modalTable.rows.length;

  // for each TH Element, store the content of the TH input field
  let columnHeaders = [];
  for (let i = 0; i < columnCount; i++) {
    columnHeaders.push(modalTable.rows[0].cells[i].getElementsByTagName('input')[0].value); //store the text of the TH
    canvasElement.querySelector('.log-table').rows[0].cells[i].innerHTML = columnHeaders[i];

    if (columnHeaders[i] === 'Notes' || columnHeaders[i] === 'notes') {
      canvasElement.querySelector('.log-table').rows[0].cells[i].style.width = '150px';
    }
  }


  // for each row in the table, store the value of the input fields in the cells
  for (let row = 1; row < rowCount; row++) {
    let cellCount = modalTable.rows[row].cells.length;

    for (let cell = 1; cell < cellCount; cell++) {
      let value = modalTable.rows[row].cells[cell].getElementsByTagName('input')[0].value;

      canvasElement.querySelector('.log-table').rows[row].cells[cell].innerHTML = value;
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

  //Get the content from the textarea, maintianing the formatting
  let preElement = document.createElement('pre');
  preElement.textContent = modalNote.querySelector('textarea').value;

  canvasElement.querySelector('.mainElementContainer').querySelector('.element-content').innerHTML = '';

  //if the notePad is empty, add 3 note lines
  if (preElement.textContent === '') {
    for (let i = 0; i < 3; i++) {
      const newLine = document.createElement('div');
      newLine.classList.add('note-line');

      //update the canvas element
      canvasElement.querySelector('.mainElementContainer').querySelector('.element-content').appendChild(newLine);
    }

  } else {
  //Update the canvas element with the new note, maintaining the formatting
  canvasElement.querySelector('.mainElementContainer').querySelector('.element-content').appendChild(preElement);
  }


  // canvasElement.querySelector('.mainElementContainer').innerHTML = modalNote.innerHTML;

  closeModal();
}

function updateBlend() {
  //get Session Data
  let selectedElement = sessionStorage.getItem('selectedElement');
  let canvasElement = document.getElementById(selectedElement);

  // Get the blend from the modal window
  modalContent = document.querySelector('.modal-body').querySelector('.mainElementContainer');

  //Get the number of components in the blend
  let componentCount = modalContent.querySelectorAll('.component').length; 

  //replace blend name input box with a text element
  let nameElement = document.createElement('p');
  nameElement.innerHTML = modalContent.querySelector('.blend-name').querySelector('input').value;

  modalContent.querySelector('.blend-name').querySelector('input').remove();
  modalContent.querySelector('.blend-name').appendChild(nameElement);


  //for each component, replacde the input boxes with divs
  for (let i = 0; i < componentCount; i++) {

    //Store the name, weight, and ratio of each component
    let blendNames = modalContent.querySelectorAll('.component') [i].getElementsByTagName('input')[0].value;
    let blendWeight = modalContent.querySelectorAll('.component') [i].getElementsByTagName('input')[1].value;
    let blendRatio = modalContent.querySelectorAll('.component') [i].getElementsByTagName('input')[2].value;


    //Convert the input boxes to divs
    modalContent.querySelectorAll('.component') [i].childNodes[0].innerHTML = blendNames;
    modalContent.querySelectorAll('.component') [i].childNodes[0].classList.add ('input-box');

    modalContent.querySelectorAll('.component') [i].childNodes[1].innerHTML = blendWeight + 'g';
    modalContent.querySelectorAll('.component') [i].childNodes[1].classList.add ('input-box');
    modalContent.querySelectorAll('.component') [i].childNodes[1].classList.add ('text-center');

    
    modalContent.querySelectorAll('.component') [i].childNodes[2].innerHTML = blendRatio + '%';
    modalContent.querySelectorAll('.component') [i].childNodes[2].classList.add ('input-box');
    modalContent.querySelectorAll('.component') [i].childNodes[2].classList.add ('text-center');
  }

  //Update the canvas element with the new blend
  canvasElement.querySelector('.mainElementContainer').innerHTML = modalContent.innerHTML;

  closeModal();
}

function updateWeight () {
  closeModal();
}
function updateBean () {
  closeModal();
}
function updateBatch () {
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


  /******* Function to add a column to a table - Call tablename in paramenter********/

function addColumn(tableName) {

  //Stores the Table Element
  let logTable = document.getElementById(tableName);

  //Stores the number of columns in the table
  let columnCount = logTable.rows[0].cells.length;
  let allowedColumns = 0;

  //Determine the number of columns allowed
  if (tableName === 'roastChartLog') {
    allowedColumns = 3;
  } else {
    allowedColumns = 3;
  }

  //If number of columns is not greater then allowed, add a column
  if (columnCount < allowedColumns) {

    for (let i = 0; i < logTable.rows.length; i++) { //for each row in the table

      //if its the first row add a table Header
      if (i === 0) {
        const header = document.createElement('th');
        const input = document.createElement('input');
        input.type = 'text';
        input.name = 'header';
        input.maxLength = '10';
        input.placeholder = 'New Header';

        if (columnCount === 2) //if there are only 2 columns, set the 3rd header to 'Notes'
        {
          //if the table is the roastChartLog, set the header to a text element 'Notes'
          if (tableName === 'roastChartLog') {
            header.innerHTML = 'Notes';
          } else {
            input.value = 'Notes'; 
            header.appendChild(input);
          }
          logTable.rows[i].appendChild(header);
        } else {
          header.appendChild(input);
          logTable.rows[i].appendChild(header);
        }

      } else {
          
        if (tableName === 'roastChartLog') {
          const cell = logTable.rows[i].insertCell(-1);

          const input = document.createElement('input');
          input.type = 'text';
          input.name = 'notes';
          input.maxLength = '25';
          input.placeholder = 'Notes';

          cell.appendChild(input);


        } else {
          const cell = logTable.rows[i].insertCell(-1);
          const input = document.createElement('input');
          input.type = 'text';
          input.name = 'notes';
          input.maxLength = '25';
          input.placeholder = 'Notes';

          cell.appendChild(input);        
        }
      }
    }
  }
}

  /******* Function to remove a column from a table - Call tablename in paramenter********/

function removeColumn(tableName) {
  //Remove the last column from the table
  let logTable = document.getElementById(tableName);
  let columnCount = logTable.rows[0].cells.length;

  //If there are more then 2 columns, remove the last column
  if (columnCount > 2) {
    for (let i = 0; i < logTable.rows.length; i++) {
      logTable.rows[i].deleteCell(-1);
    }
  }
}


  /******* Function to add a row to a table - Call tablename in paramenter********/

function addRow(tableName) {
  //Stores the Table Element
  let table = document.getElementById(tableName);
  let row = table.insertRow(-1);


  // Loop through each column and add a new cell
  for (let i = 0; i < table.rows[0].cells.length; i++) {
    const cell = row.insertCell(-1);

      if (tableName === 'roastChartLog' || tableName === 'log-table') {
        //Handle Time Cell
        if (i === 0) {
          updateTime(tableName);
        }
        else if (i === 1) {     //Handle Temp Cell
          const input = document.createElement('input');
          input.type = 'number';
          input.name = 'temperature';
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
          input.placeholder = 'Notes';
          input.name = 'notes';
          cell.innerHTML = input.outerHTML;
        }
      }
  }
}

  /******* Function to remove a row from a table - Call tablename in paramenter********/

function removeRow(tableName) {
  let table = document.getElementById(tableName);
  const timeInterval = parseInt(document.getElementById('timeInterval').value);

  if (table.rows.length > 2) {
    table.deleteRow(-1);
  }
}

  /******* Function to add a line to the notepad********/
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

  /******* Function to remove a line to the notepad********/
function removeLine() {
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

  /******* Function to create a new Blend Component********/
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
  nameInput.name = 'beanName';
  nameInput.placeholder = 'Bean name';
  nameInput.maxLength = '20';
  nameInput.classList.add('input-box');

  const weightInput = document.createElement('input');
  weightInput.type = 'number';
  weightInput.name = 'beanWeight';
  weightInput.placeholder = 'Bean Weight';
  weightInput.max = '9999';
  weightInput.classList.add('input-box');

  const ratioInput = document.createElement('input');
  ratioInput.type = 'number';
  ratioInput.name = 'beanRatio';
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

  /******* Function to remove a Blend Component********/
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

  /******* Function to add an item to the selected items Container for List elements********/
  /******* Called when the user clicks the plus button on an item in the selection container********/
function addItem (event) {

  //Get the selected item (the parent of the plus button)
  const selectedItem = event.target.parentElement;
  const mainElementContainer = document.querySelector('.modal-body').querySelector('.mainElementContainer').querySelector('.element-content');

  //Remove the selected Item from the selection container
  event.target.parentElement.remove();

  //Change the CSS Classes
  selectedItem.classList.remove('selection-line');
  selectedItem.classList.add('element-line');

  //Remove the plus button from the new element line
  selectedItem.removeChild(selectedItem.lastChild);

  //Add an input box to the new element line
  const input = document.createElement('input');
  input.type = 'text';
  input.maxLength = '20';
  input.name = 'item';
  input.classList.add('input-box');
  input.style.maxWidth = '50%';
  selectedItem.appendChild(input);

  //Add the minus button to the new element line
  const minusButton = document.createElement ('button');
  minusButton.classList.add('minus-button');
  minusButton.innerHTML = '-';
  minusButton.addEventListener('click', removeItem);  
  selectedItem.appendChild(minusButton);

  //Add the new element line to the mainElementContainer
  mainElementContainer.appendChild(selectedItem);
}



  /******* Function to remove an item from the Element container and add it to the selectable Items List ********/
  /******* Called when the user clicks the Minus button on an item in the selection container********/
function removeItem (event) {

  //Get the item to be deleted
  const deletedItem = event.target.parentElement;
  //Get the selection list container
  const selectionContainer = document.querySelector('.modal-body').querySelector('.selection-content');

  //remove the item from the mainElementContainer
  event.target.parentElement.remove();

  //Change the CSS classes
  deletedItem.classList.remove('element-line');
  deletedItem.classList.add('selection-line');

  //remove the minus button from the item
  deletedItem.removeChild(deletedItem.lastChild);
  //remove the input box from the item
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

  //Store the the current selected items
  const selectedItems = mainElementContainer.querySelectorAll('.element-line');

  //for each item in the mainElementContainer, add it to the canvas element
  selectedItems.forEach ((item) => {
    tempItem = item.cloneNode(true);

    //get the value of the input box
    let value = tempItem.querySelector('input').value;

    //remove the input box and the minus button from the tempItem
    tempItem.removeChild(tempItem.lastChild);
    tempItem.removeChild(tempItem.lastChild);

    //Create a text element for the user content and add to the tempItem
    let text = document.createElement('p');
    text.innerHTML = value;
    tempItem.appendChild(text);

    //update the canvas element
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

// Function to convert RGB to Hex
function rgbToHex(r, g, b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
}