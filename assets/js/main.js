//
// control the active state of nav-link items
//
// Select all the nav-link elements
let navLinks = document.querySelectorAll(".nav-link");
let currentPath = window.location.href;
// Loop through each nav-link element
navLinks.forEach(function(navLink) {
    if(navLink.href == currentPath){
        document.querySelector(".nav-link.active").classList.remove("active");
        // Add the active class to the clicked nav-link
        navLink.classList.add("active");
    };
});

