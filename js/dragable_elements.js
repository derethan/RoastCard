/******************************************************
 *  Controlls the Dragable properties of the Origin and Canvas Elements
******************************************************/

// Make the Origin-elements draggable:
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
    