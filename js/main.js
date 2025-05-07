// Main JavaScript file for BrewHaven Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Initialize FAQ accordions
    initFAQAccordions();
    
    // Initialize modals
    initModals();
    
    // Initialize menu tabs
    if (document.querySelector('.menu-tabs')) {
        initMenuTabs();
    }
});

/**
 * Initialize mobile navigation functionality
 */
function initMobileNav() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });
}

/**
 * Initialize scroll effects
 */
function initScrollEffects() {
    const header = document.querySelector('header');
    
    // Add scrolled class to header on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Trigger immediately to set initial state
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize FAQ accordions
 */
function initFAQAccordions() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-question').classList.remove('active');
            });
            
            // Open current FAQ if it wasn't already open
            if (!isActive) {
                faqItem.classList.add('active');
                this.classList.add('active');
            }
        });
    });
}

/**
 * Initialize modals
 */
function initModals() {
    // Event booking modal
    const bookEventBtns = document.querySelectorAll('.book-event-btn');
    const eventBookingModal = document.getElementById('event-booking-modal');
    const eventNameElement = document.getElementById('event-name');
    
    bookEventBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const eventName = this.getAttribute('data-event');
            if (eventNameElement) {
                eventNameElement.textContent = eventName;
            }
            openModal(eventBookingModal);
        });
    });
    
    // Mobile café inquiry modal
    const mobileCafeInquiryBtn = document.getElementById('mobile-cafe-inquiry');
    const mobileCafeModal = document.getElementById('mobile-cafe-modal');
    
    if (mobileCafeInquiryBtn && mobileCafeModal) {
        mobileCafeInquiryBtn.addEventListener('click', function() {
            openModal(mobileCafeModal);
        });
    }
    
    // Host event inquiry modal
    const hostEventInquiryBtn = document.getElementById('host-event-inquiry');
    const hostEventModal = document.getElementById('host-event-modal');
    
    if (hostEventInquiryBtn && hostEventModal) {
        hostEventInquiryBtn.addEventListener('click', function() {
            openModal(hostEventModal);
        });
    }
    
    // Order modal
    const openOrderModalBtn = document.getElementById('open-order-modal');
    const orderModal = document.getElementById('order-modal');
    
    if (openOrderModalBtn && orderModal) {
        openOrderModalBtn.addEventListener('click', function() {
            openModal(orderModal);
        });
    }
    
    // Close modals
    const closeModalBtns = document.querySelectorAll('.close-modal');
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close modals when clicking outside the modal content
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.active');
            if (openModal) {
                closeModal(openModal);
            }
        }
    });
}

/**
 * Open a modal
 * @param {HTMLElement} modal - The modal to open
 */
function openModal(modal) {
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Close a modal
 * @param {HTMLElement} modal - The modal to close
 */
function closeModal(modal) {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/**
 * Initialize menu tabs
 */
function initMenuTabs() {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all tabs and categories
            menuTabs.forEach(t => t.classList.remove('active'));
            menuCategories.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding category
            this.classList.add('active');
            document.getElementById(category).classList.add('active');
        });
    });
}
