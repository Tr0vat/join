// Braucht die jemand war hautzächlich für die an imation 
async function initLogin() {
    await includeHTML();
    animationWindow();
}


/* loadContacts(); */
/* load('tasks'); */


/**
 * This async function includes HTML content into elements with the 'w3-include-html' attribute.
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
    changeClassToActive();
    hideHelpIcon();
    // function updateTasksHTML() wird nur ausgeführt, wenn die html 'board.html' geöffnet ist
    if(window.location.pathname == '/board.html') {
        updateTasksHTML();
    }  
}


/**
 * This function sets the 'activeLink' class to menu links based on the active page.
 * It retrieves the pathname of the current window and iterates through menu links with the 'active_link' class and if a menu link's href attribute includes the pathname of the active page, it adds the 'activeLink' class to that link.
 */
function changeClassToActive() {
    let activePage = window.location.pathname;
    let menuLinks = document.querySelectorAll('.active_link');
    menuLinks.forEach(link => {
        if (link.href.includes(`${activePage}`)) {
            link.classList.add('activeLink');
        }
    })
}


/**
 * This function prevents the propagation of the specified event.
 * @param {*} event - The event object to prevent propagation.
 */
function doNotClose(event) {
    event.stopPropagation();
}


/**
 * This function retrieves the display style of the specified element.
 * @param {*} element - The element whose display style is to be retrieved.
 * @returns {string} - The display style of the specified element.
 */
function proveElementStyle(element) {
    return element.currentStyle ? element.currentStyle.display : getComputedStyle(element).display; // Wenn das currentStyle-Attribut definiert ist wird der Wert des Displays über element.currentStyle.display abgerufen und betrifft den IE, ansonsten über getComputedStyle(element).display
}


/**
 * This function retrieves the width of the specified element by calculating its bounding rectangle.
 * @param {*} element - The element whose width is to be retrieved.
 * @returns {number} - The width of the specified element.
 */
function proveElementWidth(element) {
    let elementWidth = element;
    let rect = elementWidth.getBoundingClientRect();
    return rect.width;
}


/**
 * This function toggles the visibility of a dialog box by adding or removing classes.
 * @param {string} classDialogBg - The CSS class of the dialog background element.
 * @param {string} classD_none - The CSS class to toggle for hiding the dialog background.
 * @param {string} classDialog - The CSS class of the dialog element.
 * @param {string} showClassDialog - The CSS class to toggle for showing the dialog.
 * @param {number} time - The delay in milliseconds before toggling the visibility of the dialog element.
 */
function showDialog(classDialogBg, classD_none, classDialog, showClassDialog, time) {
    document.querySelector(`${classDialogBg}`).classList.toggle(`${classD_none}`);
    setTimeout(function() {
        document.querySelector(`${classDialog}`).classList.toggle(`${showClassDialog}`);
    }, time);
}


/**
 * This function closes a dialog box by removing the specified CSS class from the dialog element.
 * @param {string} classDialog - The CSS class of the dialog element.
 * @param {string} showClassDialog - The CSS class to be removed from the dialog element.
 * @param {string} classDialogBg - The CSS class of the dialog background element.
 * @param {string} classD_none - The CSS class to be added to hide the dialog background.
 * @param {number} time - The delay in milliseconds before hiding the dialog background.
 */
function closeDialog(classDialog, showClassDialog, classDialogBg, classD_none, time) {
    document.querySelector(`${classDialog}`).classList.remove(`${showClassDialog}`);
    setTimeout(function() {
        document.querySelector(`${classDialogBg}`).classList.add(`${classD_none}`);
    }, time);
}


function saveContacts() {
    let contactsAsText = JSON.stringify(contacts);
    localStorage.setItem('contacts', contactsAsText);
}


function loadContacts() {
    let contactsAsText = localStorage.getItem('contacts');
    if (contactsAsText) {
        contacts = JSON.parse(contactsAsText);
    }
}