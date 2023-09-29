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
    edges: { left: true, right: true, bottom: true, top: false },

    listeners: {
      move (event) {
        let target = event.target;
        const canvasArea = document.getElementById('canvas-area');

        // update the element's style
        target.style.width = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';
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


