/******************************************************
 *  This file controlls the dropzone locations that the 
 * draggable origin and canvas elements can be placed
******************************************************/

// Handle dropping the element outside any dropzone
interact('html').dropzone({

    // only accept elements matching this CSS selector
    accept: '.origin-element', // Accept any draggable element    // Require element overlap for a drop to be possible

    ondrop: function (event) {
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

