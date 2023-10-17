
    // Create an object to store position informion
    let elementPositions = {};
    let mousePositions = {};


function dragMoveListener(event) {

    // Get the element that is being dragged
    const target = event.target;

    //Gets the CanvasContainer and its position
    let canvasElement = document.getElementById('canvas-container');
    let rect = canvasElement.getBoundingClientRect();

    //Gets the mouse position
    let mousePosX = event.clientX - rect.left; // x position within the element
    let mousePosY = event.clientY - rect.top;  // y position within the element
    mousePositions = { x: mousePosX, y: mousePosY };

     // Store initial position if it hasn't been stored yet
     if (!target.hasAttribute('data-initial-x') || !target.hasAttribute('data-initial-y')) {
        target.setAttribute('data-initial-x', target.getAttribute('data-x') || '0');
        target.setAttribute('data-initial-y', target.getAttribute('data-y') || '0');
    }

    // keep the dragged position in the data-x/data-y attributes
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    elementPositions = { x: x, y: y };

     // translate the element
    target.style.transform = `translate(${x}px, ${y}px)`;
    // update the position attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

// this function is used in the resizing
window.dragMoveListener = dragMoveListener



function positionElement (element){

    //Get the mouse positions
    let x = mousePositions.x;
    let y = mousePositions.y;

    //get the element's width and height
    let elementWidth = element.offsetWidth;
    let elementHeight = element.offsetHeight;

    x = x - (elementWidth/2);
    y = y - (elementHeight/2);
    
     // translate the element
     element.style.transform = `translate(${x}px, ${y}px)`;
     // update the position attributes
     element.setAttribute('data-x', x);
     element.setAttribute('data-y', y);


};