document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Enhanced Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            // Calculate the target position
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - headerHeight;
            
            // Smooth scroll to target
            smoothScrollTo(offsetPosition, 800);
            
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Smooth scroll animation function
    function smoothScrollTo(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Easing function for smoother animation
            const ease = easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }
        
        // Easing function
        function easeInOutCubic(t) {
            return t < 0.5 
                ? 4 * t * t * t 
                : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        }
        
        requestAnimationFrame(animation);
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Sticky Header
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section');
    
    function activeLink() {
        let position = window.scrollY + 200;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector('nav ul li a[href*=' + id + ']');
            
            if (position >= top && position < top + height && navLink) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                navLink.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', activeLink);
    
    // Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // We don't prevent default anymore to allow Formspree to handle the submission
            
            // Show a loading state or disable the button if desired
            const submitButton = contactForm.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.innerHTML = 'Sending...';
                submitButton.disabled = true;
            }
            
            // Formspree will handle the form submission and redirect
            // This code will run before the form submits
            console.log('Form submitting to Formspree');
            
            // If you want to show a success message without redirect, you would need to use fetch API
            // and prevent default, but we're letting Formspree handle it completely
        });
    }
    
    // Newsletter Subscription
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get email value
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            // Here you would normally send the subscription to a server
            console.log('Newsletter subscription:', email);
            
            // Show success message
            alert('Thank you for subscribing to our newsletter!');
            
            // Reset the form
            newsletterForm.reset();
        });
    }
});

// Scroll Animations (using Intersection Observer API)
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Elements to animate
    const animatedElements = document.querySelectorAll('.service-card, .stat-item, .branch-item, .contact-item');
    
    animatedElements.forEach(element => {
        observer.observe(element);
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Add 'animated' class styling
    const style = document.createElement('style');
    style.innerHTML = `
        .animated {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});

// Image transition on scroll
function handleImageTransitions() {
    const images = document.querySelectorAll('.about-image, .mission-vision-image');
    
    images.forEach(image => {
        const imagePosition = image.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.5; // Adjusted to trigger earlier
        
        if (imagePosition < screenPosition) {
            image.classList.add('visible');
        }
    });
}

// Run on page load and scroll
window.addEventListener('load', handleImageTransitions);
window.addEventListener('scroll', handleImageTransitions);

// Also run when clicking on navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function() {
        // Wait for the scroll to complete before checking image visibility
        setTimeout(handleImageTransitions, 1000);
    });
});

// Services Navigation Active State
const servicesNavLinks = document.querySelectorAll('.services-nav ul li a');
const serviceSections = document.querySelectorAll('.service-detail');

// Function to update active state based on scroll position
function updateActiveServiceLink() {
    let currentSection = '';
    
    serviceSections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    servicesNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Update active state on scroll
window.addEventListener('scroll', updateActiveServiceLink);

// Update active state on page load
window.addEventListener('load', updateActiveServiceLink);

// Handle links to services.html with section anchors
document.querySelectorAll('a[href^="services.html#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Don't prevent default - let the browser navigate to services.html
        // The smooth scrolling will be handled when the services.html page loads
    });
});

// Check if we're on the services page and if there's a hash in the URL
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the services page
    if (window.location.pathname.includes('services.html')) {
        // Check if there's a hash in the URL
        if (window.location.hash) {
            // Wait for the page to fully load
            setTimeout(function() {
                const targetId = window.location.hash;
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Calculate the target position
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = targetPosition - headerHeight;
                    
                    // Use our custom smooth scroll function
                    smoothScrollTo(offsetPosition, 800);
                }
            }, 100); // Small delay to ensure the page is fully rendered
        }
    }
}); 