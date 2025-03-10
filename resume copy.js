document.addEventListener('DOMContentLoaded', function() {
    // This script will handle any dynamic functionality needed for the resume page
    
    // Optional: Add smooth scrolling to section links if needed in the future
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  });