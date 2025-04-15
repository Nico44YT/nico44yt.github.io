window.addEventListener('DOMContentLoaded', () => {
    const navbarContainer = document.getElementById('navbar'); // Make sure the container exists
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            navbarContainer.innerHTML = data; // Inject navbar into the container
            highlightActivePage(); // Call the function to underline the active page link
        })
        .catch(error => console.error('Error loading navbar:', error));
});

// Highlight the active page link
function highlightActivePage() {
    const currentPage = window.location.pathname.split('/').pop(); // Get the current page
    const navLinks = document.querySelectorAll('nav a'); // Get all nav links

    navLinks.forEach(link => {
        if (link.href.includes(currentPage)) {
            link.classList.add('active'); // Add active class to the current page link
        }
    });
}