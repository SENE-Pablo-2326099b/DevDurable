
// ========================================
// MENU MOBILE ET NAVIGATION
// ========================================

// Menu burger pour mobile
const burger = document.querySelector('.header__burger');
const nav = document.querySelector('.header__nav ul');
if (burger && nav) {
    burger.addEventListener('click', function() {
        nav.classList.toggle('open');
        burger.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
}

// Fermer le menu mobile au clic sur un lien
document.querySelectorAll('.header__nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav?.classList.remove('open');
        burger?.setAttribute('aria-expanded', 'false');
    });
});

// ========================================
// ANIMATIONS AU SCROLL
// ========================================

// Animation douce sur les sections au scroll avec effets variés
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Délai progressif pour les animations en cascade
            setTimeout(() => {
                entry.target.classList.add('reveal');
            }, index * 100);
        }
    });
}, observerOptions);

// Observer tous les éléments animables
document.querySelectorAll(`
    section, 
    .product, 
    .valeurs__item, 
    .mission-card,
    .service-card,
    .workshop-card,
    .contact-info,
    .contact-form,
    .horaires,
    .info-item
`).forEach(el => {
    revealObserver.observe(el);
});

// ========================================
// EFFETS INTERACTIFS
// ========================================

// Effet de parallaxe léger sur le hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero, .contact-hero, .ateliers-hero, .boutique-hero');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Effet de survol amélioré sur les cartes
document.querySelectorAll('.product, .service-card, .workshop-card, .mission-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
        this.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '';
    });
});

// Animation des compteurs (si présents)
function animateCounters() {
    document.querySelectorAll('[data-count]').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Observer pour déclencher les compteurs
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('[data-count]').forEach(counter => {
    counterObserver.observe(counter);
});

// ========================================
// FILTRES PRODUITS (Page Boutique) - Géré par products.js
// ========================================
// Le filtrage spécifique est maintenant géré par products.js pour éviter les conflits

// ========================================
// FORMULAIRES
// ========================================

// Validation améliorée des formulaires
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        const value = input.value.trim();
        let valid = true;
        
        // Validation spécifique par type
        if (input.type === 'email') {
            valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        } else if (input.type === 'tel') {
            valid = /^[\d\s\-\+\(\)]+$/.test(value);
        } else {
            valid = value.length > 0;
        }
        
        // Mise à jour visuelle
        if (valid) {
            input.classList.remove('error');
            input.classList.add('success');
        } else {
            input.classList.add('error');
            input.classList.remove('success');
            isValid = false;
        }
    });
    
    return isValid;
}

// Application aux formulaires
document.querySelectorAll('form').forEach(form => {
    // Validation en temps réel
    form.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('blur', () => {
            validateForm(form);
        });
        
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateForm(form);
            }
        });
    });
    
    // Validation à la soumission
    form.addEventListener('submit', function(e) {
        if (!validateForm(this)) {
            e.preventDefault();
            
            // Focus sur le premier champ en erreur
            const firstError = this.querySelector('.error');
            if (firstError) {
                firstError.focus();
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            // Animation de succès
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.innerHTML = '✓ Envoyé !';
                submitBtn.style.background = '#4CAF50';
            }
        }
    });
});

// ========================================
// EFFETS VISUELS AVANCÉS
// ========================================

// Effet de typing sur les textes hero
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Application sur les titres hero avec délai
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero h1, .contact-hero h1, .ateliers-hero h1, .boutique-hero h1');
    if (heroTitle && heroTitle.dataset.typewriter) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
});

// Particules flottantes (optionnel - léger)
function createFloatingParticles() {
    const hero = document.querySelector('.hero, .contact-hero, .ateliers-hero, .boutique-hero');
    if (!hero) return;
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${3 + Math.random() * 2}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${50 + Math.random() * 50}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
}

// Création des particules après chargement
window.addEventListener('load', createFloatingParticles);

// ========================================
// SMOOTH SCROLL ET NAVIGATION
// ========================================

// Smooth scroll pour les liens internes
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Highlight de la section active dans la navigation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header__nav a[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});