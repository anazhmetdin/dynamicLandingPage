// change theme icon
function changeTheme(to) {
    // icons containing the image
    const darkLightIcon = document.getElementById('darkLightIcon');
    const burgerIcon = document.getElementById('burgerIcon');
    const scrollUpIcon = document.getElementById('scrollUpIcon');
    // root containing the color palette
    const root = document.querySelector(':root');
    
    if (to === 'dark') {
        darkLightIcon.setAttribute('src', 'assets/moon.png');
        burgerIcon.setAttribute('src', 'assets/burgerDark.png');
        scrollUpIcon.setAttribute('src', 'assets/upDark.png');
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
function showHide(element, show) {
    if (show) {
        element.style.display = 'block';
        setTimeout(function () {
            element.classList.add('show');
        }, 500);
    }
    else {
        element.classList.remove('show');
        setTimeout(function () {
            element.style.display = 'none';
        }, 500);
    }
}

// scroll to function
function scrollToId(id) {
    let element;
    if (id === "") {
        element = document.body;
    }
    else {
        element = document.getElementById(id);
    }
    element.scrollIntoView({behavior: 'smooth'});
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
    var ScrollUppObserver = new IntersectionObserver(function(entries) {
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
    for (let section of sections) {
        const id = section.id;
        navbar.innerHTML += `<li><button onclick='scrollToId("${id}")'>${id}</button></li>`;
    }
    //#############################################################################
});

function toggleDarkLight(settingUp = false) {
    // if first time, set the theme to light
    if (document.cookie.indexOf("dark=") < 0) {
        changeTheme('light');
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
                    if (settingUp) {
                        changeTheme('light');
                    } else {
                        changeTheme('dark');
                    }
                }
                // else, dark mode is on
                else {
                    // if setting up, do not change theme
                    if (settingUp) {
                        changeTheme('dark');
                    } else {
                        changeTheme('light');
                    }
                }
                break;
            }
        }
    }
}