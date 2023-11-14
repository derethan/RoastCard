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

    debug ();
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


        // if ('orientation' in window.screen) {
        //     // The Screen Orientation API is supported
        //     console.log("Screen Orientation API is supported");
            
        //     try {
        //         window.screen.orientation.lock('portrait');
        //       }
        //     catch (error) {
        //         // handle error
        //         console.log("Error: " + error);
        //       }

        //   } else {
        //     // The Screen Orientation API is not supported
        //     console.log("Screen Orientation API is not supported");
        //   }

       //Make the main container resizable
       //resizableContainer.classList.add('resizeCanvas');

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
          
                window.addEventListener('load', openHelpMenu ());
            }, {once: true});

        
        }, {once: true}); 
    });

    /********************************************************************************
     *  Events related to the Tools Button
    *********************************************************************************/
    
    toolsModal = document.getElementById('toolsModal');
    toolsButton.addEventListener('click', function () {
        //Show the tools modal
        toolsModal.classList.toggle('active');
    });

    //handle clicking the close Button - Tools Modal
    closeButton = document.getElementById('closeTools');
    closeButton.addEventListener('click', function () {
        //close the Tools modal
        toolsModal.classList.toggle('active');
    });
    

    roastChart = document.getElementById('roastChartButton');
    roastChartModal = document.getElementById('roastChart');

    //Handle clicking the Roast Chart Tool options
    roastChart.addEventListener('click', function () {
        //close the Tools modal
        toolsModal.classList.toggle('active');

        //Show the Roast Chart Tool
        roastChartModal.classList.toggle('active');
    });
      //handle clicking the close Button - Roast Chart Modal
      closeButton = document.getElementById('closeChart');
      closeButton.addEventListener('click', function () {
          //close the Roast Chart modal
          roastChartModal.classList.toggle('active');
      });

function debug (){
    
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

}
});


