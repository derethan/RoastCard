/**
 * 
 *  This file is used to change the container of the page
 * 
 * 
**/


// Path: js\change_container.js

const debug = 0; //Enable Debug Mode


document.addEventListener('DOMContentLoaded', function () {
    const mainContent = document.getElementById('content-container');
    const resizableContainer = document.getElementById('resizable-container');
    const canvasArea = document.getElementById('canvas-area')

    const startContainer = document.getElementById('start-container');
    const canvasContainer = document.getElementById('canvas-container');

    const menuBar = document.getElementById ('menu-bar');
    const elementMenu = document.getElementById('element-bar');
    const elementMenuHamburger = document.getElementById('widgetHamburger');

    const newCardButton = document.getElementById('new-card');
    const toolsButton = document.getElementById('toolsButton');

    const header = document.querySelector('header');

    // Enable Debug Mode - Hide Initial Start Page
    if (debug == 1){
        startContainer.style.display = 'none';
        //Show the canvas container
        canvasArea.style.width = '85%';
        canvasContainer.style.display = 'flex';
        resizableContainer.classList.add('resizeCanvas');
        resizableContainer.setAttribute('data-canvas-bottom', 380);
        
        //Show the navigation bar
        menuBar.style.display = 'flex';
        menuBar.classList.add('sticky-nav');
        
        header.style.display = 'none';
        
        //Show the navigation bar
        menuBar.style.display = 'flex';
        
        //Move the main content up
        mainContent.classList.add('move-content'); 
        mainContent.style.paddingBottom = '200px';

        //Show the menu bar
        elementMenu.style.display = 'flex';
    }


    /********************************************************************************
     *  Events related to the newCard button:
     * - Make the main container resizable
     * - Hide the start container
     * - Show the canvas container
     * - Hide the header
     * - Show the navigation bar
     * - Show the menu bar
     * - Move the main content up
    *********************************************************************************/

    newCardButton.addEventListener('click', function () {
       //Make the main container resizable
    //    resizableContainer.classList.add('resizeCanvas');

        //add event listener to wait for the fade-out animation to end
        startContainer.classList.add('fade-out');
        startContainer.addEventListener('transitionend', function () {

            //Hide the start container
            startContainer.style.display = 'none';
            startContainer.classList.remove('fade-out');    


            resizableContainer.style.height = '10.5in';
            resizableContainer.style.width = '9in';
            canvasContainer.style.display = 'flex';

        //add event listener to wait for the hide-header animation to end
            header.classList.add('hide-header');
            header.addEventListener('transitionend', function () {

                header.style.display = 'none';
                
                //Show the navigation bar
                menuBar.style.display = 'flex';
                
                elementMenuHamburger.classList.add('showWidgetHamburger');

                //Move the main content up
                mainContent.classList.add('move-content'); 
                mainContent.style.paddingBottom = '200px';

                 //Show the canvas container
                 canvasArea.classList.add('canvas-width');
               
                //Show the Widget Menu
                elementMenu.classList.add('show-element-bar'); 
          
            }, {once: true});

        
        }, {once: true}); 
    });

    /********************************************************************************
     *  Events related to the template-card Button
    *********************************************************************************/

    //templateCardButton.addEventListener('click', function () {
    //    alert('This feature is not available yet');});


});


