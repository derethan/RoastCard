
    // Create an object to store position informion
    let elementPositions = {};

function dragMoveListener(event) {
    // Update the element's position during dragging
    const target = event.target;

     // Store initial position if it hasn't been stored yet
     if (!target.hasAttribute('data-initial-x') || !target.hasAttribute('data-initial-y')) {
        target.setAttribute('data-initial-x', target.getAttribute('data-x') || '0');
        target.setAttribute('data-initial-y', target.getAttribute('data-y') || '0');
    }

    // keep the dragged position in the data-x/data-y attributes
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    elementPositions = { x: x, y: y };

     // translate the element
    target.style.transform = `translate(${x}px, ${y}px)`;
    // update the position attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

// this function is used in the resizing
window.dragMoveListener = dragMoveListener
