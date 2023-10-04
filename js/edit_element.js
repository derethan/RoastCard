function editElement (canvasElementID, elementType){

  //Determine what element is being edited

    // Get the Modal Window
    const modalWindow = document.getElementById ("editElement");

    // Get the <span> element that closes the modal
    var closeWindow = document.getElementsByClassName("close")[0];

    modalWindow.style.display = "block";

    console.log('Edit Element window Open for Element: ' + canvasElementID);
    console.log('Element Type: ' + elementType);

    // When the user clicks on <span> (x), close the modal
closeWindow.onclick = function() {
    modalWindow.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalWindow) {
    modalWindow.style.display = "none";
  }
} 
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
 

Event Listener: Attach a ‘dblclick’ event listener to the div elements that you want to make editable. This event listener should trigger a function that opens the modal box.

Modal Box: The modal box should contain a form with input fields corresponding to the editable content in the div. For example, if you want to allow users to edit text and font color, you could have a text input field and a color picker input field.

Populate Modal: When the modal box opens, populate the input fields with the current values from the div that was double-clicked. You can store a reference to this div in a variable for later use.

Save Changes: Attach an ‘onclick’ event listener to the save button in the modal box. This event listener should trigger a function that updates the content of the div using the values from the input fields in the modal box.

Update Div: In the function triggered by the save button, update the content and style of the div referenced earlier with the new values from the input fields.

Close Modal: After updating the div, close the modal box.

*/