//
// control the active state of nav-link items
//
// Select all the nav-link elements
let navLinks = document.querySelectorAll(".nav-link");
let currentPath = window.location.href;
let b_active = false;
// Loop through each nav-link element
navLinks.forEach(function(navLink) {
    if(navLink.href == currentPath.split('#')[0]){
        document.querySelector(".nav-link.active").classList.remove("active");
        // Add the active class to the clicked nav-link
        navLink.classList.add("active");
        b_active = true;
    };
});
if(!b_active){
    document.querySelector(".nav-link.active").classList.remove("active");
}

var resultsContainer = document.getElementById('results-container');
// Function to trigger search on input event
document.getElementById('inputSearch').addEventListener('input', function(event) {
    var searchTerm = event.target.value;
    var simpleJekyllSearchInstance = SimpleJekyllSearch({
        searchInput: document.getElementById('inputSearch'),
        resultsContainer: document.getElementById('results-container'),
        json: '/search.json',
        searchResultTemplate: '<div><a href="{url}">{title}</a></div>',
        noResultsText: 'No results found',
        limit: 10,
        fuzzy: false
      });
    if(searchTerm){
        try{
            simpleJekyllSearchInstance.search(searchTerm);
            var searchInputRect = event.target.getBoundingClientRect();
            resultsContainer.style.top = searchInputRect.bottom + window.scrollY + 'px';
            resultsContainer.style.left = searchInputRect.left + 'px';
            resultsContainer.style.width = searchInputRect.width + 'px';

            // Check if there's content in the results container
            // var contentHeight = resultsContainer.scrollHeight;
            // resultsContainer.style.maxHeight = contentHeight + 'px';
            resultsContainer.style.display = 'block';
        }catch(err) {
            console.error('Error SimpleJekyllSearch:', err);
        }

    }else{
        resultsContainer.style.display = 'none';
    }
});

document.getElementById('inputSearch').addEventListener('focus', function() {
    resultsContainer.innerHTML = ''; // Clear the results
    resultsContainer.style.display = 'none'; // Optionally hide the container
});

  // Optional: Clear results and hide container on blur if needed
document.getElementById('inputSearch').addEventListener('blur', function() {
    // You can choose to hide the results container when the input loses focus
    setTimeout(function() {
      resultsContainer.innerHTML = ''; // Clear the results
      resultsContainer.style.display = 'none'; // Hide the container
    }, 200); // Delay to allow click events inside the results container to be processed
});
