

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

    //Add Event Listeners to the Origin Elements to close the Widget Menu and clone the element
    const originElement = document.querySelectorAll(".origin-element");
    originElement.forEach(n => n.setAttribute('onclick', 'addElement(' + "'" + n.id + "'" +')'));

    const buttonContainer = document.querySelector(".mobile-button-container");
    const hamburger = document.querySelector(".widgetHamburger");
    const widgetMenu = document.querySelector(".element-bar");


    //Show the Widget Menu
    buttonContainer.classList.toggle("active");
    hamburger.classList.toggle("active");
    widgetMenu.classList.toggle("active");
}

function closewidgetMenu() {
    const buttonContainer = document.querySelector(".mobile-button-container");
    const hamburger = document.querySelector(".widgetHamburger");
    const widgetMenu = document.querySelector(".element-bar");

    //Remove the onclick event listeners from the origin elements
    const widgetElements = document.querySelectorAll(".origin-element");
    widgetElements.forEach(n => n.removeAttribute('onclick')); 

    //Hide the Widget Menu
    buttonContainer.classList.remove("active");
    hamburger.classList.remove("active");
    widgetMenu.classList.remove("active");
}


function openHelpMenu () {
    const helpMenu = document.querySelector(".helpmodal");
    helpMenu.classList.toggle("active");

    if (document.body.style.overflow === "hidden") {
        document.body.style.overflow = "auto";
    } else {
        document.body.style.overflow = "hidden";
    }

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

function printCanvas(elementId) {
    let printContent = document.getElementById(elementId).innerHTML;
    let css = './css/style.css';

    let newWin = window.open('', '_blank');
    newWin.document.open();
    newWin.document.write('<html><head><link rel="stylesheet" href="' + css + '"></head><body onload="window.print()">' + printContent + '</body></html>');
    newWin.document.close();

    // Close the window after a delay
    setTimeout(function() {
        newWin.close();
    }, 500);
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
        
    // Add an event listener to the input element to handle file selection
    fileInput.addEventListener('change', (event) => {
    const canvasContainer = document.getElementById('canvas-container');

    const file = event.target.files[0];
    
    // Use the FileReader API to read the contents of the selected file
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
        const fileContents = reader.result;
        canvasContainer.innerHTML = fileContents;
        };
    });

    //clear the file input
    fileInput.value = null;
}

function loadSample (sample) {
    const canvasContainer = document.getElementById('canvas-container');

    switch (sample) {
        case "1":
            fileName = "RoastCard_Sample_Basic";
            break;
        case "2":
            fileName = "RoastCard_sample_med";
            break;
        case "3":
            fileName = "RoastCard_sample_full";
    }

    fetch (sourcePath + fileName + ".rlog")
    .then(response => response.text())
    .then(data => {
        const sampleHTML = data;
        canvasContainer.innerHTML = sampleHTML;
    })
    .catch(error => {
        console.log(error);
    });

    openHelpMenu();
}