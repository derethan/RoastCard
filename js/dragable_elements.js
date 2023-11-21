/******************************************************
 *  Controlls the Dragable properties of the Origin and Canvas Elements
******************************************************/

// Make the canvas-elements draggable to a grid
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
            interact.snappers.grid({ x: 15, y: 15 }) // Snap to size
            ],
            range: Infinity,
            relativePoints: [ { x: 0, y: 0 } ] // Snap relative to the top-left of the element
        })

    ],
    autoScroll: true,
    listeners: { move: dragMoveListener }
    })
      

//If the user is not on a mobile device
if (window.innerWidth > 768){
    // Make the Origin-elements draggable
    dragMenuItems('.origin-element');
}

function dragMenuItems (element) {
    interact(element)
    .draggable({
        inertia: true,
        modifiers: [
            interact.modifiers.restrict({
                restriction: '.content-container',
                elementRect: { top: 0, left: 0, bottom: 1, right: 1 }, //cover entire element
                endOnly: true
                })
        ],
        autoScroll: true,
        listeners: { move: dragMoveListener }
    })
}


// Make the Modal Window movable
interact('.movable')
.draggable({
    inertia: true,
    modifiers: [
        interact.modifiers.restrictRect({
            restriction: 'parent',
            endOnly: true
        })
    ],
    autoScroll: true,
    listeners: { move: dragMoveListener }
})