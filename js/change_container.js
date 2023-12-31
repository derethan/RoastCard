/********************************************************************************
 *  Source: ../JS/CHANGE_CONTAINER.JS
 * 
 *        CONTROLLS page transitions from the start page to canvas
 *          - event listener for the newCard button and the tools button
*********************************************************************************/

//Global Variables
const screenSize = 1100;

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

    /********************************************************************************
     *  Events related to the newCard button:
    *********************************************************************************/

    newCardButton.addEventListener('click', function () {

       //Make the main container resizable
       //resizableContainer.classList.add('resizeCanvas');

        //add event listener to wait for the fade-out animation to end
        startContainer.classList.add('fade-out');
        startContainer.addEventListener('transitionend', function () {

            //Hide the start container
            startContainer.style.display = 'none';
            startContainer.classList.remove('fade-out');    


            // if on mobile, set the canvas to the size of the screen
            if (window.innerWidth < screenSize){
                resizableContainer.style.height = '100%';
                resizableContainer.style.width = '100vw';
            } else {
            resizableContainer.style.height = '10.5in';
            resizableContainer.style.width = '9in';
            dragMenuItems('.origin-element');

            }

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
          
                // Show the Help menu if there if a session storage item is not set 
                // (If previously opened within the same session)
                if (sessionStorage.getItem('helpMenu') !== 'true'){
                window.addEventListener('load', openHelpMenu ());
                }

                //If a session Storage exists for canvas elements, load them
                if (sessionStorage.getItem('canvasContent') !== null){
                    loadCanvasElements ();
                }

            }, {once: true});

        
        }, {once: true}); 
    });

    /********************************************************************************
     *  Events related to the Tools Button
    *********************************************************************************/
    
    const toolsModal = document.getElementById('toolsModal');
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
    

    const roastChartButton = document.getElementById('roastChartButton');
    const roastChartModal = document.getElementById('roastChart');

    //Handle clicking the Roast Chart Tool options
    roastChartButton.addEventListener('click', function () {
        //close the Tools modal
        toolsModal.classList.toggle('active');

        //Show the Roast Chart Tool
        roastChartModal.classList.toggle('active');
    });

      //handle clicking the close Button - Roast Chart Modal
      const closeChartButton = document.getElementById('closeChart');
      closeChartButton.addEventListener('click', function () {
          //close the Roast Chart modal
          roastChartModal.classList.toggle('active');
      });

    //   //Store the Cupping Score Tool
    //   const cuppingScoreButton = document.getElementById('cuppingScoreButton');
    //   const cuppingScoreModal = document.getElementById('cuppingScore');

    //     //Handle clicking the Cupping Score Tool options
    //     cuppingScoreButton.addEventListener('click', function () {
    //         //close the Tools modal
    //         toolsModal.classList.toggle('active');

    //         //Show the Cupping Score Tool
    //         cuppingScoreModal.classList.toggle('active');
    //     });

    //           //handle clicking the close Button - Roast Chart Modal
    //   const closeCuppingScoreButton = document.getElementById('closeCuppingScore');
    //   closeCuppingScoreButton.addEventListener('click', function () {
    //       //close the Roast Chart modal
    //       cuppingScoreModal.classList.toggle('active');
    //   });
});


