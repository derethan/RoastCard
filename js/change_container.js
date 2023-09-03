/**
 * 
 *  This file is used to change the container of the page
 * 
 * 
**/


// Path: js\change_container.js

document.addEventListener('DOMContentLoaded', function () {
    const newCardButton = document.getElementById('new-card');
    const startContainer = document.getElementById('start-container');
    const canvasContainer = document.getElementById('canvas-container');
    const menu = document.getElementById('menu-bar');

    const mainContent = document.querySelector('main');
    const header = document.querySelector('header');
    const body = document.querySelector('body');
    const nav = document.getElementById('nav');

    newCardButton.addEventListener('click', function () {
       

        //add event listener to wait for the animation to end
        startContainer.classList.add('fade-out');
        startContainer.addEventListener('transitionend', function () {

            startContainer.style.display = 'none';
            startContainer.classList.remove('fade-out');    
            
            canvasContainer.style.display = 'block';
            body.style.backgroundColor = '#333';


            header.classList.add('hide-header');
            header.addEventListener('transitionend', function () {
                nav.style.display = 'flex';
                nav.classList.add('sticky-nav');
                mainContent.classList.add('move-content-up'); 
                menu.style.paddingTop = '40px';               
            }, {once: true});
        
        }, {once: true}); 


    });
});