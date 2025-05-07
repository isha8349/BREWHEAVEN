// Slider JavaScript for BrewHaven Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize product slider
    initProductSlider();
    
    // Initialize testimonial carousel
    initTestimonialCarousel();
});

/**
 * Initialize product slider functionality
 */
function initProductSlider() {
    const slider = document.querySelector('.product-slider');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.product-slide');
    const prevBtn = document.querySelector('.slider-controls .prev');
    const nextBtn = document.querySelector('.slider-controls .next');
    
    if (slides.length === 0) return;
    
    let currentIndex = 0;
    
    // Set up initial state
    setupSlides();
    
    // Event listeners for controls
    if (prevBtn) {
        prevBtn.addEventListener('click', showPreviousSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', showNextSlide);
    }
    
    // Set up auto-rotation timer
    let autoRotateTimer = setInterval(showNextSlide, 5000);
    
    // Pause auto-rotation when hovering over slider
    slider.addEventListener('mouseenter', function() {
        clearInterval(autoRotateTimer);
    });
    
    slider.addEventListener('mouseleave', function() {
        clearInterval(autoRotateTimer);
        autoRotateTimer = setInterval(showNextSlide, 5000);
    });
    
    // Setup slides in their initial positions
    function setupSlides() {
        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.classList.add('active');
                slide.classList.remove('prev', 'next');
            } else if (index < currentIndex) {
                slide.classList.add('prev');
                slide.classList.remove('active', 'next');
            } else {
                slide.classList.add('next');
                slide.classList.remove('active', 'prev');
            }
        });
    }
    
    // Show the previous slide
    function showPreviousSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        setupSlides();
    }
    
    // Show the next slide
    function showNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        setupSlides();
    }
    
    // Touch and swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(autoRotateTimer);
    }, { passive: true });
    
    slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        autoRotateTimer = setInterval(showNextSlide, 5000);
    }, { passive: true });
    
    function handleSwipe() {
        const threshold = 50; // Minimum distance required for a swipe
        if (touchEndX < touchStartX - threshold) {
            // Swiped left
            showNextSlide();
        } else if (touchEndX > touchStartX + threshold) {
            // Swiped right
            showPreviousSlide();
        }
    }
}

/**
 * Initialize testimonial carousel functionality
 */
function initTestimonialCarousel() {
    const carousel = document.querySelector('.testimonial-carousel');
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    
    if (slides.length === 0) return;
    
    let currentIndex = 0;
    
    // Set active slide initially
    slides[0].classList.add('active');
    if (dots.length > 0) {
        dots[0].classList.add('active');
    }
    
    // Add click events to dots
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            goToSlide(index);
        });
    });
    
    // Set up auto-rotation timer
    let autoRotateTimer = setInterval(showNextTestimonial, 6000);
    
    // Pause auto-rotation when hovering over carousel
    carousel.addEventListener('mouseenter', function() {
        clearInterval(autoRotateTimer);
    });
    
    carousel.addEventListener('mouseleave', function() {
        clearInterval(autoRotateTimer);
        autoRotateTimer = setInterval(showNextTestimonial, 6000);
    });
    
    // Go to a specific slide
    function goToSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to the target slide and dot
        slides[index].classList.add('active');
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentIndex = index;
    }
    
    // Show the next testimonial
    function showNextTestimonial() {
        currentIndex = (currentIndex + 1) % slides.length;
        goToSlide(currentIndex);
    }
    
    // Touch and swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(autoRotateTimer);
    }, { passive: true });
    
    carousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        autoRotateTimer = setInterval(showNextTestimonial, 6000);
    }, { passive: true });
    
    function handleSwipe() {
        const threshold = 50; // Minimum distance required for a swipe
        if (touchEndX < touchStartX - threshold) {
            // Swiped left
            showNextTestimonial();
        } else if (touchEndX > touchStartX + threshold) {
            // Swiped right
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            goToSlide(currentIndex);
        }
    }
    
    // Enable keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Only process if the carousel is in the viewport
        const rect = carousel.getBoundingClientRect();
        const isInViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;
        
        if (isInViewport) {
            if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                goToSlide(currentIndex);
            } else if (e.key === 'ArrowRight') {
                showNextTestimonial();
            }
        }
    });
}
