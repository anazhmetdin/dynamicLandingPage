/**
* @description change the theme of the website by setting css variables
*
* @param {string} to - dark or light
*/
function changeTheme(to) {
    // icons containing the image
    const DARK_LIGHT_ICON = document.getElementById('darkLightIcon');
    const BURGER_ICON = document.getElementById('burgerIcon');
    const SCROLL_UP_ICON = document.getElementById('scrollUpIcon');
    const LOGO = document.getElementById('logo');
    // root containing the color palette
    const ROOT = document.querySelector(':root');
    
    if (to === 'dark') {
        DARK_LIGHT_ICON.setAttribute('src', 'assets/moon.png');
        BURGER_ICON.setAttribute('src', 'assets/burgerDark.png');
        SCROLL_UP_ICON.setAttribute('src', 'assets/upDark.png');
        LOGO.setAttribute('src', 'assets/logoDark.png');
        document.cookie = 'dark=1; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; SameSite=Lax';

        // dark color palette
        ROOT.style.setProperty('--background', '#49656e');
        ROOT.style.setProperty('--dark', '#994242');
        ROOT.style.setProperty('--light', '#c2a57f');
        ROOT.style.setProperty('--accent', '#aac5e2');
    }
    
    else if (to === 'light') {
        DARK_LIGHT_ICON.setAttribute('src', 'assets/sun.png');
        BURGER_ICON.setAttribute('src', 'assets/burgerLight.png');
        SCROLL_UP_ICON.setAttribute('src', 'assets/upLight.png');
        LOGO.setAttribute('src', 'assets/logoLight.png');
        document.cookie = 'dark=0; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; SameSite=Lax';

        // light color palette
        ROOT.style.setProperty('--background', '#effbff');
        ROOT.style.setProperty('--dark', 'darkred');
        ROOT.style.setProperty('--light', 'burlywood');
        ROOT.style.setProperty('--accent', '#1e548e');
    }
}

/**
 * @description show or hide the element
 * 
 * @param {HTMLElement} element - the element to show or hide
 * @param {boolean} show - true to show, false to hide
 * @param {Number} delay - the delay before showing or hiding
 */
function showHide(element, show, delay=500) {
    if (show) {
        element.style.display = 'flex';
        setTimeout(function () {
            element.classList.add('show');
            element.classList.remove('hide');
        }, delay);
    } else {
        element.classList.remove('show');
        element.classList.add('hide');
        setTimeout(function () {
            element.style.display = 'none';
        }, delay);
    }
}

/**
 * @description scroll smoothly to element
 * 
 * @param {string} id - the id of the element to scroll to
 */
function scrollToId(id='') {
    let element;
    element = id === '' ? document.body: document.getElementById(id);
    element.scrollIntoView({behavior: 'smooth'});
}

// check if user is on mobile
const IS_TOUCH = matchMedia('(hover: none)').matches;
// keep track of opening/closing the menu
let hidingHeader = false;
// keep track of cursor over header
let onHeader = false;

/**
 * @description hide the header using costrains
 * 
 * @param {HTMLElement} header - the header to hide
 */
function hideHeader(header) {
    // check if header is not already waiting to be hidden 
    // check if document is not at the top
    if (!onHeader && !IS_TOUCH && !hidingHeader && document.documentElement.scrollTop > 0) {
        hidingHeader = true;
        const CURRENT_SCROLL_POS = document.documentElement.scrollTop;
        setTimeout(function () {
            // if the user stopped scrolling, hide the header
            if (CURRENT_SCROLL_POS === document.documentElement.scrollTop) {
                // if the user is not on the header, hide the header
                if (!onHeader)
                    showHide(header, false);
                hidingHeader = false;
            }
            // else, keep waiting
            else {
                hidingHeader = false;
                hideHeader(header);
            }
        }, 1500);
    }
}

/**
 * @description change the burger icon from and to the cross
 * 
 * @param {boolean} forceClose - true to force close the menu
 */
function toggleBurger(forceClose=false) {
    // get burger icon
    const BURGER_ICON = document.getElementById('burgerIcon');
    // get ul menu
    const NAV_BAR = document.getElementById('navBar');
    // if open, close the menu
    if (forceClose || BURGER_ICON.classList.contains('open')) {
        BURGER_ICON.classList.remove('open');
        if (darkMode) {
            BURGER_ICON.setAttribute('src', 'assets/BurgerDark.png');
        } else {
            BURGER_ICON.setAttribute('src', 'assets/BurgerLight.png');
        }
        NAV_BAR.style.display = 'none';
    }
    // else, open the menu
    else {
        BURGER_ICON.classList.add('open');
        if (darkMode) {
            BURGER_ICON.setAttribute('src', 'assets/closeBurgerDark.png');
        } else {
            BURGER_ICON.setAttribute('src', 'assets/closeBurgerLight.png');
        }
        NAV_BAR.style.display = 'flex';
        NAV_BAR.style.flexDirection = 'column';
    }
}      

/**
 * @description collapse and expand sections
 * 
 * @param {string} id - the id of the section to collapse/expand
 */
function toggleSection(id) {
    // get section
    const SECTION = document.getElementById(id);
    // check if section is open
    const OPEN = SECTION.classList.contains('open');
    // get children of section      
    const BLOCKQUOTE = SECTION.querySelector('blockquote');
    const IMG = SECTION.querySelector('img');
    const SECTION_TEXT = SECTION.querySelector('.sectionText');

    if (OPEN) {
        // change class to startion transition
        SECTION.classList.remove('open');
        // change button text
        SECTION.querySelector('span').textContent = 'Expand'
    } else {
        // change class to startion transition
        SECTION.classList.add('open');
        // display the hidden childern
        // correc order
        if (IMG.classList.contains('lefty') && document.documentElement.clientWidth < 900) {
            IMG.parentNode.insertBefore(IMG, SECTION_TEXT);
        }
        BLOCKQUOTE.style.display = 'block';
        // IMG.style.display = 'block';
        // change button text
        SECTION.querySelector('span').textContent = 'Collapse'
    }
}

/**
 * @description adjust the location of the scroll up button based on the screen size
 * 
 */
function adjustScrollToTopButton() {
    // adjust scroll to top button
    const SCROLL_UP_BUTTON = document.getElementById('scrollUpButton');
    // place it at the right edge of the body
    SCROLL_UP_BUTTON.style.right = `${document.body.getBoundingClientRect().left + 16}px`;
}

let darkMode = true;
/**
 * @description toggle dark mode and change icons and save the setting to cookie
 * 
 * @param {boolean} settingUp - apply the current setting to the page
 */
function toggleDarkLight(settingUp = false) {
    // if first time, set the theme to light
    if (document.cookie.indexOf('dark=') < 0) {
        changeTheme('light');
        darkMode = false;
    } else {
        // get all cookies
        const COOKIES = document.cookie.split(';');
        for (let cookie of COOKIES) {
            // search for dark cookie
            if (cookie.indexOf('dark=') >= 0) {
                // if dark cookie is set, check if dark mode is off
                if (cookie.split('=')[1] == '0') {
                    // if setting up, do not change theme
                    if (settingUp === true) {
                        changeTheme('light');
                        darkMode = false;
                    } else {
                        changeTheme('dark');
                        darkMode = true;
                    }
                }
                // else, dark mode is on
                else {
                    // if setting up, do not change theme
                    if (settingUp === true) {
                        changeTheme('dark');
                        darkMode = true;
                    } else {
                        changeTheme('light');
                        darkMode = false;
                    }
                }
                break;
            }
        }
    }
}

// once the document is loaded
document.addEventListener('DOMContentLoaded', function () {

    //#############################################################################
    // set up the dark/light mode:
    toggleDarkLight(true);
    //#############################################################################

    //#############################################################################
    // set up the scroll to top button:
    // get the scroll to top button
    const SCROLL_UP_BUTTON = document.getElementById('scrollUpButton');
    // get first element in the content
    const FIRST_ELEMENT = document.getElementById('content').firstElementChild;
    const ScrollUppObserver = new IntersectionObserver(function(entries) {
        // display the scroll to top button if the first element is not in viewport
        showHide(SCROLL_UP_BUTTON, !entries[0].isIntersecting);
    }, { threshold: [0.2] });
    // observe the first element
    ScrollUppObserver.observe(FIRST_ELEMENT);
    ///#############################################################################


    //#############################################################################
    // set up the navbar:
    // get the navbar
    const NAV_BAR = document.getElementById('navBar');
    // get the navbar links
    const SECTIONS = document.getElementsByClassName('section');
    // observe sections, and highlight the navbar link when the section is in viewport
    const NAV_BAR_OBSERVER = new IntersectionObserver(function(entries) {
        for (let entry of entries) {
            // get the navbar link corresponding to the section
            const NAV_BAR_LINK = document.getElementById(entry.target.id + '_navLink');
            if (entry.isIntersecting) {
                // highlight the navbar link
                NAV_BAR_LINK.classList.add('highlighted');
            } else {
                // unhighlight the navbar link
                NAV_BAR_LINK.classList.remove('highlighted');
            }
        }
    }, { threshold: [0.2] });
    
    /**
     * @description adjust sections' children after being resized
     * 
     * @param {event} event - the event that triggered the function
     */
    function toggleItems (e) {
        // get target children of the section
        const BLOCKQUOTE = e.target.querySelector('blockquote');
        const SECTION_TEXT = e.target.querySelector('.sectionText');
        const IMG = e.target.querySelector('img');
        // remove childrens after animation if section is closed
        if (!e.target.classList.contains('open')) {
            BLOCKQUOTE.style.display = 'none';
            // IMG.style.display = 'none';
            if (IMG.classList.contains('lefty') && document.documentElement.clientWidth < 900) {
                IMG.parentNode.insertBefore(SECTION_TEXT, IMG);
            }
        }
    }

    // for each section
    for (let section of SECTIONS) {
        // add link to the nav bar
        const ID = section.id;
        NAV_BAR.innerHTML += `<li id="${ID}_navLink"><button>${ID}</button></li>`;
        // observe the section
        NAV_BAR_OBSERVER.observe(section);
        // listen to section animations end
        section.addEventListener('transitionend', toggleItems);
    }
    for (let link of NAV_BAR.children) {
        // add event listener to the navbar button
        link.addEventListener('click', scrollToId.bind(null, link.textContent));
    }

    // add listener to resize the navbar
    window.addEventListener('resize', function () {
        const COLLAPSED = this.document.querySelectorAll('.section:not(.open)');
        let img, sectionText;
        // fix lefty sections when COLLAPSED
        for (let section of COLLAPSED) {
            img = section.querySelector('img');
            sectionText = section.querySelector('.sectionText');
            if (img.classList.contains('lefty')) {

                if (window.innerWidth > 900) {
                    section.insertBefore(img, sectionText);
                } else {
                    section.insertBefore(sectionText, img);
                }
            }
        }

        // fix navbar after resize
        if (window.innerWidth <= 800) {
            NAV_BAR.style.flexDirection = 'column';
            toggleBurger(true);
        } else {
            NAV_BAR.style.display = 'flex';
            NAV_BAR.style.flexDirection = 'row';
        }

        adjustScrollToTopButton();
    });
    //#############################################################################

    //#############################################################################
    // auto hide the header:
    // only if device is not touch
    if (!IS_TOUCH) {
        // get the header
        const HEADER = document.getElementsByTagName('header')[0];
        // add listener header mouse
        HEADER.onmouseenter = () => {
            onHeader = true
        }
        HEADER.onmouseleave = () => {
            onHeader = false
        }
        // listen to scroll events
        document.addEventListener('scroll', function () {
            // show the HEADER
            showHide(HEADER, true);
            // hide the HEADER if the cursor is not on the HEADER
            if (!onHeader) {
                hideHeader(HEADER);
            }
        });
        // show the HEADER when mouse is moving over the HEADER
        document.addEventListener('mousemove', function (e) {
            e.clientY < 200 ?  showHide(HEADER, true) : hideHeader(HEADER);
        });
    }
    //#############################################################################
    
    //#############################################################################
    // add click listeners
    // dark/light mode
    document.getElementById('darkLightButton').addEventListener('click', toggleDarkLight);
    // burger menu
    document.getElementById('burgerButton').addEventListener('click', toggleBurger.bind(null, false));
    // collapse/expand sections
    for (let section of SECTIONS) {
        section.querySelector('button').addEventListener('click', toggleSection.bind(null, section.id));
    }
    // scroll to top
    SCROLL_UP_BUTTON.addEventListener('click', scrollToId.bind(null, ''));
});