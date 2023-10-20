/**
 * 
 *  This file is used to controll the resizable canvas
 * 
 * 
**/


// Make the Container for the Canvas Resizable
interact('.resizeCanvas')
  .resizable({
    // resize from all edges and corners
    edges: { left: false, right: false, bottom: true, top: false },

    listeners: {
      move (event) {
        let canvas = event.target;
        const canvasArea = document.getElementById('canvas-area');

        // update the element's style
        canvas.style.width = event.rect.width + 'px';
        canvas.style.height = event.rect.height + 'px';
        canvasArea.style.height = event.rect.height + 50 + 'px';
        
        updateElementPos(canvas);
      }
      
    },
    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: 'parent'
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 300, height: 300 }
      })
    ],
    inertia: true,
    autoScroll: false
  })



/***************************************
 *  This function is used to update the Elements position when the canvas is resized
 *    - Get the canvas bottom position and Origin position and determine the difference
 *    - Get each element on the canvas, and for each element:
 *       - Get element position
 *       - Check to see if the elements bottom is below the canvas bottom
 *       - Move the element based of the difference and update the position attributes
 *    - update the Origin position attribute (data-canvas-bottom)
 * 
 *******************************************/

  function updateElementPos (canvas) {
    // Get the canvas bottom position
    let canvasPos = canvas.getBoundingClientRect();
    let canvasBottom = canvasPos.bottom;

    // Get the canvas origin position
    const CanvasElement = document.getElementById('resizable-container');
    let canvasElementPos = (parseFloat(CanvasElement.getAttribute('data-canvas-bottom')) || 0);

    // Determine the difference between the canvas bottom and the canvas element bottom
    let difference = canvasBottom - canvasElementPos;

    // Get each element on the canvas
    allElements = document.getElementsByClassName('canvas-element');

    // For each element on the canvas
    for (element of allElements) {

      //Get element position
      let elementPos = element.getBoundingClientRect();
      let elementBottom = elementPos.bottom;

      //Check to see if the elements bottom is below the canvas bottom (factor in the padding)
      if (elementBottom > canvasBottom - 25) {

      // Get the position in the data-x/data-y attributes
      const dataX = (parseFloat(element.getAttribute('data-x')) || 0);
      const dataY = (parseFloat(element.getAttribute('data-y')) || 0);

      // calculate the new position
      let x = dataX;
      let y = dataY + difference;

      // translate the element and update the position attributes
      element.style.transform = `translate(${x}px, ${y-1}px)`;
      element.setAttribute('data-x', x);
      element.setAttribute('data-y', y);
      }
      
    }
    // update the canvas bottom attribute
    CanvasElement.setAttribute('data-canvas-bottom', canvasBottom);

  }
  
/*
    // Initialize the behavior for the canvas elements
    interact('.canvas-element')
    .resizable({
        edges: {
            left: false,
            right: true,
            bottom: true,
            top: false,
        },
        listeners: {
          move (event) {
            const draggableElement = event.target

            // update the element's style
            draggableElement.style.width = event.rect.width + 'px'
            draggableElement.style.height = event.rect.height + 'px'
          }
        },
        modifiers: [
          // keep the edges inside the parent
          interact.modifiers.restrictEdges({
            outer: 'parent'
          }),
    
          // minimum size
          interact.modifiers.restrictSize({
            min: { width: 100, height: 100 }
          })
        ],
        inertia: true
      })*/