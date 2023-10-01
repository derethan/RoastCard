/******************************************************
 *  Controlls the Dragable properties of the Origin and Canvas Elements
******************************************************/

// Make the Origin-elements draggable:
interact('.origin-element')
    .draggable({
        inertia: true,
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: '.content-container',
                endOnly: true
            })
        ],
        autoScroll: true,
        listeners: { move: dragMoveListener }
    })
    

    interact('.canvas-element')
    .draggable({
        inertia: true,
        modifiers: [
            interact.modifiers.restrict({
                restriction: 'parent',
                elementRect: { top: 0, left: 0, bottom: 1, right: 1 }, //cover entire element
                endOnly: true
              }),

            interact.modifiers.snap({
                targets: [
                interact.snappers.grid({ x: 30, y: 30 }) // Snap to a 30x30 grid
                ],
                range: Infinity,
                relativePoints: [ { x: 0, y: 0 } ] // Snap relative to the top-left of the element
            })

        ],
        autoScroll: true,
        listeners: { move: dragMoveListener }
      })
      