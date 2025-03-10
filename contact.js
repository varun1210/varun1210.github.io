document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with environment variable
    (function() {
      // Get EmailJS public key from environment variable
      const emailJsPublicKey = process.env.EMAIL_JS_CODE;
      if (emailJsPublicKey) {
        emailjs.init(emailJsPublicKey);
      } else {
        console.error("EmailJS public key not found in environment variables");
      }
    })();
    
    // Check for headless browser
    function isHeadlessBrowser() {
      // Check for common headless browser characteristics
      const isHeightZero = window.outerHeight === 0;
      const isWidthZero = window.outerWidth === 0;
      const userAgent = navigator.userAgent.toLowerCase();
      const hasHeadlessFlags = 
        userAgent.includes('headless') || 
        userAgent.includes('phantomjs') || 
        userAgent.includes('puppeteer');
      
      // Additional check for navigator properties
      const navigatorCheck = 
        navigator.webdriver || 
        navigator.languages === undefined ||
        navigator.languages.length === 0;
      
      return isHeightZero || isWidthZero || hasHeadlessFlags || navigatorCheck;
    }
    
    // DOM elements
    const contactForm = document.getElementById('contactForm');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const messageError = document.getElementById('messageError');
    
    // Form validation
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Block submission from headless browsers
      if (isHeadlessBrowser()) {
        console.error('Submission blocked from headless browser');
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message show';
        errorMessage.innerHTML = `<p>Automated submissions are not allowed.</p>`;
        contactForm.appendChild(errorMessage);
        
        setTimeout(() => {
          errorMessage.remove();
        }, 5000);
        
        return;
      }
      
      let isValid = true;
      
      // Reset error messages and validation classes
      resetValidation();
      
      // Validate email (required and format)
      if (!emailInput.value.trim()) {
        showError(emailInput, emailError, 'Email address is required');
        isValid = false;
      } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, emailError, 'Please enter a valid email address');
        isValid = false;
      } else {
        showSuccess(emailInput);
      }
      
      // Validate phone (optional but must be valid if provided)
      if (phoneInput.value.trim() && !isValidPhone(phoneInput.value.trim())) {
        showError(phoneInput, phoneError, 'Please enter a valid phone number');
        isValid = false;
      } else if (phoneInput.value.trim()) {
        showSuccess(phoneInput);
      }
      
      // Validate message (required)
      if (!messageInput.value.trim()) {
        showError(messageInput, messageError, 'Please enter your message');
        isValid = false;
      } else {
        showSuccess(messageInput);
      }
      
      // If form is valid, process the submission
      if (isValid) {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Prepare the parameters for EmailJS
        const templateParams = {
          from_name: emailInput.value.trim(),
          phone_number: phoneInput.value.trim() || 'Not provided',
          message: messageInput.value.trim(),
          to_email: 'varunmup1210@gmail.com'
        };
        
        // Send the email using EmailJS
        emailjs.send('default_service', 'template_id', templateParams)
          .then(function(response) {
            console.log('Email sent successfully:', response);
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message show';
            successMessage.innerHTML = `<p>Thank you for your message! I'll get back to you soon.</p>`;
            
            // Add success message to form
            contactForm.appendChild(successMessage);
            
            // Reset the form
            contactForm.reset();
            resetValidation();
            
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
            
            // Remove success message after 5 seconds
            setTimeout(() => {
              successMessage.remove();
            }, 5000);
          }, function(error) {
            console.error('Email failed to send:', error);
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message show';
            errorMessage.innerHTML = `<p>Sorry, there was an error sending your message. Please try again later.</p>`;
            
            // Add error message to form
            contactForm.appendChild(errorMessage);
            
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
            
            // Remove error message after 5 seconds
            setTimeout(() => {
              errorMessage.remove();
            }, 5000);
          });
      }
    });
    
    // Input event listeners for real-time validation
    emailInput.addEventListener('input', function() {
      if (emailInput.classList.contains('invalid')) {
        validateEmail();
      }
    });
    
    phoneInput.addEventListener('input', function() {
      if (phoneInput.classList.contains('invalid')) {
        validatePhone();
      }
    });
    
    messageInput.addEventListener('input', function() {
      if (messageInput.classList.contains('invalid')) {
        validateMessage();
      }
    });
    
    // Validation functions
    function validateEmail() {
      resetFieldValidation(emailInput, emailError);
      
      if (!emailInput.value.trim()) {
        showError(emailInput, emailError, 'Email address is required');
        return false;
      } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, emailError, 'Please enter a valid email address');
        return false;
      } else {
        showSuccess(emailInput);
        return true;
      }
    }
    
    function validatePhone() {
      resetFieldValidation(phoneInput, phoneError);
      
      if (phoneInput.value.trim() && !isValidPhone(phoneInput.value.trim())) {
        showError(phoneInput, phoneError, 'Please enter a valid phone number');
        return false;
      } else if (phoneInput.value.trim()) {
        showSuccess(phoneInput);
      }
      return true;
    }
    
    function validateMessage() {
      resetFieldValidation(messageInput, messageError);
      
      if (!messageInput.value.trim()) {
        showError(messageInput, messageError, 'Please enter your message');
        return false;
      } else {
        showSuccess(messageInput);
        return true;
      }
    }
    
    // Helper functions
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
      // Allow various formats like (123) 456-7890, 123-456-7890, 1234567890
      const phoneRegex = /^(\+\d{1,2}\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/;
      return phoneRegex.test(phone);
    }
    
    function showError(input, errorElement, message) {
      input.classList.add('invalid');
      input.classList.remove('valid');
      errorElement.textContent = message;
    }
    
    function showSuccess(input) {
      input.classList.add('valid');
      input.classList.remove('invalid');
    }
    
    function resetFieldValidation(input, errorElement) {
      input.classList.remove('invalid', 'valid');
      errorElement.textContent = '';
    }
    
    function resetValidation() {
      emailInput.classList.remove('invalid', 'valid');
      phoneInput.classList.remove('invalid', 'valid');
      messageInput.classList.remove('invalid', 'valid');
      
      emailError.textContent = '';
      phoneError.textContent = '';
      messageError.textContent = '';
      
      // Remove any existing messages
      const messages = document.querySelectorAll('.success-message, .error-message');
      messages.forEach(message => message.remove());
    }
    
    // Initialize external links to open in new tab
    const externalLinks = document.querySelectorAll('a[href^="http"], a[target="_blank"]');
    externalLinks.forEach(link => {
      if (!link.hasAttribute('rel')) {
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  });