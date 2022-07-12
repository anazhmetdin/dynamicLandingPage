// change theme icon
function changeTheme(to) {
    // icons containing the image
    const darkLightIcon = document.getElementById('darkLightIcon');
    const burgerIcon = document.getElementById('burgerIcon');
    const scrollUpIcon = document.getElementById('scrollUpIcon');
    const logo = document.getElementById('logo');
    // root containing the color palette
    const root = document.querySelector(':root');
    
    if (to === 'dark') {
        darkLightIcon.setAttribute('src', 'assets/moon.png');
        burgerIcon.setAttribute('src', 'assets/burgerDark.png');
        scrollUpIcon.setAttribute('src', 'assets/upDark.png');
        logo.setAttribute('src', 'assets/logoDark.png');
        document.cookie = "dark=1; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; SameSite=Lax";

        // dark color palette
        root.style.setProperty('--background', '#49656e');
        root.style.setProperty('--dark', '#994242');
        root.style.setProperty('--light', '#c2a57f');
        root.style.setProperty('--accent', '#aac5e2');
    }
    
    else if (to === 'light') {
        darkLightIcon.setAttribute('src', 'assets/sun.png');
        burgerIcon.setAttribute('src', 'assets/burgerLight.png');
        scrollUpIcon.setAttribute('src', 'assets/upLight.png');
        logo.setAttribute('src', 'assets/logoLight.png');
        document.cookie = "dark=0; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; SameSite=Lax";

        // light color palette
        root.style.setProperty('--background', '#effbff');
        root.style.setProperty('--dark', 'darkred');
        root.style.setProperty('--light', 'burlywood');
        root.style.setProperty('--accent', '#1e548e');
    }
}

// check if element is in viewport
function isElementInViewport (element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 && rect.left >= 0 &&
        rect.bottom <= window.innerHeight && rect.right <= window.innerWidth
    );
}

// show/hide an element
function showHide(element, show, delay=500) {
    if (show) {
        element.style.display = 'flex';
        setTimeout(function () {
            element.classList.add('show');
            element.classList.remove('hide');
        }, delay);
    }
    else {
        element.classList.remove('show');
        element.classList.add('hide');
        setTimeout(function () {
            element.style.display = 'none';
        }, delay);
    }
}

// scroll to function
function scrollToId(id="") {
    let element;
    if (typeof id === 'string') {
        element = document.getElementById(id);
    }
    else {
        element = document.body;
    }
    element.scrollIntoView({behavior: 'smooth'});
}

// check if user is on mobile
const isTouch = matchMedia('(hover: none)').matches;
// keep track of opening/closing the menu
let hidingHeader = false;
// keep track of cursor over header
let onHeader = false;
// function to hide header
function hideHeader(header) {
    // check if header is not already waiting to be hidden 
    // check if document is not at the top
    if (!onHeader && !isTouch && !hidingHeader && document.documentElement.scrollTop > 0) {
        hidingHeader = true;
        const currentScrollPos = document.documentElement.scrollTop;
        setTimeout(function () {
            if (currentScrollPos === document.documentElement.scrollTop) {
                if (!onHeader)
                    showHide(header, false);
                hidingHeader = false;
            }
            else {
                hidingHeader = false;
                hideHeader(header);
            }
        }, 1500);
    }
}

// function to expand/collapse the menu
function toggleBurger(forceClose=false) {
    // get burger icon
    const burgerIcon = document.getElementById('burgerIcon');
    // get ul menu
    const navBar = document.getElementById('navBar');
    // if open, close the menu
    if (forceClose || burgerIcon.classList.contains('open')) {
        burgerIcon.classList.remove('open');
        if (darkMode) {
            burgerIcon.setAttribute('src', 'assets/BurgerDark.png');
        } else {
            burgerIcon.setAttribute('src', 'assets/BurgerLight.png');
        }
        navBar.style.display = 'none';
    }
    // else, open the menu
    else {
        burgerIcon.classList.add('open');
        if (darkMode) {
            burgerIcon.setAttribute('src', 'assets/closeBurgerDark.png');
        } else {
            burgerIcon.setAttribute('src', 'assets/closeBurgerLight.png');
        }
        navBar.style.display = 'flex';
        navBar.style.flexDirection = 'column';
    }
}

// listen to section animations
function listenToSectionAnimations() {
    // get all sections
    const sections = document.getElementsByClassName('section');
    
}
            

// function to expand/collapse main sections
function toggleSection(id) {
    // get section
    const section = document.getElementById(id);
    // check if section is open
    const open = section.classList.contains('open');
    // get children of section      
    const p = section.querySelector('blockquote');
    const img = section.querySelector('img');    
    const sectionText = section.querySelector('.sectionText');

    if (open) {
        // change class to startion transition
        section.classList.remove('open');
        // change button text
        section.querySelector('span').textContent = "Expand"
    }
    else {
        // change class to startion transition
        section.classList.add('open');
        // display the hidden childern
        // correc order
        if (img.classList.contains('lefty') && document.documentElement.clientWidth < 900) {
            img.parentNode.insertBefore(img, sectionText);
        }
        p.style.display = 'block';
        // img.style.display = 'block';
        // change button text
        section.querySelector('span').textContent = "Collapse"
    }
}

function adjustScrollToTopButton() {
    // adjust scroll to top button
    const scrollUpButton = document.getElementById('scrollUpButton');
    // place it at the right edge of the body
    scrollUpButton.style.right = `${document.body.getBoundingClientRect().left + 16}px`;
}

let darkMode = true;
function toggleDarkLight(settingUp = false) {
    // if first time, set the theme to light
    if (document.cookie.indexOf("dark=") < 0) {
        changeTheme('light');
        darkMode = false;
    }
    else {
        // get all cookies
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            // search for dark cookie
            if (cookie.indexOf("dark=") >= 0) {
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
    const scrollUpButton = document.getElementById('scrollUpButton');
    // get first element in the content
    const firstElement = document.getElementById('content').firstElementChild;
    const ScrollUppObserver = new IntersectionObserver(function(entries) {
        // display the scroll to top button if the first element is not in viewport
        if (entries[0].isIntersecting) {
            showHide(scrollUpButton, false)
        } else {
            showHide(scrollUpButton, true);
        }
    }, { threshold: [0.2] });
    // observe the first element
    ScrollUppObserver.observe(firstElement);
    ///#############################################################################


    //#############################################################################
    // set up the navbar:
    // get the navbar
    const navbar = document.getElementById('navBar');
    // get the navbar links
    const sections = document.getElementsByClassName('section');
    // observe sections, and highlight the navbar link when the section is in viewport
    const NavbarObserver = new IntersectionObserver(function(entries) {
        for (let entry of entries) {
            // get the navbar link corresponding to the section
            const navbarLink = document.getElementById(entry.target.id + "_navLink");
            if (entry.isIntersecting) {
                // highlight the navbar link
                navbarLink.classList.add('highlighted');
            }
            else {
                // unhighlight the navbar link
                navbarLink.classList.remove('highlighted');
            }
        }
    }, { threshold: [0.2] });
    
    // function to listien for section animations end, and toggle internal items
    function toggleItems (e) {
        // get target children of the section
        const p = e.target.querySelector('blockquote');
        const sectionText = e.target.querySelector('.sectionText');
        const img = e.target.querySelector('img');
        // remove childrens after animation if section is closed
        if (!e.target.classList.contains('open')) {
            p.style.display = 'none';
            // img.style.display = 'none';
            if (img.classList.contains('lefty') && document.documentElement.clientWidth < 900) {
                img.parentNode.insertBefore(sectionText, img);
            }
        }
    }

    // for each section
    for (let section of sections) {
        // add link to the nav bar
        const id = section.id;
        navbar.innerHTML += `<li id="${id}_navLink"><button>${id}</button></li>`;
        // observe the section
        NavbarObserver.observe(section);
        // listen to section animations end
        section.addEventListener('transitionend', toggleItems);
    }
    for (let link of navbar.children) {
        // add event listener to the navbar button
        link.addEventListener('click', scrollToId.bind(null, link.textContent));
    }

    // add listener to resize the navbar
    window.addEventListener('resize', function () {
        const collapsed = this.document.querySelectorAll('.section:not(.open)');
        let img, sectionText;
        // fix lefty sections when collapsed
        for (let section of collapsed) {
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
            navbar.style.flexDirection = 'column';
            toggleBurger(true);
        }
        else {
            navbar.style.display = 'flex';
            navbar.style.flexDirection = 'row';
        }

        adjustScrollToTopButton();
    });
    //#############################################################################

    //#############################################################################
    // auto hide the header:
    // only if device is not touch
    if (!isTouch) {
        // get the header
        const header = document.getElementsByTagName('header')[0];
        // add listener header mouse
        header.onmouseenter = () => {
            onHeader = true
        }
        header.onmouseleave = () => {
            onHeader = false
        }
        // listen to scroll events
        document.addEventListener('scroll', function () {
            // show the header
            showHide(header, true);
            // hide the header if the cursor is not on the header
            if (!onHeader) {
                hideHeader(header);
            }
        });
        // show the header when mouse is moving over the header
        document.addEventListener('mousemove', function (e) {
            if (e.clientY < 200) {
                showHide(header, true);
            }
            else {
                hideHeader(header);
            }
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
    for (let section of sections) {
        section.querySelector('button').addEventListener('click', toggleSection.bind(null, section.id));
    }
    // scroll to top
    scrollUpButton.addEventListener('click', scrollToId);
});