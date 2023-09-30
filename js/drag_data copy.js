/**
 * 
 *  This file is used to controll the interactions 
 * with the Origin and Canvas Elements and the Drop Zones
 * 
 * 
**/





      





      .on('dragstart', function (event) { // When the Element Starts to Drag
        // Target the Dragged Element
        const draggableElement = event.target;

        // Get the initial position of the canvas element 
        const initialX = parseFloat(draggableElement.getAttribute('data-x'));
        const initialY = parseFloat(draggableElement.getAttribute('data-y'));
     
        // Store the position of the dragged element
        elementPositions[draggableElement] = { x: initialX, y: initialY };

        console.log(elementPositions);
      })

      .on('dragmove', function (event) { // When the Element is being Dragged
        const draggableElement = event.target; // target the dragged element
        
        // Get the initial position of the canvas element
        const position = elementPositions[draggableElement];
        console.log(position);

        // Update the position based on the drag movement
        position.x += event.dx;
        position.y += event.dy;

        // Update the element's position attribute
        draggableElement.setAttribute('data-x', position.x);
        draggableElement.setAttribute('data-y', position.y);
        
        // Translate the element
        draggableElement.style.transform = `translate(${position.x}px, ${position.y}px)`;

        console.log(position);

       })
  

  /*

  
              if (draggableElement.classList.contains('title-element')) {
              fitty('#' + canvasElementID + ' h1');
              } else if (draggableElement.classList.contains('date-element')) {
              fitty('#' + canvasElementID + ' h3');
              } else if (draggableElement.classList.contains('text-element')) {
              fitty('#' + canvasElementID + ' p');
              }
           

*/