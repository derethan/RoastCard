function editElement (canvasElementID){

    // Get the Modal Window
    const modalWindow = document.getElementById ("editElement");

    // Get the <span> element that closes the modal
    var closeWindow = document.getElementsByClassName("close")[0];

    modalWindow.style.display = "block";

    console.log('Edit Element window Open for Element: ' + canvasElementID);

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


