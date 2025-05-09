document.addEventListener('DOMContentLoaded', function() {
    // Initialize header scroll effect
    initHeaderScroll();
    
    // Initialize form interactions
    initFormInteractions();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Form submission handling
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            // Form is handled by formspree, but we can add additional animations
            // and validation here if needed
        });
    }
});

// Handle header scroll effects
function initHeaderScroll() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Handle form interactions
function initFormInteractions() {
    // Add focus and animation effects to form elements
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        // Add focus effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // Enhance star rating interaction
    const stars = document.querySelectorAll('.rating-stars label');
    
    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            this.classList.add('hover-effect');
        });
        
        star.addEventListener('mouseout', function() {
            this.classList.remove('hover-effect');
        });
        
        star.addEventListener('click', function() {
            // Add pulse animation on select
            this.classList.add('selected-effect');
            setTimeout(() => {
                this.classList.remove('selected-effect');
            }, 300);
        });
    });
}

// Handle scroll-triggered animations
function initScrollAnimations() {
    // Check if IntersectionObserver is available
    if ('IntersectionObserver' in window) {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        // Observe elements that should animate on scroll
        const animatedElements = document.querySelectorAll('.feedback-item, .feedback-form-container, .feedback-cta h2, .feedback-cta p, .cta-buttons');
        
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
}

// Smooth scroll to anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add hover animations to elements
const animateHoverElements = document.querySelectorAll('.feedback-item, .btn');

animateHoverElements.forEach(el => {
    el.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)';
    });
});

// Handle rating star animation
const ratingInputs = document.querySelectorAll('.rating-stars input');
ratingInputs.forEach(input => {
    input.addEventListener('change', function() {
        const starContainer = this.closest('.rating-stars');
        starContainer.classList.add('rated');
        
        // Add a pulse animation
        const labels = starContainer.querySelectorAll('label');
        labels.forEach((label, index) => {
            setTimeout(() => {
                label.classList.add('pulse-animation');
                setTimeout(() => {
                    label.classList.remove('pulse-animation');
                }, 400);
            }, index * 100);
        });
    });
});
