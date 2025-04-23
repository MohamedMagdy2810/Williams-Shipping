document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedbackForm');
    
    if (feedbackForm) {
        // Handle the form submission
        feedbackForm.addEventListener('submit', function(e) {
            // We don't prevent default anymore to allow Formspree to handle the submission
            
            // Show a loading state or disable the button if desired
            const submitButton = feedbackForm.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.innerHTML = 'Sending...';
                submitButton.disabled = true;
            }
            
            // Show success message (will only be visible briefly before redirect)
            const successMessage = document.getElementById('successMessage');
            if (successMessage) {
                successMessage.style.display = 'block';
            }
            
            console.log('Feedback form submitting to Formspree');
            
            // Formspree will handle the form submission and redirect
        });
    }
    
    // Add animation to the stars when hovered
    const stars = document.querySelectorAll('.rating-stars label');
    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            // Get the current star's "for" attribute value
            const starId = this.getAttribute('for');
            const starValue = document.getElementById(starId).value;
            
            // Highlight this star and all stars before it
            stars.forEach(s => {
                const sFor = s.getAttribute('for');
                const sValue = document.getElementById(sFor).value;
                
                if (sValue <= starValue) {
                    s.classList.add('hover');
                } else {
                    s.classList.remove('hover');
                }
            });
        });
        
        star.addEventListener('mouseout', function() {
            // Remove hover class from all stars when mouse leaves
            stars.forEach(s => s.classList.remove('hover'));
        });
    });
});
