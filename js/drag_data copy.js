/**
 * 
 *  This file is used to controll the interactions 
 * with the Origin and Canvas Elements and the Drop Zones
 * 
 * 
**/

    // Create an object to store position information for each element
    const elementPositions = {};




    // Initialize the behavior for the canvas elements
    interact('.canvas-element')
    .resizable({
        edges: {
            left: false,
            right: true,
            bottom: false,
            top: false,
        },
        listeners: {
          move (event) {
            var target = event.target
            var x = (parseFloat(target.getAttribute('data-x')) || 0)
            var y = (parseFloat(target.getAttribute('data-y')) || 0)
    
            // update the element's style
            target.style.width = event.rect.width + 'px'
            target.style.height = event.rect.height + 'px'
    
            // translate when resizing from top or left edges
            x += event.deltaRect.left
            y += event.deltaRect.top
    
            target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

            fitty.fitAll();
          }
        },
        modifiers: [
          // keep the edges inside the parent
          interact.modifiers.restrictEdges({
            outer: 'parent'
          }),
    
          // minimum size
          interact.modifiers.restrictSize({
            min: { width: 100, height: 50 }
          })
        ],
        inertia: true
      })
      .draggable({
        modifiers: [
          interact.modifiers.snap({
            targets: [
              interact.snappers.grid({ x: 30, y: 30 }) // Snap to a 30x30 grid
            ],
            range: Infinity,
            relativePoints: [ { x: 0, y: 0 } ] // Snap relative to the top-left of the element
          }),
          interact.modifiers.restrict({
            restriction: 'parent',
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }, //cover entire element
            endOnly: true
          })
        ],
        inertia: true
      })
      .on('dragstart', function (event) { // When the Element Starts to Drag
        // Target the Dragged Element
        const target = event.target;

        // Get the initial position of the canvas element 
        const initialX = parseFloat(target.getAttribute('data-x'));
        const initialY = parseFloat(target.getAttribute('data-y'));
     
        // Store the position of the dragged element
        elementPositions[target] = { x: initialX, y: initialY };
      })
      .on('dragmove', function (event) { // When the Element is being Dragged
        const target = event.target; // target the dragged element
        
        // Get the initial position of the canvas element
        const position = elementPositions[target];

        // Update the position based on the drag movement
        position.x += event.dx;
        position.y += event.dy;

        // Update the element's position attribute
        target.setAttribute('data-x', position.x);
        target.setAttribute('data-y', position.y);
        
        // Translate the element
        target.style.transform = `translate(${position.x}px, ${position.y}px)`;
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