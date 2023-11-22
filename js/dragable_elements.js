/******************************************************
 *  Controlls the Dragable properties of the Origin and Canvas Elements
******************************************************/
//If the user is not on a mobile device
if (window.innerWidth > 768){
    // Make the Origin-elements draggable
    dragMenuItems('.origin-element');
    dragCanvasItems ('.canvas-element');
}

function dragCanvasItems (element){
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
            targets: [  
            interact.snappers.grid({ x: 15, y: 15 }) // Snap to size
            ],
            range: Infinity,
            relativePoints: [ { x: 0, y: 0 } ] // Snap relative to the top-left of the element
        })

    ],
    onstart: function(event){
        const canvasElements = document.querySelectorAll('.canvas-element');

        //Get the position of each canvas element
        for (const element of canvasElements) {
            let canvasElementX = parseInt (element.getAttribute('data-x'));
            let canvasElementY =parseInt (element.getAttribute('data-y'));

            //Push the positions to the snapTargets array
            // snapTargets.push({ x: canvasElementX, y: canvasElementY, range: 50 });
        }
    },
    onend: function(event){
        // snapTargets = [];
    },

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