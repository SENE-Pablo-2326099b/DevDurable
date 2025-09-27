
// Menu burger pour mobile
const burger = document.querySelector('.header__burger');
const nav = document.querySelector('.header__nav ul');
if (burger && nav) {
    burger.addEventListener('click', function() {
        nav.classList.toggle('open');
        burger.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
}

// Animation douce sur les sections au scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('section, .product, .valeurs__item').forEach(el => {
    observer.observe(el);
});

// Validation simple du formulaire email
document.querySelector('.cta__form')?.addEventListener('submit', function(e) {
    const email = this.querySelector('input[type="email"]');
    if (!email.value.match(/^.+@.+\..+$/)) {
        e.preventDefault();
        email.classList.add('error');
        email.setAttribute('aria-invalid', 'true');
        email.focus();
        alert('Veuillez entrer un email valide.');
    } else {
        email.classList.remove('error');
        email.setAttribute('aria-invalid', 'false');
    }
});