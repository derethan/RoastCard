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
      var modalWindow = document.getElementById (modalName);
      modalWindow.style.display = "block";
      setModalData ();
      }

    }
}

function closeModal (id) {
  let modalWindow = document.getElementById (id);
  modalWindow.style.display = "none";
}

function setModalData (){

  //get Session Data
  let selectedElement = sessionStorage.getItem ('selectedElement');
  let elementType = sessionStorage.getItem ('elementType');

  if (elementType === 'title-element'){
    let title = document.getElementById(selectedElement).getElementsByTagName('h1')[0].innerHTML;
    document.getElementById('new-title').value = title;

  }
  else if (elementType === 'date-element'){
    setCurrentDate ();
  }


}

// This function is called when the user clicks the Apply Button
function updateTitle () {
  // Get the text from the text box in your modal
  let newText = document.getElementById('new-title').value;

  // Get the id of the element that was double clicked
  let selectedElement = sessionStorage.getItem('selectedElement');

  // Update the text of the selected element
  document.getElementById(selectedElement).getElementsByTagName('h1')[0].innerHTML = newText;
}


function selectedDateItem () {

// Get all the radio buttons with name 'dateOptions'
let radios = document.getElementsByName('dateOptions');

// Function to get the selected radio button value
function getSelectedValue() {
    for(let i = 0; i < radios.length; i++) {
        if(radios[i].checked) {
            return radios[i].value; // return the value of the selected radio button
        }
    }
}

// Store the selected value into a variable
let selectedValue = getSelectedValue();
console.log(selectedValue); // log the selected value
} 



function setCurrentDate(){
  let currentDate = new Date();
  let dateString = currentDate.toDateString ();

  const dateLabel = document.getElementById ('currentDateLabel');

  dateLabel.textContent = dateString;
}

/***********
 * 
 *  Edit Element Process
 * 
 *    - DBL Click element to open edit window modal 
 *      - TODO: (Add isEditable tag to Origin Elements and only open edit window accordingly)
 *    - Pass Element ID to the Modal Window
 *    - Determine What Element window to display
 *      - Search element ID, if ID contains element X then display info in editWindow accordingly
 *    - Store information from user input fields (Text, Font size, number of columns, etc)
 *    - Update Canvas Element Data with Stored Information based on the element being edited
 

Working: Event Listener: Attach a ‘dblclick’ event listener to the div elements that you want to make editable. This event listener should trigger a function that opens the modal box.

Working: Modal Box: The modal box should contain a form with input fields corresponding to the editable content in the div. For example, if you want to allow users to edit text and font color, you could have a text input field and a color picker input field.

ALPHA: Populate Modal: When the modal box opens, populate the input fields with the current values from the div that was double-clicked. You can store a reference to this div in a variable for later use.

Save Changes: Attach an ‘onclick’ event listener to the save button in the modal box. This event listener should trigger a function that updates the content of the div using the values from the input fields in the modal box.

Update Div: In the function triggered by the save button, update the content and style of the div referenced earlier with the new values from the input fields.

Close Modal: Close Modal when Close button is click (Remove close when clicking outside box)

*/



