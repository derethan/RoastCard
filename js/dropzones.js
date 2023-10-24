/******************************************************
 *  This file controlls the dropzone locations that the 
 * draggable origin and canvas elements can be placed
 * 
 * Reference:
 *              event.target = Drop Location (dropZone)
 *              event.relatedTarget = Item being dropped (draggableElement)
******************************************************/

// Handle Behaviour for the Canvas-container Drop Zone
interact('.canvas-container')
    .dropzone({
    // only accept elements matching this CSS selector
    accept: '.origin-element',
    overlap: 0.75,  //Require element overlap for a drop to be possible
    
    ondropactivate: function (event) {
        const draggableElement = event.relatedTarget;
        const dropzoneElement = event.target;

        // If Origin Element is Selected, Set Dropzone color 
        // properties to red (Active drop not in dropzone)

        if (draggableElement.classList.contains('origin-element')) {
            dropzoneElement.classList.add('drop-active-noDrop');

        }},
    ondragenter: function (event) {
        const draggableElement = event.relatedTarget;
        const dropzoneElement = event.target;

        // If Origin Element selected, Set Dropzone color
        //properties to green (Active drop is over a dropzone)

        if (draggableElement.classList.contains('origin-element')) {
            dropzoneElement.classList.add('drop-active-canDrop');
        }},
    ondragleave: function (event) {
        const draggableElement = event.relatedTarget;
        const dropzoneElement = event.target;

        // If Origin Element selected, Remove Green color when element leaves the dropzone

        if (draggableElement.classList.contains('origin-element')) {
            dropzoneElement.classList.remove('drop-active-canDrop');
        }
    },
    ondropdeactivate: function (event) {
        const draggableElement = event.relatedTarget;
        const dropzoneElement = event.target;

        // After Drop Remove Drop Feedback
        dropzoneElement.classList.remove('drop-active-canDrop');
        dropzoneElement.classList.remove('drop-active-noDrop');
    },
    ondrop: function (event) {
        const draggableElement = event.relatedTarget;
        const dropzoneElement = event.target;

        //If element is an origin element, reset to the initial position
        if(draggableElement.classList.contains('origin-element')){
            resetElement (draggableElement);
            cloneElement (draggableElement, dropzoneElement);
        }
    }
});

//  Handle dropping the element outside the dropzone, 
//  retuns the element to its original position on the Element Panel

interact('.content-container').dropzone({

    // only accept elements matching this CSS selector
    accept: '.origin-element',

    ondrop: function (event) { 
        //Sets the Item being Dragged and the initial X, Y Cordinates of the Item.
        const draggableElement = event.relatedTarget; 
        
        resetElement (draggableElement);
    }
});



function resetElement (element){
    const initialX = parseFloat(element.getAttribute('data-initial-x'));
    const initialY = parseFloat(element.getAttribute('data-initial-y'));

    // Reset the element's position to the initial position
    element.style.transform = `translate(${initialX}px, ${initialY}px)`;
    element.setAttribute('data-x', initialX);
    element.setAttribute('data-y', initialY);

}

function cloneElement (element, dropZone){
    const clone = element.cloneNode(true);

    // Set the cloned Element to a Canvas Element
    clone.classList.remove('origin-element');
    clone.classList.add('canvas-element');

    let elementType = element.getAttribute('id');
    let randomID = getID ();
    let canvasElementID = randomID;

    // Customize the Element
    customizeElement (clone, elementType);

    //Set the ID of the clone
    clone.setAttribute('id', canvasElementID);
    clone.setAttribute('ondblclick','editElement(`' + canvasElementID + '`,`' + elementType + '`' +')')


    //Append the clone to the canvas
    dropZone.appendChild(clone);
    positionElement (clone);

    if(debug == 1){
        console.log(clone); // DEBUG
    }

  }

  function getID (){

       //Get all the canvas elements
       const allElements = document.querySelectorAll('.canvas-element');
       let randomID = Math.floor(Math.random() * 9000) + 1000; //generate a random ID 4 Digits long

       //if an element exists
        if (allElements.length > 0) {
            //search through all the canvas elements
            for (const element of allElements) {
                const canvasElementID = element.id;
           
                //if the random ID matches an existing element ID, generate a new ID
                if (canvasElementID == randomID){
                    getID ();
                } else {
                    return randomID;
                }
            }
        } else {
            return randomID;
        }
  }

  //ToDo: convert to use one function for all elements, instead of if statements
  function customizeElement (clone, elementType){

    //remove element-title from the element
    elementTitle = clone.querySelector('.element-title');
    elementTitle.remove();

    if (clone.classList.contains('log-element')) {
        //display the log Table
        logTable = clone.querySelector('.log-table');
        logTable.style.display = 'block';
        
    }
    if (clone.classList.contains('note-element')) {
        //Display the Note Text Area
        notePad = clone.querySelector('.note-content');
        notePad.style.display = 'block';
    }
    

  }