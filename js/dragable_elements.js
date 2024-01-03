/******************************************************
 *  Controlls the Dragable properties of the Origin and Canvas Elements
******************************************************/


  function getItems() {
    const canvasElements = document.querySelectorAll('.canvas-element');
    let positions = [];

    // Get the position of each canvas element
    for (const element of canvasElements) {

        let rect = element.getBoundingClientRect();

        let canvasElementX = rect.left;
        let canvasElementY = rect.top;

        // Push the positions to the positions array
        positions.push({ x: canvasElementX, y: canvasElementY, range: 50 });
    }

    return positions;
}


function dragCanvasItems (element){
    // let snapTargets = getItems();
// Make the canvas-elements draggable to a grid
interact(element)
.draggable({
    inertia: true,
    modifiers: [
        interact.modifiers.restrict({
            restriction: 'parent',
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }, //cover entire element
            endOnly: true
            }),

        interact.modifiers.snap({
            targets: [  //...snapTargets,
            interact.snappers.grid({ x: 15, y: 15 }) // Snap to size
            ],
            range: Infinity,
            relativePoints: [ { x: 0, y: 0 } ] // Snap relative to the top-left of the element
        })

    ],
    // onend: function (event) {updateSnapTargets ();},
    autoScroll: true,
    listeners: { move: dragMoveListener }
    // startAxis: 'y',
    // lockAxis: 'y'
    })
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
        autoScroll: false,
        listeners: { move: dragMoveListener }
    })
}

//Remove interact from an Element
function removeInteractFromElement(element) {
    interact(element).unset();
}

// Make the Modal Window movable
interact('.movable')
.draggable({
    allowFrom: '.modal-header',
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