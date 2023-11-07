

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

/******************************************************
 *  Controls the Menu Button for Mobile Devices
******************************************************/

function mobileMenu() {
    const navLink = document.querySelectorAll(".menu-button");
    navLink.forEach(n => n.addEventListener("click", closeMenu));

    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".menu");

    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

function closeMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".menu");

    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}


/******************************************************
 *  Controls the Widget Menu Button for Mobile Devices
******************************************************/
function windgetMenu() {
    const originElement = document.querySelectorAll(".origin-element");
    originElement.forEach(n => n.addEventListener("click", closewidgetMenu));
    originElement.forEach(n => n.setAttribute('onclick', 'addElement("' + n.id + '")'));

    const buttonContainer = document.querySelector(".mobile-button-container");
    const hamburger = document.querySelector(".widgetHamburger");
    const widgetMenu = document.querySelector(".element-bar");


    
    buttonContainer.classList.toggle("active");
    hamburger.classList.toggle("active");
    widgetMenu.classList.toggle("active");
}

function closewidgetMenu() {
    const buttonContainer = document.querySelector(".mobile-button-container");
    const hamburger = document.querySelector(".widgetHamburger");
    const widgetMenu = document.querySelector(".element-bar");

    buttonContainer.classList.remove("active");
    hamburger.classList.remove("active");
    widgetMenu.classList.remove("active");
}



/******************************************************
 *  Controls the Menu Bar Buttons
 *  - Clears The Canvas
 *  - Prints the Canvas Area
 * - Saves the Canvas Area
 * - Loads a Canvas Area
******************************************************/


function resetCanvas () {
    const canvasContainer = document.getElementById('canvas-container');
    canvasContainer.textContent = '';
};


function printCanvas() {
    const canvasContainer = document.getElementById('canvas-container');
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".menu");

    let printContents = canvasContainer.innerHTML;

    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
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
    if (fileName) {
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

