

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

    const buttonContainer = document.querySelector(".mobile-button-container");
    const hamburger = document.querySelector(".widgetHamburger");
    const widgetMenu = document.querySelector(".element-bar");


    //Show the Widget Menu
    buttonContainer.classList.toggle("active");
    hamburger.classList.toggle("active");
    widgetMenu.classList.toggle("active");

    originElement.forEach(menuItem => {

        // If the menu is active, Add an onclick event listener to the origin elements
        if (document.querySelector(".element-bar").classList.contains("active")) {
            menuItem.setAttribute('onclick', 'addElement(' + "'" + menuItem.id + "'" +')');
            menuItem.classList.add("cursor-pointer");
            removeInteractFromElement('.origin-element');
        } else {
            menuItem.removeAttribute('onclick');
            menuItem.classList.remove("cursor-pointer");
            dragMenuItems('.origin-element');
        }
    });
}

function closewidgetMenu() {
    const buttonContainer = document.querySelector(".mobile-button-container");
    const hamburger = document.querySelector(".widgetHamburger");
    const widgetMenu = document.querySelector(".element-bar");

    //Remove the onclick event listeners from the origin elements
    const originElement = document.querySelectorAll(".origin-element");
    originElement.forEach(menuItem => menuItem.removeAttribute('onclick')); 

    //Hide the Widget Menu
    buttonContainer.classList.remove("active");
    hamburger.classList.remove("active");
    widgetMenu.classList.remove("active");
    dragMenuItems('.origin-element');
}


function openHelpMenu () {
    const helpMenu = document.querySelector(".helpmodal");
    const helpMenuIcon = document.querySelector(".helpmenu");
    helpMenu.classList.toggle("active");

    if (helpMenu.classList.contains("active")) {
        document.body.style.overflow = "hidden";
        helpMenuIcon.classList.remove ("growShrink");
    } else {
        helpMenuIcon.classList.add ("growShrink");
        document.body.style.overflow = "auto";
    }

    //Create a session to indicate the Help Menu was viewed
    sessionStorage.setItem('helpMenu', 'true');
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

    //Remove the session storage Data
    sessionStorage.removeItem('canvasContent');
};

function printCanvas(elementId) {
    let printContent = document.getElementById(elementId).innerHTML;
    let css = './css/style.css';

    let newWin = window.open('', '_blank');
    newWin.document.open();
    newWin.document.write('<!DOCTYPE html><head><link rel="stylesheet" href="' + css + '"></head><body onload="window.print()">' + printContent + '</body></html>');
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
    const canvasContainer = document.getElementById('canvas-container');

    // Add an event listener to the input element to handle file selection
    fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    
    // Use the FileReader API to read the contents of the selected file
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
        const fileContents = reader.result;

        //if the user is on a mobile device, convert the file contents to mobile
        if (window.innerWidth < screenSize) {
            canvasContainer.innerHTML = convertToMobile(fileContents);
        }
        //if the user is on a desktop, load the file contents as is
        else {
            canvasContainer.innerHTML = fileContents;

            //Get the canvas Elements and enable Drag function
            const canvasElements = document.querySelectorAll(".canvas-element");
            canvasElements.forEach(element => {
                // Enable the drag functionality
                dragCanvasItems (element);
            });
        }

            //Update the session storage for the canvas content
            updateCanvasSession ();
        };

    });

    //clear the file input
    fileInput.value = null;
}

function convertToMobile (fileContents) {

    //Convert the file contents to dom objects
    const parser = new DOMParser();
    const doc = parser.parseFromString(fileContents, "text/html");

    //Get the canvas elements
    const canvasElements = doc.querySelectorAll(".canvas-element");

        // For each element remove the transform style
        canvasElements.forEach(element => {

            //remove the draggable and resize classes
            element.classList.remove("draggable");
            element.classList.remove("resize");
            
            //remove any width and height styles
            element.style.width = "88%";
            element.style.height = "auto";

            //add pointer cursor
            element.classList.add ('cursor-pointer');

            //remove the transform style
            element.style.transform = "none";
            console.log(element);
        });

        return doc.documentElement.innerHTML;
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

        //if the user is on a mobile device, convert the file contents to mobile
        if (window.innerWidth < screenSize) {
        canvasContainer.innerHTML = convertToMobile(sampleHTML);
        }
        //if the user is on a desktop, load the file contents as is
        else {
            canvasContainer.innerHTML = sampleHTML;

            //Get the canvas Elements and enable Drag function
            const canvasElements = document.querySelectorAll(".canvas-element");
            canvasElements.forEach(element => {
                // Enable the drag functionality
                dragCanvasItems (element);
            });
        }

        updateCanvasSession ();

        
    })
    .catch(error => {
        console.log(error);
    });

    //Update the session storage for the canvas content
    openHelpMenu();
}