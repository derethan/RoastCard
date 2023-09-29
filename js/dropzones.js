/******************************************************
 *  This file controlls the dropzone locations that the 
 * draggable origin and canvas elements can be placed
 * 
 * Reference:
 *              event.target = Drop Location (dropZone)
 *              event.relatedTarget = Item being dropped (draggableElement)
******************************************************/


//  Handle dropping the element outside any dropzone, 
//  retuns the elemnt to its original position on the Element Panel
interact('html').dropzone({

    // only accept elements matching this CSS selector
    accept: '.origin-element',

    ondrop: function (event) { 
        //Sets the Item being Dragged and the initial X, Y Cordinates of the Item.
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

