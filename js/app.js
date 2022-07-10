// change theme icon
function changeTheme(to) {
    // icons containing the image
    const darkLightIcon = document.getElementById('darkLightIcon');
    const burgerIcon = document.getElementById('burgerIcon');
    // root containing the color palette
    const root = document.querySelector(':root');
    
    if (to === 'dark') {
        darkLightIcon.setAttribute('src', 'assets/moon.png');
        burgerIcon.setAttribute('src', 'assets/burgerDark.png');
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
        document.cookie = "dark=0; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; SameSite=Lax";

        // light color palette
        root.style.setProperty('--background', '#effbff');
        root.style.setProperty('--dark', 'darkred');
        root.style.setProperty('--light', 'burlywood');
        root.style.setProperty('--accent', '#1e548e');
    }
}


// once the document is loaded
document.addEventListener('DOMContentLoaded', function () {

    //#############################################################################
    // set up the dark/light mode:
    toggleDarkLight(true);
    //#############################################################################

    //#############################################################################
    // set up the navbar:
    // get the navbar
    const navbar = document.getElementById('navBar');
    // get the navbar links
    const sections = document.getElementsByClassName('section');
    for (const section of sections) {
        // get the link
        const id = section.id;
        console.log(id);
        navbar.innerHTML += `<li><a href="#${id}">${id}</a></li>`;
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
        for (const cookie of cookies) {
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