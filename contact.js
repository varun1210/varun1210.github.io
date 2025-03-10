document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const messageInput = document.getElementById('message');
  const emailError = document.getElementById('emailError');
  const phoneError = document.getElementById('phoneError');
  const messageError = document.getElementById('messageError');
  const successMessage = document.getElementById('successMessage');
  
  // Display success message if returning with success parameter
  if (window.location.search.includes('success=true')) {
    successMessage.style.display = 'block';
    contactForm.reset();
    
    // Remove success parameter from URL to prevent showing message on refresh
    history.replaceState(null, '', window.location.pathname);
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 5000);
  }
  
  // Form validation (client-side, before sending to Formspree)
  contactForm.addEventListener('submit', function(e) {
    let isValid = true;
    
    // Reset error messages
    emailError.textContent = '';
    phoneError.textContent = '';
    messageError.textContent = '';
    
    // Validate email
    if (!emailInput.value.trim()) {
      emailError.textContent = 'Email address is required';
      isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      emailError.textContent = 'Please enter a valid email address';
      isValid = false;
    }
    
    // Validate phone (if provided)
    if (phoneInput.value.trim() && !isValidPhone(phoneInput.value.trim())) {
      phoneError.textContent = 'Please enter a valid phone number';
      isValid = false;
    }
    
    // Validate message
    if (!messageInput.value.trim()) {
      messageError.textContent = 'Please enter your message';
      isValid = false;
    }
    
    // If validation fails, prevent form submission
    if (!isValid) {
      e.preventDefault();
    }
  });
  
  // Helper functions
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function isValidPhone(phone) {
    const phoneRegex = /^(\+\d{1,2}\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/;
    return phoneRegex.test(phone);
  }
  
  // Initialize external links to open in new tab
  const externalLinks = document.querySelectorAll('a[href^="http"], a[target="_blank"]');
  externalLinks.forEach(link => {
    if (!link.hasAttribute('rel')) {
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
});