/********************************************************************************
 *  Source: ../JS/resize.js
 * 
 *        Controls the resize events for the canvas, and the elements on the canvas
*           - updateElementPos() is used to update the position of the elements when the canvas is resized
*********************************************************************************/


// interact.js resize behavior for the canvas
interact('.resizeCanvas')
  .resizable({
    // resize from all edges and corners
    edges: { left: false, right: false, bottom: true, top: false },

    listeners: {
      move (event) {
        let canvas = event.target;
        const canvasArea = document.getElementById('canvas-area');
        const container = document.getElementById('content-container');

        // update the element's style
        //container.style.height = event.rect.height + 500 + 'px';

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
    autoScroll: true
  })




    /********************************************************************************
     *  Function to update the position of the elements when the canvas is resized
    *********************************************************************************/

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
  

  
    /********************************************************************************
     *  interact.js resize behavior for the elements on the canvas
    *********************************************************************************/

    //if user is not on a mobile device
    if (window.innerWidth > 768){
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
            const draggableElement = event.target

            if (draggableElement.classList.contains('title-element' || 'date-element' || 'log-element')) {
                return;
            } else {
            // update the element's style
            draggableElement.style.width = event.rect.width + 'px'
            draggableElement.style.height = event.rect.height + 'px'
            }


          }
        },
        modifiers: [
          // keep the edges inside the parent
          interact.modifiers.restrictEdges({
            outer: 'parent'
          }),
    
          // size
          interact.modifiers.restrictSize({
            min: { width: 250},
            max: { width: 600}
          })
        ],
        inertia: true
      })
    }