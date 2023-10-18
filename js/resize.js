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
    inertia: true
  })

  
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