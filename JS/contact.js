document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = contactForm.querySelector('input[type="email"]');
            if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                alert('Merci pour votre message !');
                contactForm.reset();
            } else {
                alert('Veuillez entrer un email valide.');
            }
        });
    }
});