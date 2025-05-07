// Form Validation JavaScript for BrewHaven Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        initContactForm(contactForm);
    }
    
    // Initialize newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        initNewsletterForm(newsletterForm);
    }
    
    // Initialize order form
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        initOrderForm(orderForm);
    }
    
    // Initialize event booking form
    const eventBookingForm = document.getElementById('event-booking-form');
    if (eventBookingForm) {
        initEventBookingForm(eventBookingForm);
    }
    
    // Initialize mobile café form
    const mobileCafeForm = document.getElementById('mobile-cafe-form');
    if (mobileCafeForm) {
        initMobileCafeForm(mobileCafeForm);
    }
    
    // Initialize host event form
    const hostEventForm = document.getElementById('host-event-form');
    if (hostEventForm) {
        initHostEventForm(hostEventForm);
    }
});

/**
 * Initialize contact form validation and submission
 * @param {HTMLElement} form - The contact form element
 */
function initContactForm(form) {
    const nameInput = form.querySelector('#contact-name');
    const emailInput = form.querySelector('#contact-email');
    const phoneInput = form.querySelector('#contact-phone');
    const subjectSelect = form.querySelector('#contact-subject');
    const messageTextarea = form.querySelector('#contact-message');
    const submissionMessage = form.querySelector('.form-submission-message');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        clearErrors(form);
        
        // Validate form fields
        let isValid = true;
        
        if (!validateName(nameInput.value)) {
            showError(nameInput, 'Please enter your name');
            isValid = false;
        }
        
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        if (phoneInput.value && !validatePhone(phoneInput.value)) {
            showError(phoneInput, 'Please enter a valid phone number');
            isValid = false;
        }
        
        if (!subjectSelect.value) {
            showError(subjectSelect, 'Please select a subject');
            isValid = false;
        }
        
        if (!messageTextarea.value.trim()) {
            showError(messageTextarea, 'Please enter your message');
            isValid = false;
        }
        
        if (isValid) {
            // Simulate form submission (would be replaced with actual AJAX in production)
            submitForm(form, submissionMessage);
        }
    });
}

/**
 * Initialize newsletter form validation and submission
 * @param {HTMLElement} form - The newsletter form element
 */
function initNewsletterForm(form) {
    const emailInput = form.querySelector('#email');
    const formMessage = form.querySelector('.form-message');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateEmail(emailInput.value)) {
            formMessage.textContent = 'Please enter a valid email address';
            formMessage.style.color = 'var(--error-red)';
            return;
        }
        
        // Simulate successful subscription
        emailInput.value = '';
        formMessage.textContent = 'Thank you for subscribing!';
        formMessage.style.color = 'var(--success-green)';
        
        // Clear the success message after 5 seconds
        setTimeout(() => {
            formMessage.textContent = '';
        }, 5000);
    });
}

/**
 * Initialize order form validation and submission
 * @param {HTMLElement} form - The order form element
 */
function initOrderForm(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form fields
        const nameInput = form.querySelector('#name');
        const phoneInput = form.querySelector('#phone');
        const pickupTimeInput = form.querySelector('#pickup-time');
        const orderDetailsTextarea = form.querySelector('#order-details');
        
        let isValid = true;
        
        if (!nameInput.value.trim()) {
            nameInput.classList.add('error');
            isValid = false;
        } else {
            nameInput.classList.remove('error');
        }
        
        if (!validatePhone(phoneInput.value)) {
            phoneInput.classList.add('error');
            isValid = false;
        } else {
            phoneInput.classList.remove('error');
        }
        
        if (!pickupTimeInput.value) {
            pickupTimeInput.classList.add('error');
            isValid = false;
        } else {
            pickupTimeInput.classList.remove('error');
        }
        
        if (!orderDetailsTextarea.value.trim()) {
            orderDetailsTextarea.classList.add('error');
            isValid = false;
        } else {
            orderDetailsTextarea.classList.remove('error');
        }
        
        if (isValid) {
            // Simulate successful order
            alert('Your order has been received! We\'ll have it ready for pickup at the requested time.');
            form.reset();
            closeModal(document.getElementById('order-modal'));
        } else {
            alert('Please fill in all required fields correctly.');
        }
    });
}

/**
 * Initialize event booking form validation and submission
 * @param {HTMLElement} form - The event booking form element
 */
function initEventBookingForm(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple validation for demonstration
        const requiredInputs = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        });
        
        if (isValid) {
            // Simulate successful booking
            alert('Thank you for your booking! We\'ll confirm your reservation shortly.');
            form.reset();
            closeModal(document.getElementById('event-booking-modal'));
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

/**
 * Initialize mobile café form validation and submission
 * @param {HTMLElement} form - The mobile café form element
 */
function initMobileCafeForm(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple validation for demonstration
        const requiredInputs = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        });
        
        if (isValid) {
            // Simulate successful submission
            alert('Thank you for your inquiry! We\'ll get back to you with a quote within 48 hours.');
            form.reset();
            closeModal(document.getElementById('mobile-cafe-modal'));
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

/**
 * Initialize host event form validation and submission
 * @param {HTMLElement} form - The host event form element
 */
function initHostEventForm(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple validation for demonstration
        const requiredInputs = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        });
        
        if (isValid) {
            // Simulate successful submission
            alert('Thank you for your inquiry! We\'ll contact you shortly to discuss your event.');
            form.reset();
            closeModal(document.getElementById('host-event-modal'));
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

/**
 * Validate name
 * @param {string} name - The name to validate
 * @returns {boolean} - Whether the name is valid
 */
function validateName(name) {
    return name.trim().length >= 2;
}

/**
 * Validate email
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Validate phone number
 * @param {string} phone - The phone number to validate
 * @returns {boolean} - Whether the phone number is valid
 */
function validatePhone(phone) {
    // This is a simple validation for demonstration purposes
    // It checks if the phone has at least 10 digits
    const re = /^\+?[0-9\s\-\(\)]{10,}$/;
    return re.test(phone);
}

/**
 * Show error message for an input
 * @param {HTMLElement} input - The input element
 * @param {string} message - The error message
 */
function showError(input, message) {
    input.classList.add('error');
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

/**
 * Clear all error messages in a form
 * @param {HTMLElement} form - The form element
 */
function clearErrors(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.classList.remove('error');
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    });
}

/**
 * Simulate form submission
 * @param {HTMLElement} form - The form element
 * @param {HTMLElement} messageElement - The message display element
 */
function submitForm(form, messageElement) {
    // Disable the submit button to prevent multiple submissions
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = 'Sending...';
    
    // Simulate async operation with a timeout
    setTimeout(() => {
        // Show success message
        messageElement.textContent = 'Your message has been sent! We\'ll get back to you soon.';
        messageElement.classList.add('success');
        
        // Reset the form
        form.reset();
        
        // Re-enable the submit button
        submitButton.disabled = false;
        submitButton.innerHTML = 'Send Message';
        
        // Clear the success message after 5 seconds
        setTimeout(() => {
            messageElement.textContent = '';
            messageElement.classList.remove('success');
        }, 5000);
    }, 1500);
}
