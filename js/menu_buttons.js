/******************************************************
 *  Controls the Menu Bar Buttons
 *  - Clears The Canvas
 *  - Prints the Canvas Area
******************************************************/

// Create an input element of type "file"
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = '.rlog'; // This will only accept .rlog files
fileInput.style.display = "none"; // Hide the input element

// Trigger the click event of the fileInput element when Load is clicked
const loadButton = document.getElementById("load-button");
loadButton.addEventListener("click", () => {
fileInput.click();
});

function resetCanvas () {
    const canvasContainer = document.getElementById('canvas-container');
    canvasContainer.textContent = '';
};


function printCanvas() {
    const canvasContainer = document.getElementById('canvas-container');
    let printContents = canvasContainer.innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}

function saveCanvas () {
    const canvasContainer = document.getElementById('canvas-container');
    let saveContents = canvasContainer.innerHTML;

    //prompt the user to enter a file name
    let fileName = prompt("Please enter a file name", "RoastCard");
    
    //save the contents of saveContent to a file
    let blob = new Blob([saveContents], {type: "text/plain;charset=utf-8"});

    // Prompt the user before downloading the file
    if (confirm("Do you want to download the RoastCard file?")) {
        // Save the Blob object as a file using the saveAs function from FileSaver.js
        saveAs(blob, fileName + ".rlog");
    }
}


function loadCanvas () {
    const canvasContainer = document.getElementById('canvas-container');
        
    // Add an event listener to the input element to handle file selection
    fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    
    // Use the FileReader API to read the contents of the selected file
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
    const fileContents = reader.result;
    canvasContainer.innerHTML = fileContents;

        };
    });


}

