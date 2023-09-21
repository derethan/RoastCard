/**
 * 
 *  This file is used to controll the interactions 
 * with the Origin and Canvas Elements and the Drop Zones
 * 
 * 
**/

    // Create an object to store position information for each element
    const elementPositions = {};

// Make the Origin-element draggable:
interact('.origin-element')
    .draggable({
        inertia: true,
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'document',
                endOnly: true
            })
        ],
        autoScroll: true,
        listeners: { move: dragMoveListener }
    })
    


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


//enable draggables to be dropped into the dropzone
interact('.canvas-container')
    .dropzone({
    // only accept elements matching this CSS selector
    accept: '.draggable', // Accept any draggable element, Require element overlap for a drop to be possible
    overlap: 0.75,
    
    ondropactivate: function (event) {
        const draggableElement = event.relatedTarget;
        const dropzoneElement = event.target;
        // add active dropzone feedback
        if (draggableElement.classList.contains('origin-element')) {
            dropzoneElement.classList.add('drop-active');
        }
        
    },
    ondragenter: function (event) {
        const draggableElement = event.relatedTarget;
        const dropzoneElement = event.target;
        // add active dropzone feedback
        if (draggableElement.classList.contains('origin-element')) {
            dropzoneElement.classList.add('drop-target');
        }
    },
    ondragleave: function (event) {
        // remove the drop feedback style
        event.target.classList.remove('drop-target');
    },
    ondrop: function (event) {
        const draggableElement = event.relatedTarget;
        const dropzoneElement = event.target;

        //Check to see if the element is an origin element if so
        //reset to the initial position
        if(draggableElement.classList.contains('origin-element')){

        // Get the initial position of the dropped element 
        const initialX = parseFloat(draggableElement.getAttribute('data-initial-x'));
        const initialY = parseFloat(draggableElement.getAttribute('data-initial-y'));

        // Reset the element's position to the initial position
        draggableElement.style.transform = `translate(${initialX}px, ${initialY}px)`;
        draggableElement.setAttribute('data-x', initialX);
        draggableElement.setAttribute('data-y', initialY);
        
        // Clean up the classes used for feedback
        dropzoneElement.classList.remove('drop-target');

            // Clone the origin element
            const clone = draggableElement.cloneNode(true);
            clone.classList.remove('origin-element');
            clone.classList.add('canvas-element');


            //Create unique ID For Clone

            //store element id in variable
            var elementID = draggableElement.getAttribute('id');
            const searchString = elementID;

            //Get the number of canvas elements
            const allElements = document.querySelectorAll('.canvas-element');
            // Initialize a counter to keep track of matching elements
            let canvasElementsLength = 0;

            //search through all the canvas elements for the elementID
            for (const element of allElements) {
                const elementId = element.id;
                
                // Check if the element's ID contains the desired string
                if (elementId && elementId.includes(searchString)) {
                    canvasElementsLength++;
                }
            }

            var canvasElementID = elementID + '-' + canvasElementsLength;

            //Set the ID of the clone
            clone.setAttribute('id', canvasElementID);

            //Append the clone to the canvas
            dropzoneElement.appendChild(clone);

            if (draggableElement.classList.contains('title-element')) {
            fitty('#' + canvasElementID + ' h1');
            } else if (draggableElement.classList.contains('date-element')) {
            fitty('#' + canvasElementID + ' h3');
            } else if (draggableElement.classList.contains('text-element')) {
            fitty('#' + canvasElementID + ' p');
            }
            
            console.log(clone);     
        }
    },
    ondropdeactivate: function (event) {

        // remove active dropzone feedback
        event.target.classList.remove('drop-active');
        event.target.classList.remove('drop-target');
    }
});

// Additionally, handle dropping the element outside any dropzone
interact('body').dropzone({

    // only accept elements matching this CSS selector
    accept: '.origin-element', // Accept any draggable element    // Require element overlap for a drop to be possible

    ondrop: function (event) {
        const draggableElement = event.relatedTarget;
        const initialX = parseFloat(draggableElement.getAttribute('data-initial-x'));
        const initialY = parseFloat(draggableElement.getAttribute('data-initial-y'));

        // Reset the element's position to the initial position
        draggableElement.style.transform = `translate(${initialX}px, ${initialY}px)`;
        draggableElement.setAttribute('data-x', initialX);
        draggableElement.setAttribute('data-y', initialY);

        // Clean up the classes used for feedback
        draggableElement.classList.remove('can-drop');
    }
});


// Make the Containers for the Canvas Resizable
interact('.resizable')
  .resizable({
    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: false },

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

// this function is used in the resizing
window.dragMoveListener = dragMoveListener

function dragMoveListener(event) {
    // Update the element's position during dragging
    const target = event.target;

     // Store initial position if it hasn't been stored yet
     if (!target.hasAttribute('data-initial-x') || !target.hasAttribute('data-initial-y')) {
        target.setAttribute('data-initial-x', target.getAttribute('data-x') || '0');
        target.setAttribute('data-initial-y', target.getAttribute('data-y') || '0');
    }

    // keep the dragged position in the data-x/data-y attributes
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

     // translate the element
    target.style.transform = `translate(${x}px, ${y}px)`;
    // update the position attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

